import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';

describe('Login', () => {
  describe('rendering', () => {
    it('renders without crashing', () => {
      render(<Login />);
      expect(screen.getByRole('form')).toBeInTheDocument();
    });

    it('renders a name field', () => {
      render(<Login />);
      expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    });

    it('renders an email field', () => {
      render(<Login />);
      expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    });

    it('renders a password field', () => {
      render(<Login />);
      expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    });

    it('renders a submit button', () => {
      render(<Login />);
      expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
    });
  });

  describe('field types', () => {
    it('renders email field with type email', () => {
      render(<Login />);
      expect(screen.getByLabelText(/email/i)).toHaveAttribute('type', 'email');
    });

    it('renders password field with type password so value is masked', () => {
      render(<Login />);
      expect(screen.getByLabelText(/password/i)).toHaveAttribute('type', 'password');
    });
  });

  describe('submit with all fields filled', () => {
    it('calls onSubmit handler when all fields are provided', () => {
      const handleSubmit = jest.fn((e) => e.preventDefault());
      render(<Login onSubmit={handleSubmit} />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('does not display a validation error when all fields are filled', () => {
      render(<Login />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('submit with empty fields', () => {
    it('does not call onSubmit when all fields are empty', () => {
      const handleSubmit = jest.fn();
      render(<Login onSubmit={handleSubmit} />);

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('shows a validation error when name is empty', () => {
      render(<Login />);

      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('shows a validation error when email is empty', () => {
      render(<Login />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('shows a validation error when password is empty', () => {
      render(<Login />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });
  });

  describe('security — invalid inputs', () => {
    it('shows a validation error for a malformed email address', () => {
      render(<Login />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'not-an-email');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.getByRole('alert')).toBeInTheDocument();
    });

    it('does not call onSubmit for a malformed email address', () => {
      const handleSubmit = jest.fn();
      render(<Login onSubmit={handleSubmit} />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'not-an-email');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('does not call onSubmit when name contains only whitespace', () => {
      const handleSubmit = jest.fn();
      render(<Login onSubmit={handleSubmit} />);

      userEvent.type(screen.getByLabelText(/name/i), '   ');
      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('does not call onSubmit when password contains only whitespace', () => {
      const handleSubmit = jest.fn();
      render(<Login onSubmit={handleSubmit} />);

      userEvent.type(screen.getByLabelText(/name/i), 'Jane Doe');
      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      userEvent.type(screen.getByLabelText(/password/i), '   ');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('rejects XSS-like script content in name field', () => {
      const handleSubmit = jest.fn();
      render(<Login onSubmit={handleSubmit} />);

      userEvent.type(screen.getByLabelText(/name/i), '<script>alert("xss")</script>');
      userEvent.type(screen.getByLabelText(/email/i), 'jane@example.com');
      userEvent.type(screen.getByLabelText(/password/i), 'securePass123');

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      expect(screen.getByRole('alert')).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });
  });

  describe('security — sensitive data not exposed', () => {
    it('does not render the password value as visible text in the document', () => {
      render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, 'mySecretPassword');

      expect(screen.queryByText('mySecretPassword')).not.toBeInTheDocument();
    });

    it('password field value is not present inside any non-input element', () => {
      const { container } = render(<Login />);

      const passwordInput = screen.getByLabelText(/password/i);
      userEvent.type(passwordInput, 'hiddenSecret');

      const nonInputText = Array.from(container.querySelectorAll('*'))
        .filter((el) => el.tagName.toLowerCase() !== 'input')
        .map((el) => el.textContent)
        .join('');

      expect(nonInputText).not.toContain('hiddenSecret');
    });

    it('does not expose error details that reveal system internals', () => {
      render(<Login />);

      fireEvent.click(screen.getByRole('button', { name: /login/i }));

      const alert = screen.getByRole('alert');
      expect(alert.textContent).not.toMatch(/stack|trace|exception|undefined|null/i);
    });
  });
});