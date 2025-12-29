import React from "react";

const Currency = ({ setSelectedCurrency }) => {
  const popular = ["USD", "EUR", "GBP", "INR"];
  const allCurrencies = [
    "AED",
    "AUD",
    "CAD",
    "CHF",
    "CNY",
    "JPY",
    "NZD",
    "SGD",
    "ZAR",
    "HKD",
    "SEK",
    "NOK",
  ];
  
  // Function when user selects currency
  const chooseCurrency = (currency) => {
    setSelectedCurrency(currency);

    // close modal
    const modal = bootstrap.Modal.getInstance(
      document.getElementById("currencyModal")
    );
    modal.hide();
  };

  return (
    <>
      <div
        className="modal fade"
        id="currencyModal"
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
              <h5 className="modal-title">Select Your Currency</h5>
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
                Popular Currencies
              </h6>

              <div className="container">
                <div className="row">
                  {popular.map((item, index) => (
                    <div className="col-3" key={index}>
                      <div
                        onClick={() => chooseCurrency(item)}
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
                  All Currencies
                </h6>

                <div className="row">
                  {allCurrencies.map((cur, index) => (
                    <div className="col-3" key={index}>
                      <div
                        onClick={() => chooseCurrency(cur)}
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
                        {cur}
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

export default Currency;
