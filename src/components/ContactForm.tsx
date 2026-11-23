import React, { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    vehicleRegistration: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [submittedData, setSubmittedData] = useState<{ name: string; vehicleRegistration: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'vehicleRegistration' ? value.toUpperCase() : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.vehicleRegistration.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    setStatus('submitting');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok && result.ok) {
        setSubmittedData({
          name: formData.name.trim(),
          vehicleRegistration: formData.vehicleRegistration.trim()
        });
        setStatus('success');
        setFormData({ name: '', vehicleRegistration: '', message: '' });
      } else {
        setStatus('error');
        setErrorMessage(result.error || 'Failed to submit enquiry. Please try again or message Charlie on WhatsApp.');
      }
    } catch (err) {
      // Even if network glitches, provide a clear fallback
      setStatus('error');
      setErrorMessage('A connection error occurred. Please try again or reach Charlie directly via WhatsApp or phone.');
    }
  };

  if (status === 'success' && submittedData) {
    const whatsappText = encodeURIComponent(
      `Hi Charlie, I just submitted a quote enquiry online.\nName: ${submittedData.name}\nVehicle Reg: ${submittedData.vehicleRegistration}`
    );
    return (
      <div className="contact-request" style={{ textAlign: 'center', padding: '50px 24px' }}>
        <div style={{
          width: '64px',
          height: '64px',
          borderRadius: '50%',
          background: 'oklch(93% 0.034 252)',
          color: 'var(--color-primary)',
          display: 'grid',
          placeItems: 'center',
          margin: '0 auto 20px'
        }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12"></polyline>
          </svg>
        </div>
        <h3 style={{ font: '700 36px / 1 var(--font-display)', textTransform: 'uppercase', marginBottom: '12px' }}>
          Enquiry Received
        </h3>
        <p style={{ maxWidth: '520px', margin: '0 auto 24px', color: 'var(--color-muted-foreground)', fontSize: '15px', lineHeight: '1.6' }}>
          Thank you, <strong>{submittedData.name}</strong>. Your quote enquiry for vehicle registration{' '}
          <strong style={{ color: 'var(--color-primary)', letterSpacing: '0.05em' }}>{submittedData.vehicleRegistration}</strong> has been logged. Charlie will review your vehicle details and get back to you shortly.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <a
            href={`https://wa.me/447940834897?text=${whatsappText}`}
            target="_blank"
            rel="noreferrer"
            className="brand-button btn-primary"
          >
            Message on WhatsApp
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 7h10v10"></path>
              <path d="M7 17 17 7"></path>
            </svg>
          </a>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="brand-button btn-outline"
          >
            Send Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="contact-request" aria-labelledby="contact-request-title">
      <div className="contact-request-heading">
        <div className="section-kicker">Quote enquiry</div>
        <h2 id="contact-request-title">Tell Charlie what your vehicle needs.</h2>
        <p>Share your vehicle details and service requirements, and Charlie will provide an honest, accurate quote.</p>
      </div>

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        {status === 'error' && (
          <div className="form-status error" style={{ gridColumn: '1 / -1' }} role="alert">
            {errorMessage}
          </div>
        )}

        <div className="contact-form-field">
          <label htmlFor="contact-name">
            Full Name <span style={{ color: 'var(--color-primary)' }}>*</span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            placeholder="e.g. John Smith"
            autoComplete="name"
            maxLength={100}
            required
            value={formData.name}
            onChange={handleChange}
            disabled={status === 'submitting'}
          />
        </div>

        <div className="contact-form-field">
          <label htmlFor="vehicle-registration">
            Vehicle Registration <span style={{ color: 'var(--color-primary)' }}>*</span>
          </label>
          <input
            id="vehicle-registration"
            name="vehicleRegistration"
            type="text"
            placeholder="e.g. AB12 CDE"
            autoComplete="off"
            maxLength={20}
            required
            value={formData.vehicleRegistration}
            onChange={handleChange}
            style={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}
            disabled={status === 'submitting'}
          />
        </div>

        <div className="contact-form-field contact-form-message">
          <label htmlFor="contact-message">
            Message & Service Details <span style={{ color: 'var(--color-primary)' }}>*</span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={5}
            maxLength={1500}
            placeholder="Please describe the vehicle issue, service needed (e.g. Full Service, Brake Replacement, Oil Change), and your location..."
            required
            value={formData.message}
            onChange={handleChange}
            disabled={status === 'submitting'}
          ></textarea>
        </div>

        <div className="contact-form-submit">
          <button
            type="submit"
            className="brand-button btn-primary"
            disabled={status === 'submitting'}
            style={{ opacity: status === 'submitting' ? 0.7 : 1 }}
          >
            {status === 'submitting' ? (
              <>
                <svg className="animate-spin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Sending enquiry...
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                  <path d="m21.854 2.147-10.94 10.939"></path>
                </svg>
                Send Quote Enquiry
              </>
            )}
          </button>
        </div>
      </form>
    </section>
  );
}
