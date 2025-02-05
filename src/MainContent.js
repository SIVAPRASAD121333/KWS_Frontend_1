import React from "react";
import "./MainContent.css"
import AudioRecorder from "./AudioRecorder";
function MainContent() {
  return (
    <main className="container">
      <div className="grid">
        <section>
          {/* <h2>Welcome to</h2>
          <p>
            End-to-End Spoken Keyword Detection System in Nine Indian Languages
            and its Application in Healthcare Information Dissemination
            (Sanction order: 11(1)/2022-HCC(TDIL).
          </p> */}
         {<> <div style={{ textAlign: "center" }}>
             <h1 style={{ color: "#6a31c4", fontSize: "30px" }}>🙏 Welcome To End-to-End Spoken Keyword Spotting Systems 🙏</h1>
             </div></>}

        </section>
      </div>
      <h2 className="hiiii" style={{ textAlign: "center" }}> Record or Select an Audio File </h2>
        <AudioRecorder />
    </main>
  );
}

export default MainContent;
