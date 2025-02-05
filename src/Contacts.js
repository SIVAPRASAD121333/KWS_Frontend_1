import React from "react";
import "./Contacts.css";  // Import CSS for styling

const Contacts = () => {
  return (
    <section className="content">
      <div className="container">
        <div id="contents">
          <h2 className="hiii">Contacts</h2>

          <div className="row">
            <div className="col-md-8 maps">
              <p>
                <iframe
                  style={{ border: 0 }}
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15514.697289831118!2d80.0268804!3d13.5555593!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0xadb0842ffc2719e4!2sIndian+Institute+of+Information+Technology!5e0!3m2!1sen!2sin!4v1519365333651"
                  width="100%"
                  height="300"
                  frameborder="0"
                  allowFullScreen
                  title="IIIT Sri City Map"
                ></iframe>
              </p>
              <a
                href="https://www.google.co.in/maps/place/Indian+Institute+of+Information+Technology,+Sri+City,+Chittoor/@13.5552932,80.02669,15z/data=!4m6!3m5!1s0x3a4d773f1e0f8721:0xadb0842ffc2719e4!8m2!3d13.5552932!4d80.02669!16s%2Fm%2F0wbmm91?entry=ttu"
                target="_blank"
                rel="noopener noreferrer"
              >
                View on Google Maps
              </a>
              <h4>
                <i className="bi bi-geo-alt"></i> Address
              </h4>
              <address id="address">
                Indian Institute of Information Technology, Sri City, 630 Gnan
                Marg Circle, Chittoor District - 517 646, Andhra Pradesh, India
              </address>
            </div>

            <div className="col-md-4">
              <div className="form-group">
                <input
                  type="text"
                  className="form-control m-2"
                  placeholder="Name"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control m-2"
                  placeholder="Organisation"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control m-2"
                  placeholder="Email"
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  className="form-control m-2"
                  placeholder="Phone"
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  type="text"
                  className="form-control m-2"
                  placeholder="Question/Comment"
                  rows="3"
                  required
                ></textarea>
              </div>
              <div className="col-12">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contacts;