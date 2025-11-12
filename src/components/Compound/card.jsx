import React, { useState, useEffect } from "react";
// import "./PaymentValidation.css";

const PaymentValidation = () => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
  });

  const [errors, setErrors] = useState({
    cardNumber: false,
    cardName: false,
    expiryMonth: false,
    expiryYear: false,
    cvv: false,
  });

  const [touched, setTouched] = useState({
    cardNumber: false,
    cardName: false,
    expiryMonth: false,
    expiryYear: false,
    cvv: false,
  });

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  useEffect(() => {
    const allFieldsValid =
      !errors.cardNumber &&
      !errors.cardName &&
      !errors.expiryMonth &&
      !errors.expiryYear &&
      !errors.cvv &&
      touched.cardNumber &&
      touched.cardName &&
      touched.expiryMonth &&
      touched.expiryYear &&
      touched.cvv;

    setIsSubmitDisabled(!allFieldsValid);
  }, [errors, touched]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validate on change
    validateField(name, value);
  };

  const handleBlur = (name) => {
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const validateField = (name, value) => {
    let isValid = false;

    switch (name) {
      case "cardNumber":
        isValid = /^\d{16}$/.test(value);
        setErrors((prev) => ({ ...prev, cardNumber: !isValid }));
        break;
      case "cardName":
        isValid = /^[A-Za-z\s]+$/.test(value) && value.trim().length > 0;
        setErrors((prev) => ({ ...prev, cardName: !isValid }));
        break;
      case "expiryMonth":
        isValid = /^(0[1-9]|1[0-2])$/.test(value);
        setErrors((prev) => ({ ...prev, expiryMonth: !isValid }));
        break;
      case "expiryYear":
        const currentYear = new Date().getFullYear();
        const yearNum = parseInt(value, 10);
        isValid =
          /^\d{4}$/.test(value) &&
          yearNum >= currentYear &&
          yearNum <= currentYear + 3;
        setErrors((prev) => ({ ...prev, expiryYear: !isValid }));
        break;
      case "cvv":
        isValid = /^\d{3}$/.test(value);
        setErrors((prev) => ({ ...prev, cvv: !isValid }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit logic would go here
    console.log("Form submitted:", formData);
  };

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">
              {formData.cardNumber
                .padEnd(16, "X")
                .replace(/(\d{4})/g, "$1 ")
                .trim()}
            </p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">
                {formData.cardName || "HOLDER NAME"}
              </span>
              <span className="debit-card-date">
                {formData.expiryMonth || "MM"}/{formData.expiryYear || "YYYY"}
              </span>
              <span className="debit-card-cvv">{formData.cvv || "CVV"}</span>
            </p>
          </div>
        </div>

        <section>
          <div className="pa-50">
            <form onSubmit={handleSubmit}>
              <div className="layout-column mb-15">
                <input
                  name="cardNumber"
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  onBlur={() => handleBlur("cardNumber")}
                  maxLength={16}
                />
                {errors.cardNumber && touched.cardNumber && (
                  <p className="invalid-text" data-testid="numberInputError">
                    Invalid Card Number
                  </p>
                )}
              </div>

              <div className="layout-column mb-15">
                <input
                  name="cardName"
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  value={formData.cardName}
                  onChange={handleChange}
                  onBlur={() => handleBlur("cardName")}
                />
                {errors.cardName && touched.cardName && (
                  <p className="invalid-text" data-testid="nameInputError">
                    Invalid Card Name
                  </p>
                )}
              </div>

              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    name="expiryMonth"
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    value={formData.expiryMonth}
                    onChange={handleChange}
                    onBlur={() => handleBlur("expiryMonth")}
                    maxLength={2}
                  />
                  {errors.expiryMonth && touched.expiryMonth && (
                    <p className="invalid-text" data-testid="monthInputError">
                      Invalid Month
                    </p>
                  )}
                </div>

                <div className="layout-column mb-30">
                  <input
                    name="expiryYear"
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    value={formData.expiryYear}
                    onChange={handleChange}
                    onBlur={() => handleBlur("expiryYear")}
                    maxLength={4}
                  />
                  {errors.expiryYear && touched.expiryYear && (
                    <p className="invalid-text" data-testid="yearInputError">
                      Invalid Year
                    </p>
                  )}
                </div>

                <div className="layout-column mb-30">
                  <input
                    name="cvv"
                    placeholder="CVV"
                    data-testid="cvvInput"
                    value={formData.cvv}
                    onChange={handleChange}
                    onBlur={() => handleBlur("cvv")}
                    maxLength={3}
                  />
                  {errors.cvv && touched.cvv && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      Invalid CVV
                    </p>
                  )}
                </div>
              </div>

              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={isSubmitDisabled}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

const PaymentValidation2 = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardholderName, setCardholderName] = useState("");
  const [expiryMonth, setExpiryMonth] = useState("");
  const [expiryYear, setExpiryYear] = useState("");
  const [cvv, setCvv] = useState("");
  const [errors, setErrors] = useState({
    cardNumberError: "",
    cardholderNameError: "",
    monthInputError: "",
    yearInputError: "",
    cvvInputError: "",
  });
  const [isSubmitEnabled, setIsSubmitEnabled] = useState(false);

  const validateCardNumber = (value) => {
    const num = value.replace(/\D/g, "");
    if (!num) return "The field is required.";
    if (num.length !== 16)
      return "Invalid Card Number: should be exactly 16 digits.";
    return "";
  };

  const validateCardholderName = (value) => {
    if (!value.trim()) return "The field is required.";
    if (!/^[a-zA-Z\s]+$/.test(value))
      return "Invalid Cardholder Name: English letters only.";
    return "";
  };

  const validateExpiryMonth = (value) => {
    const num = parseInt(value, 10);
    if (!value) return "The field is required.";
    if (isNaN(num) || num < 1 || num > 12)
      return "Invalid Month: should denote a value from 01 to 12 that denotes January to December.";
    return "";
  };

  const validateExpiryYear = (value) => {
    const num = parseInt(value, 10);
    const currentYear = new Date().getFullYear();
    if (!value) return "The field is required.";
    if (
      isNaN(num) ||
      value.length !== 4 ||
      num < currentYear ||
      num > currentYear + 3
    ) {
      return 'Invalid Year: is shown inside <p data-testid="yearInputError"></p>.';
    }
    return "";
  };

  const validateCvv = (value) => {
    const num = value.replace(/\D/g, "");
    if (!num) return "The field is required.";
    if (num.length !== 3)
      return "Invalid CVV: should consist of exactly 3 digits.";
    return "";
  };

  useEffect(() => {
    const newErrors = {
      cardNumberError: validateCardNumber(cardNumber),
      cardholderNameError: validateCardholderName(cardholderName),
      monthInputError: validateExpiryMonth(expiryMonth),
      yearInputError: validateExpiryYear(expiryYear),
      cvvInputError: validateCvv(cvv),
    };
    setErrors(newErrors);
    setIsSubmitEnabled(Object.values(newErrors).every((error) => !error));
  }, [cardNumber, cardholderName, expiryMonth, expiryYear, cvv]);

  return (
    <div>
      <div>
        <label>Card Number:</label>
        <input
          type="text"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          data-testid="numberInput"
          placeholder="numberInputError"
        />
        {errors.cardNumberError && (
          <p data-testid="numberInputError">{errors.cardNumberError}</p>
        )}
      </div>
      <div>
        <label>Cardholder Name:</label>
        <input
          type="text"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
          data-testid="nameInput"
          placeholder="nameInputError"
        />
        {errors.cardholderNameError && (
          <p data-testid="nameInputError">{errors.cardholderNameError}</p>
        )}
      </div>
      <div>
        <label>Expiry Month:</label>
        <input
          type="text"
          value={expiryMonth}
          onChange={(e) => setExpiryMonth(e.target.value)}
          data-testid="monthInput"
          placeholder="monthInputError"
        />
        {errors.monthInputError && (
          <p data-testid="monthInputError">{errors.monthInputError}</p>
        )}
      </div>
      <div>
        <label>Expiry Year:</label>
        <input
          type="text"
          value={expiryYear}
          onChange={(e) => setExpiryYear(e.target.value)}
          data-testid="yearInput"
          placeholder="yearInputError"
        />
        {errors.yearInputError && (
          <p data-testid="yearInputError">{errors.yearInputError}</p>
        )}
      </div>
      <div>
        <label>CVV:</label>
        <input
          type="text"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
          data-testid="cvvInput"
          placeholder="cvvInputError"
        />
        {errors.cvvInputError && (
          <p data-testid="cvvInputError">{errors.cvvInputError}</p>
        )}
      </div>
      <button
        data-testid="submit-button"
        disabled={!isSubmitEnabled}
        style={{
          backgroundColor: isSubmitEnabled ? "#4CAF50" : "#cccccc",
          color: "white",
          padding: "10px",
          border: "none",
          cursor: isSubmitEnabled ? "pointer" : "not-allowed",
        }}
      >
        Submit
      </button>
    </div>
  );
};

export default PaymentValidation;
