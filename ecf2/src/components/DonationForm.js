import React, { useState } from "react";
import "./DonationForm.css"; // Import your CSS file for styling
import axios from "axios";
import apiEndpoints from "../config/api";

// import emailjs from 'emailjs-com';

function App() {
  const [selectedAmount, setSelectedAmount] = useState(null);
  const [customAmount, setCustomAmount] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [Fname, setFname] = useState("");
  const [Femail, setFemail] = useState("");
  const [Fphone, setFphone] = useState("");
  const [Fmsg, setFmsg] = useState("");
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const handleAmountSelection = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount("");
  };

  const handleCustomAmountChange = (e) => {
    setCustomAmount(e.target.value);
    setSelectedAmount(null);
  };

  const handleNextClick = () => {
    if (
      (customAmount !== "" && customAmount !== "0") ||
      selectedAmount !== null
    ) {
      setShowPopup(true);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  const handleDonation = async (e) => {
    e.preventDefault();

    // Reset form errors
    setFormErrors({});

    // Validate form fields
    const errors = {};
    const amount = selectedAmount ? selectedAmount : customAmount;

    if (Fname.trim() === "") {
      errors.fname = "Name is required";
    }

    if (Femail.trim() === "") {
      errors.Femail = "Email is required";
    } else if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/i.test(Femail)) {
      errors.Femail = "Invalid email address";
    }

    if (Fphone.trim() === "") {
      errors.Fphone = "Phone number is required";
    } else if (!/^\d{10}$/i.test(Fphone)) {
      errors.Fphone = "Invalid phone number";
    }

    if (!amount || amount <= 0) {
      errors.amount = "Donation amount is required and must be positive";
    }

    // If there are errors, set them in the state
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return; // Stop form submission if errors exist
    }

    // Proceed with donation if validation passes
    try {
      await axios.post(apiEndpoints.donateAmount, {
        amount,
        Fname,
        Femail,
        Fphone,
        Fmsg,
        check1,
        check2,
      });

      alert("Success");
      setShowPopup(false); // Close the popup on successful submission
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("An error occurred.");
    }
  };

  return (
    <div className="App">
      <div className="payment-window" id="scroll1">
        <h2 style={{textAlign: 'center', fontSize: '40px', fontWeight: '700', color:'rgb(17, 50, 89)' }}>#teamtrees</h2>
        <h2 style={{textAlign: 'center', fontSize: '20px', color:'rgb(17, 50, 89)', backgroundColor:'rgb(111, 186, 13)', width:'50%', marginLeft:'20%', padding:'20px', borderRadius:'50px'}}>100 ₹ = 1 ♣</h2>
        <div className="amount-selection">
          <div className="toggle-buttons">
            <button
              className={`toggle-button ${selectedAmount === 100 ? "selected" : ""}`}
              onClick={() => handleAmountSelection(100)}
            >
              100rs
            </button>
            <button
              className={`toggle-button ${selectedAmount === 200 ? "selected" : ""}`}
              onClick={() => handleAmountSelection(200)}
            >
              200rs
            </button>
            <br></br>
            <button
              className={`toggle-button ${selectedAmount === 300 ? "selected" : ""}`}
              onClick={() => handleAmountSelection(300)}
            >
              300rs
            </button>
            <button
              className={`toggle-button ${selectedAmount === 400 ? "selected" : ""}`}
              onClick={() => handleAmountSelection(400)}
            >
              400rs
            </button>
            <button
              className={`other-amount-button ${selectedAmount === null ? "selected" : ""}`}
              onClick={() => handleAmountSelection(null)}
            >
              Other Amount
            </button>
          </div>
          {selectedAmount === null && (
            <input
              type="number"
              placeholder="Enter custom amount"
              value={customAmount}
              className="amount-sel-textbox"
              onChange={handleCustomAmountChange}
              min="100"
              step="100"
            />
          )}
          {formErrors.amount && <p className="error-message">{formErrors.amount}</p>}
        </div>
        <button className="next-button" onClick={handleNextClick}>
          Next
        </button>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h3 className="popup-content-heading">Enter User Details</h3>
            <form className="form1" onSubmit={handleDonation}>
              {/* User details form inputs */}
              <label className="popup-label-name" htmlFor="name">
                DISPLAY NAME:
              </label>
              <input
                type="text"
                placeholder="Name"
                id="name"
                className="popup-textbox"
                name="name"
                onChange={(e) => setFname(e.target.value)}
              />
              {formErrors.fname && <p className="error-message">{formErrors.fname}</p>}

              <label className="popup-label-name" htmlFor="email">
                EMAIL:
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                className="popup-textbox"
                name="user_email"
                onChange={(e) => setFemail(e.target.value)}
                autoComplete="email"
              />
              {formErrors.Femail && <p className="error-message">{formErrors.Femail}</p>}

              <label className="popup-label-name" htmlFor="phn">
                PHONE NUMBER:
              </label>
              <input
                type="tel"
                placeholder="Phone Number"
                id="phn"
                className="popup-textbox"
                onChange={(e) => setFphone(e.target.value)}
                pattern="[0-9]{10}"
                maxLength="10"
                autoComplete="tel"
              />
              {formErrors.Fphone && <p className="error-message">{formErrors.Fphone}</p>}

              <label className="popup-label-name" htmlFor="msg">
                MESSAGE:
              </label>
              <input
                type="text"
                placeholder="Message"
                id="msg"
                className="popup-textbox"
                onChange={(e) => setFmsg(e.target.value)}
              />

              <div className="popup-label">
                <label className="popup-label-check" htmlFor="updates1">
                  <div style={{ display: "flex" }}>
                    <div>
                      <input
                        type="checkbox"
                        id="updates1"
                        className="popup-checkbox"
                        defaultChecked={check1}
                        onChange={() => setCheck1(!check1)}
                      />
                    </div>
                    <div style={{ marginLeft: "2%" }}>
                      <span style={{ color: "green" }}>YES!</span> I want periodic updates on #TeamTrees
                    </div>
                  </div>
                </label>

                <label className="popup-label-check" htmlFor="updates2">
                  <div style={{ display: "flex" }}>
                    <div>
                      <input
                        type="checkbox"
                        id="updates2"
                        className="popup-checkbox"
                        defaultChecked={check2}
                        onChange={() => setCheck2(!check2)}
                      />
                    </div>
                    <div style={{ marginLeft: "2%" }}>
                      <span>Please keep my donation anonymous</span>
                    </div>
                  </div>
                </label>

                <label className="popup-label-check" htmlFor="updates3">
                  <div style={{ display: "flex" }}>
                    <div style={{ marginLeft: "8%" }}>
                      <span style={{ color: 'green' }}>You will receive a certificate soon!</span>
                    </div>
                  </div>
                </label>
              </div>

              <button type="submit" className="submit-button">
                Submit
              </button>
            </form>
            
            <button className="close-button" onClick={handlePopupClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
