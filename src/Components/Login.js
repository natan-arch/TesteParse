import React, { useState } from 'react';

const LOGIN_FIELDS = {
  name: '',
  email: '',
  password: '',
};

const ERROR_MESSAGES = {
  requiredFields: 'All fields are required.',
  invalidEmail: 'Please enter a valid email address.',
  submitFailure: 'Login failed. Please try again.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateFields({ name, email, password }) {
  if (!name.trim() || !email.trim() || !password.trim()) {
    return ERROR_MESSAGES.requiredFields;
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return ERROR_MESSAGES.invalidEmail;
  }
  return null;
}

function Login() {
  const [fields, setFields] = useState(LOGIN_FIELDS);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setError('');
  }

  function handleSubmit(event) {
    event.preventDefault();
    setError('');

    const validationError = validateFields(fields);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      // Submission placeholder — replace with real auth call
      setSubmitted(true);
      alert('Login submitted successfully.');
    } catch {
      setError(ERROR_MESSAGES.submitFailure);
    }
  }

  if (submitted) {
    return <p role="status">You are now logged in.</p>;
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <h1>Login</h1>

      {error && (
        <p role="alert" aria-live="assertive">
          {error}
        </p>
      )}

      <div>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          value={fields.name}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={fields.email}
          onChange={handleChange}
        />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={fields.password}
          onChange={handleChange}
        />
      </div>

      <button type="submit">Login</button>
    </form>
  );
}

export default Login;