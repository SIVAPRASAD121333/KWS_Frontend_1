import React from 'react';
import './team_members.css';
import Image1 from './Dr_Achintya_Sarkar.jpg';
import Image2 from './Dr_Priyanka_Dwivedi.jpg';
import Image3 from './Siva_Prasad_B.png';

import Image4 from './iiits.png';
import Image5 from './dst.png';
import Image6 from './dst_1.jpg';

export default function TM() {
  return (
    <div className="content">
      <div className="container">
        <div className="text-center mt-5 mb-2">
          <h2 className="mb-0">Meet our Members</h2>
        </div>

        <div className="container mt-3">
          <div className="row">

            {/* Dr. Achintya Kr. Sarkar */}
            <div className="col-6 col-md-4">
              <div className="bg-white p-3 text-center rounded box">
                <img className="img-responsive rounded-circle" src={Image1} width="90" alt="Dr. Achintya Kr. Sarkar"/>
                <h5 className="mt-3 name">Dr. Achintya Kr. Sarkar</h5>
                <span className="work d-block">Assistant Professor & Project Investigator</span>
                <a className="hi" href="https://www.linkedin.com/in/achintya-kumar-sarkar-5366666a/">Visit Linkedin profile</a>
              </div>
            </div>

            {/* Dr. Priyanka Dwivedi */}
            <div className="col-6 col-md-4">
              <div className="bg-white p-3 text-center rounded box">
                <img className="img-responsive rounded-circle" src={Image2} width="90" alt="Dr. Priyanka Dwivedi"/>
                <h5 className="mt-3 name">Dr. Priyanka Dwivedi</h5>
                <span className="work d-block">Assistant Professor & Project Investigator</span>
                <span className="work d-block hi hi1">Linkedin Profile Not Available</span>
              </div>
            </div>

            {/* Siva Prasad B */}
            <div className="col-6 col-md-4">
              <div className="bg-white p-3 text-center rounded box">
                <img className="img-responsive rounded-circle" src={Image3} width="90" alt="Siva Prasad B"/>
                <h5 className="mt-3 name">Siva Prasad B</h5>
                <span className="work d-block">Junior Research Fellow</span>
                <a className="hi hi2" href="https://www.linkedin.com/in/sivaprasad121333/">Visit Linkedin profile</a>
              </div>
            </div>

          </div>
        </div>

        {/* Footer Section */}
        <div className="footer text-center mt-4">
          <p>
            <a href="https://www.iiits.ac.in/" target="_blank" rel="noopener noreferrer">
              <img src={Image4} alt="IIIT Sri City Logo" />
            </a>
          </p>
          <p>
            <a href="https://dst.gov.in/" target="_blank" rel="noopener noreferrer">
              <img id="dst" src={Image5} alt="DST Logo" />
            </a>
          </p>
          <p>
            <a href="https://dst.gov.in/" target="_blank" rel="noopener noreferrer">
              <img id="dst_1" src={Image6} alt="DST Additional Logo" />
            </a>
          </p>
        </div>

      </div>
    </div>
  );
}
