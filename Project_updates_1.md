
# Project Updates

## Frontend

### 1. **API Integration**

- **Objective**: Facilitate communication between the frontend and the backend model API.
- **Implementation**:  
  - Created a POST API to send audio data to the backend for processing.
  - Configured the endpoint to dynamically handle different model outputs.
  - Added error handling for various response statuses to ensure robustness.

### 2. **Data Transmission and Display**

- **Process**:  
  - Captures the audio recording and converts it into a `.wav` file.
  - Sends the `.wav` file to the backend API as `FormData`.
  - Receives and displays the following information:
    - **Keyword**: The detected keyword from the audio.
    - **Confidence Level**: The confidence score associated with the detected keyword.
- **Enhancements**:
  - Improved the display to show results in a user-friendly format (e.g., using styled components or UI elements).
  - Added loading indicators and status messages for better user experience.

### 3. **Submission Handling**

```javascript
const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmittedAudioURL(audioURL);
    if (audioURL) {
        try {
            setLoad(true);
            const blob = await fetch(audioURL).then((res) => res.blob());
            const file = new File([blob], 'audio.wav', { type: blob.type });
            const formData = new FormData();
            formData.append('audio_data', file);

            const response = await fetch(`YOUR_API_ENDPOINT_URL`, {
                method: 'POST',
                body: formData,
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const result = await response.json();
            setAnswer(result["result"]);
            setConf(result["conf"]);
            console.log('File uploaded successfully:', JSON.stringify(result));
        } catch (error) {
            console.error('Error during file upload:', error);
            alert('Error during file upload: ' + error.message);
        } finally {
            setLoad(false);
        }
    }
};
```

- **Key Improvements**:
  - Added detailed error messages for easier debugging.
  - Ensured asynchronous execution with `try-catch-finally` blocks for smooth operation.
  - Added dynamic URL configuration for better deployment flexibility.

### 4. **Audio Recording**

- **Functionality**: Record audio from the user's microphone and convert it to `.wav` format for submission.
- **Code Implementation**:

```javascript
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
            alert('Please ensure microphone permissions are enabled.');
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
```

- **Additional Features**:
  - **Timer Functionality**: Provides real-time feedback on the recording duration.
  - **Error Handling**: Alerts users if microphone access fails.
  - **File Conversion**: Ensures recorded audio is saved in `.wav` format for backend compatibility.

---

## Backend

### 1. **Model Execution**

- **Objective**: Ensure the correct execution of different keyword spotting models.
- **Models Involved**:
  - `KWS_denseNet_bng.py`
  - `KWS_denseNet_man.py`
  - `KWS_denseNet_miz.py`
- **Tasks**:
  - Reviewed the execution pipeline for each model to identify potential bottlenecks.
  - Verified model loading and inference processes to optimize response time.
  - Ensured all dependencies and configurations are up-to-date for each script.

### 2. **Debugging**

- **Scripts Debugged**:
  - **`KWS_denseNet_bng.py`**: Focused on improving model inference speed and resolving audio preprocessing issues.
  - **`KWS_denseNet_man.py`**: Fixed errors related to tensor shape mismatches during inference.
  - **`KWS_denseNet_miz.py`**: Addressed issues with the model not handling low-quality audio samples effectively.
- **Tools Used**:  
  - `PyTorch` debugger for step-by-step model execution.
  - Log analysis for tracking errors and execution flow.

### 3. **API Endpoint and Port Exposure**

- **Objective**: Allow the frontend to access the backend models seamlessly.
- **Implementation Steps**:
  - **API Development**: Created endpoints to receive POST requests with audio data and return predictions.
  - **Port Configuration**:
    - Exposed the backend service on a configurable port (e.g., `5000` or `8000`).
    - Ensured CORS (Cross-Origin Resource Sharing) is enabled to allow requests from different domains.

- **Deployment Considerations**:
  - Configured environment variables for dynamic port assignment.
  - Ensured security measures (e.g., API key authentication) are in place for production deployments.
