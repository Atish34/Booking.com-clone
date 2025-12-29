import React from "react";

const Language = ({ setSelectedLanguage }) => {
  const popularLanguages = [
    "English",
    "Hindi",
    "Spanish",
    "French",
  ];

  const allLanguages = [
    "Arabic",
    "Bengali",
    "Chinese",
    "German",
    "Italian",
    "Japanese",
    "Korean",
    "Portuguese",
    "Russian",
    "Turkish",
    "Urdu",
    "Vietnamese",
  ];

  // Select language handler
  const chooseLanguage = (lang) => {
    setSelectedLanguage(lang);

    // Close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("languageModal")
    );
    modal.hide();
  };

  return (
    <>
      <div
        className="modal fade"
        id="languageModal"
        tabIndex="-1"
        aria-hidden="true"
      >
        <div
          className="modal-dialog"
          style={{
            maxWidth: "55%",
            marginTop: "5vh",
          }}
        >
          <div
            className="modal-content"
            style={{
              borderRadius: "12px",
              padding: "10px",
            }}
          >
            <div
              className="modal-header"
              style={{
                borderBottom: "1px solid #ddd",
                padding: "15px 20px",
              }}
            >
              <h5 className="modal-title">Select Language</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            <div
              className="modal-body"
              style={{
                padding: "20px",
                maxHeight: "60vh",
                overflowY: "auto",
              }}
            >
              <h6 style={{ fontWeight: "600", marginBottom: "15px" }}>
                Popular Languages
              </h6>

              <div className="container">
                <div className="row">
                  {popularLanguages.map((item, index) => (
                    <div className="col-3" key={index}>
                      <div
                        onClick={() => chooseLanguage(item)}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: "#f8f9fa",
                          cursor: "pointer",
                          fontSize: "14px",
                          textAlign: "center",
                          border: "1px solid #eee",
                          marginBottom: "10px",
                        }}
                      >
                        {item}
                      </div>
                    </div>
                  ))}
                </div>

                <h6 style={{ fontWeight: "600", margin: "20px 0 15px" }}>
                  All Languages
                </h6>

                <div className="row">
                  {allLanguages.map((lang, index) => (
                    <div className="col-3" key={index}>
                      <div
                        onClick={() => chooseLanguage(lang)}
                        style={{
                          padding: "12px",
                          borderRadius: "8px",
                          backgroundColor: "#fafafa",
                          cursor: "pointer",
                          fontSize: "14px",
                          textAlign: "center",
                          border: "1px solid #eee",
                          marginBottom: "10px",
                        }}
                      >
                        {lang}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Language;
