'use client';

import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    areaOfInterest: '',
    message: '',
    newsletter: false,
  });

  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // First Name validation
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First Name is required';
    } else if (formData.firstName.trim().length < 2) {
      newErrors.firstName = 'First Name must be at least 2 characters';
    }

    // Last Name validation
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last Name is required';
    } else if (formData.lastName.trim().length < 2) {
      newErrors.lastName = 'Last Name must be at least 2 characters';
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but if provided, validate format)
    if (formData.phone.trim() && !/^[\d\s\-\+\(\)]+$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Area of Interest validation
    if (!formData.areaOfInterest) {
      newErrors.areaOfInterest = 'Please select an Area of Interest';
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { error?: string }).error ?? "Submission failed");
      }

      setSubmitted(true);
      setErrors({});
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        areaOfInterest: "",
        message: "",
        newsletter: false,
      });
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 my-12">
      {/* Blue Header Section */}
      <div className="bg-blue-600 text-white py-12 px-6 md:px-12 rounded-t-lg">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Get in Touch</h1>
          <p className="text-lg md:text-xl mb-8">We are excited to learn how we can help you</p>

          {/* Contact Info Cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Phone Card */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-lg">Speak to an expert <span className="font-bold">+91 773 774 6005</span></p>
                <p className="text-blue-100 text-sm">MON - SAT, 8:00 AM - 7:00 PM (IST)</p>
              </div>
            </div>

            {/* Email Card */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <p className="font-semibold">Questions about Senowell Systems or Products?</p>
                <p className="font-bold text-lg">sales@senowell.systems</p>
              </div>
            </div>
          </div>

          {/* Interest Points */}
          <ul className="space-y-2 text-sm md:text-base">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Interested in our testing services?
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Looking for more information on our monitoring and consulting expertise?
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              Want to learn more about our innovative products?
            </li>
          </ul>
        </div>
      </div>

      {/* Form Section */}
      <main className="py-12 px-6 md:px-12 rounded-b-lg shadow-lg" style={{ backgroundColor: '#e7e7f1' }}>
        <div className="max-w-6xl mx-auto">
          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg">
              Thank you for your inquiry! We will get back to you soon.
            </div>
          )}

          {submitError && (
            <div className="mb-6 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* First and Last Name Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="firstName" className="block text-sm font-bold text-gray-900 mb-2">
                  First Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                    errors.firstName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter Your First Name..."
                />
                {errors.firstName && (
                  <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-bold text-gray-900 mb-2">
                  Last Name<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                    errors.lastName ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter Your Last Name..."
                />
                {errors.lastName && (
                  <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email and Phone Row */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="email" className="block text-sm font-bold text-gray-900 mb-2">
                  Email<span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                    errors.email ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter Your Email..."
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-bold text-gray-900 mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                    errors.phone ? 'border-red-500' : 'border-gray-300'
                  }`}
                  placeholder="Enter Your Phone..."
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </div>

            {/* Area of Interest */}
            <div>
              <label htmlFor="areaOfInterest" className="block text-sm font-bold text-gray-900 mb-2">
                Area of Interest<span className="text-red-500">*</span>
              </label>
              <select
                id="areaOfInterest"
                name="areaOfInterest"
                value={formData.areaOfInterest}
                onChange={handleChange}
                required
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-50 ${
                  errors.areaOfInterest ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Select Your Area of Interest...</option>
                <option value="testing">Testing Services</option>
                <option value="monitoring">Monitoring Services</option>
                <option value="consulting">Consulting Services</option>
                <option value="products">Products</option>
                <option value="other">Other</option>
              </select>
              {errors.areaOfInterest && (
                <p className="text-red-500 text-xs mt-1">{errors.areaOfInterest}</p>
              )}
            </div>

            {/* Message Field */}
            <div>
              <label htmlFor="message" className="block text-sm font-bold text-gray-900 mb-2">
                Please tell us more about what you are looking for, or if you have any questions or comments below.<span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none bg-gray-50 ${
                  errors.message ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="Enter Your Message..."
              />
              {errors.message && (
                <p className="text-red-500 text-xs mt-1">{errors.message}</p>
              )}
            </div>

            {/* Checkbox and Submit */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="newsletter"
                  name="newsletter"
                  checked={formData.newsletter}
                  onChange={handleChange}
                  className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
                />
                <label htmlFor="newsletter" className="text-sm font-semibold text-gray-900">
                  I would like to receive news from Geocomp
                </label>
              </div>

              <p className="text-xs text-gray-600">
                Fields marked with <span className="text-red-500">*</span> are required.
              </p>

              <button
                type="submit"
                disabled={submitting}
                className="bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 px-8 rounded-lg transition-colors w-full md:w-auto"
              >
                {submitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
