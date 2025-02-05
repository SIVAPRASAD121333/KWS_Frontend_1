import React, { useState, useRef, useEffect } from "react";
import styles from "./AudioRecorder.module.css";
import WaveSurfer from "wavesurfer.js";

function AudioRecorder() {
  const [audioURL, setAudioURL] = useState("");
  const audioChunksRef = useRef([]);
  const [buttonclck, setrbtnclck] = useState("bng")
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const mediaRecorderRef = useRef();
  const [submittedAudioURL, setSubmittedAudioURL] = useState("");
  const [answer, setAnswer] = useState(null)
  const [conf, setConf] = useState(null)
  const [load, setLoad] = useState(false)

  const startRecording = async () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorderRef.current = new MediaRecorder(stream);
        audioChunksRef.current = [];
        mediaRecorderRef.current.start();
        setIsRecording(true);
        startTimer();

        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };

        mediaRecorderRef.current.onstop = () => {
          convertToWavAndSetURL(audioChunksRef.current);
        };
      } catch (err) {
        console.error('Error accessing the microphone:', err);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      stopTimer();
    }
  };

  const convertToWavAndSetURL = async (audioChunks) => {
    const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });

    const arrayBuffer = await audioBlob.arrayBuffer();

    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

    const wavBuffer = encodeWAV(audioBuffer);

    const wavBlob = new Blob([wavBuffer], { type: 'audio/wav' });
    const wavUrl = URL.createObjectURL(wavBlob);
    setAudioURL(wavUrl);
  };

  const encodeWAV = (audioBuffer) => {
    const numChannels = audioBuffer.numberOfChannels;
    const sampleRate = audioBuffer.sampleRate;
    const length = audioBuffer.length * numChannels * 2;
    const buffer = new ArrayBuffer(44 + length);
    const view = new DataView(buffer);


    writeString(view, 0, 'RIFF');
    view.setUint32(4, 36 + length, true);
    writeString(view, 8, 'WAVE');
    writeString(view, 12, 'fmt ');
    view.setUint32(16, 16, true);
    view.setUint16(20, 1, true);
    view.setUint16(22, numChannels, true);
    view.setUint32(24, sampleRate, true);
    view.setUint32(28, sampleRate * numChannels * 2, true);
    view.setUint16(32, numChannels * 2, true);
    view.setUint16(34, 16, true);
    writeString(view, 36, 'data');
    view.setUint32(40, length, true);

    let offset = 44;
    for (let channel = 0; channel < numChannels; channel++) {
      const channelData = audioBuffer.getChannelData(channel);
      for (let i = 0; i < channelData.length; i++) {
        const sample = Math.max(-1, Math.min(1, channelData[i]));
        view.setInt16(offset, sample * 0x7fff, true);
        offset += 2;
      }
    }

    return buffer;
  };

  const writeString = (view, offset, string) => {
    for (let i = 0; i < string.length; i++) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedAudioURL(audioURL)
    if (audioURL) {
      try {
        setLoad(true)
        const blob = await fetch(audioURL).then((res) => res.blob());
        const file = new File([blob], 'audio.wav', { type: blob.type });
        const formData = new FormData();
        formData.append('audio_data', file);
        const response = await fetch(`https://localhost:8000/process_audio_${buttonclck}/`, {
          method: 'POST',
          body: formData,
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const result = await response.json();
        setAnswer(result["result"])
        setConf(result["conf"])
        console.log('File uploaded successfully: ' + JSON.stringify(result));
      } catch (error) {
        console.error('Error during file upload:', error);
        alert('Error during file upload: ' + error.message);
      } finally {
        setLoad(false)
      }
    }
  };
  const handleSubmit1 = (e) => {
    e.preventDefault();
    setSubmittedAudioURL(audioURL);

    if (audioURL) {
      const xhr = new XMLHttpRequest();
      xhr.open('GET', audioURL, true);
      xhr.responseType = 'blob';

      xhr.onload = function () {
        if (this.status === 200) {
          const downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(this.response);
          downloadLink.download = 'recorded_audio.wav';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
        }
      };

      xhr.send();
    }
  };

  const startTimer = () => {
    setTimer(0);
    const id = setInterval(() => {
      setTimer((prevTime) => prevTime + 1);
    }, 1000);
    setIntervalId(id);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    setIntervalId(null);
  };

  const handleAudioFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAudioURL(URL.createObjectURL(file));
    }
  };

  const waveformRef = useRef(null);
  const [waveSurfer, setWaveSurfer] = useState(null);

  useEffect(() => {
    const ws = WaveSurfer.create({
      container: waveformRef.current,
      waveColor: "#007bff",
      progressColor: "#0056b3",
      cursorColor: "transparent",
      barWidth: 2,
      barRadius: 3,
      responsive: true,
      height: 100,
      normalize: true,
      hideScrollbar: true,
    });

    ws.on("ready", () => {
      console.log("WaveSurfer is ready");
      ws.play();
    });
    ws.on("error", (e) => {
      console.error("WaveSurfer error:", e);
    });

    setWaveSurfer(ws);

    return () => ws && ws.destroy();
  }, []);
  useEffect(() => {
    if (waveSurfer && submittedAudioURL) {
      waveSurfer.load(submittedAudioURL);
      waveSurfer.once('ready', () => waveSurfer.play());
    }
  }, [submittedAudioURL, waveSurfer]);

  return (
    <div className={styles.audioRecorderContainer}>
      <div className={styles.buttonsContainer}>
        {isRecording ? (
          <button onClick={stopRecording} disabled={!isRecording}>
            Stop Recording
          </button>
        ) : (
          <button onClick={startRecording} disabled={isRecording}>
            Start Recording
          </button>
        )}
        <span className={styles.timer}>Timer: {timer}s</span>
      </div>

      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="file"
            accept="audio/*"
            onChange={handleAudioFileChange}
            className={styles.audioInput}
          />
          <button type="submit">{load ? "Loading..." : "Submit"}</button>
        </form>

        <form onSubmit={handleSubmit1}>
          <button type="submit">Download</button>
        </form>
      </div>

      {submittedAudioURL && (
        <div className={styles.audioPlayer}>
          <audio controls autoPlay={false} src={submittedAudioURL}></audio>
          {answer && <div>
            {`Identified keyword: ${answer}`}<br />{`Confidence: ${conf}`}
          </div>}
        </div>
      )}

      {/* Waveform container */}
      <div id="waveform" ref={waveformRef}></div>
      <div>
        <button style={{ backgroundColor: buttonclck === "bng" && "darkblue" }} onClick={() => setrbtnclck("bng")}>Bengali</button>
        <button style={{ backgroundColor: buttonclck === "man" && "darkblue" }} onClick={() => setrbtnclck("man")}>Manipuri</button>
        <button style={{ backgroundColor: buttonclck === "miz" && "darkblue" }} onClick={() => setrbtnclck("miz")}>Mizoram</button>
      </div>
    </div> 
  );
}

export default AudioRecorder;