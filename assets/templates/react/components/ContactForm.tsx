import React, { useState, FormEvent } from 'react';

interface ContactFormProps {
  heading?: string;
  subtitle?: string;
  submitText?: string;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  heading = 'Get in Touch',
  subtitle = 'We would love to hear from you',
  submitText = 'Send Message'
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo)');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section className="contact-form">
      <div className="container">
        <div className="section-header">
          <h2>{heading}</h2>
          <p className="section-subtitle">{subtitle}</p>
        </div>
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              placeholder="Your message here..."
            />
          </div>
          <button type="submit" className="btn btn-primary">{submitText}</button>
        </form>
      </div>
    </section>
  );
};
