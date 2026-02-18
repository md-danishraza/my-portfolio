import React from "react";

function Form({ inputs, handleSubmit, handleChange, isLoading }) {
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <input
          type="text"
          name="name"
          id="name"
          value={inputs.name}
          onChange={handleChange}
          required
          placeholder=" "
        />
        <label htmlFor="name" className="form-label">
          Your Name
        </label>
        <span className="focus-border"></span>
      </div>

      <div className="form-group">
        <input
          type="email"
          name="email"
          id="email"
          value={inputs.email}
          onChange={handleChange}
          required
          placeholder=" "
        />
        <label htmlFor="email" className="form-label">
          Email Address
        </label>
        <span className="focus-border"></span>
      </div>

      <div className="form-group">
        <textarea
          name="message"
          id="message"
          rows="5"
          value={inputs.message}
          onChange={handleChange}
          required
          placeholder=" "
        ></textarea>
        <label htmlFor="message" className="form-label">
          Your Message
        </label>
        <span className="focus-border"></span>
      </div>

      <button
        type="submit"
        className={`submit-btn ${isLoading ? "loading" : ""}`}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner"></span>
            <span>Sending...</span>
          </>
        ) : (
          <>
            <span>Send Message</span>
            <svg
              className="send-icon"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path d="M2 21L23 12 2 3v7l15 2-15 2v7z" fill="currentColor" />
            </svg>
          </>
        )}
      </button>
    </form>
  );
}

export default Form;
