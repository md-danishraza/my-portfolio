import React from "react";

function Form({ inputs, handleSubmit, handleChange, isLoading }) {
  return (
    <form action="" onSubmit={handleSubmit}>
      <h1>Let's talk.</h1>
      <p>New project, freelance.</p>

      <div className="inputs">
        <fieldset>
          <label htmlFor="name">Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={inputs.name}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="email">Email *</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={inputs.email}
            onChange={handleChange}
          />
        </fieldset>
        <fieldset>
          <label htmlFor="message">Message *</label>
          <textarea
            name="message"
            id="message"
            rows={3}
            value={inputs.message}
            onChange={handleChange}
          ></textarea>
        </fieldset>
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}

export default Form;
