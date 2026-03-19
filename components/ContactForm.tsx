'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './Button';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  investorType: string;
  message: string;
}

type FormErrors = Partial<Record<keyof FormData, string>>;

const INVESTOR_TYPES = [
  { value: '', label: 'Select Investor Type' },
  { value: 'individual', label: 'Individual Investor' },
  { value: 'hnw', label: 'High-Net-Worth Individual' },
  { value: 'institutional', label: 'Institutional Investor' },
  { value: 'international', label: 'International Investor' },
  { value: 'business', label: 'Business Partner' },
];

const INITIAL: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  investorType: '',
  message: '',
};

function validate(form: FormData): FormErrors {
  const errs: FormErrors = {};
  if (!form.firstName.trim()) errs.firstName = 'First name is required';
  if (!form.lastName.trim()) errs.lastName = 'Last name is required';
  if (!form.email.trim()) {
    errs.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errs.email = 'Please enter a valid email address';
  }
  if (!form.investorType) errs.investorType = 'Please select an investor type';
  if (!form.message.trim()) errs.message = 'Message is required';
  else if (form.message.trim().length < 20) errs.message = 'Please enter at least 20 characters';
  return errs;
}

export function ContactForm() {
  const [form, setForm] = useState<FormData>(INITIAL);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormData, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const set = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
    if (touched[field]) {
      const errs = validate({ ...form, [field]: e.target.value });
      setErrors((prev) => ({ ...prev, [field]: errs[field] }));
    }
  };

  const blur = (field: keyof FormData) => () => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const errs = validate(form);
    setErrors((prev) => ({ ...prev, [field]: errs[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = Object.fromEntries(
      (Object.keys(form) as (keyof FormData)[]).map((k) => [k, true])
    );
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setSubmitting(true);
    setApiError(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        throw new Error('Server error');
      }

      setSubmitted(true);
    } catch {
      setApiError('Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Input / select / textarea base styles — cream bg, gold focus ring
  const inputBase =
    'w-full bg-cream/10 border rounded-sm px-4 py-3 font-body text-sm text-cream placeholder-gray-500 outline-none transition-all duration-200 focus:bg-cream/15 focus:ring-1';
  const inputNormal = 'border-white/15 focus:border-gold focus:ring-gold/40';
  const inputError = 'border-red-400/60 focus:border-red-400 focus:ring-red-400/30';

  const field = (name: keyof FormData) =>
    `${inputBase} ${errors[name] && touched[name] ? inputError : inputNormal}`;

  const labelClass = 'block font-body text-xs text-gray-400 mb-1.5 uppercase tracking-widest';

  return (
    <AnimatePresence mode="wait">
      {submitted ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="flex flex-col items-center text-center gap-5 py-10"
        >
          <div className="w-16 h-16 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center">
            <CheckCircle className="text-gold" size={32} />
          </div>
          <div>
            <h3 className="font-display text-2xl font-600 text-cream mb-2">
              Thank You for Reaching Out
            </h3>
            <p className="font-body text-sm text-gray-400 leading-relaxed max-w-xs">
              Thank you for your inquiry. We&apos;ll be in touch within 24 hours.
            </p>
          </div>
          <button
            onClick={() => { setSubmitted(false); setForm(INITIAL); setTouched({}); setErrors({}); setApiError(null); }}
            className="font-body text-xs text-gray-500 hover:text-gold transition-colors underline underline-offset-2 mt-2"
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="space-y-5"
          noValidate
        >
          {/* First + Last name */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className={labelClass}>First Name</label>
              <input
                id="firstName"
                type="text"
                placeholder="First Name"
                value={form.firstName}
                onChange={set('firstName')}
                onBlur={blur('firstName')}
                className={field('firstName')}
                autoComplete="given-name"
              />
              <FieldError msg={touched.firstName ? errors.firstName : undefined} />
            </div>
            <div>
              <label htmlFor="lastName" className={labelClass}>Last Name</label>
              <input
                id="lastName"
                type="text"
                placeholder="Last Name"
                value={form.lastName}
                onChange={set('lastName')}
                onBlur={blur('lastName')}
                className={field('lastName')}
                autoComplete="family-name"
              />
              <FieldError msg={touched.lastName ? errors.lastName : undefined} />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className={labelClass}>Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="Email Address"
              value={form.email}
              onChange={set('email')}
              onBlur={blur('email')}
              className={field('email')}
              autoComplete="email"
            />
            <FieldError msg={touched.email ? errors.email : undefined} />
          </div>

          {/* Investor type */}
          <div>
            <label htmlFor="investorType" className={labelClass}>Investor Type</label>
            <select
              id="investorType"
              value={form.investorType}
              onChange={set('investorType')}
              onBlur={blur('investorType')}
              className={`${field('investorType')} cursor-pointer`}
            >
              {INVESTOR_TYPES.map((t) => (
                <option key={t.value} value={t.value} className="bg-navy text-cream">
                  {t.label}
                </option>
              ))}
            </select>
            <FieldError msg={touched.investorType ? errors.investorType : undefined} />
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className={labelClass}>Your Message</label>
            <textarea
              id="message"
              placeholder="Your Message"
              value={form.message}
              onChange={set('message')}
              onBlur={blur('message')}
              rows={5}
              className={`${field('message')} resize-none`}
            />
            <FieldError msg={touched.message ? errors.message : undefined} />
          </div>

          <Button
            type="submit"
            variant="primary"
            showArrow
            className="w-full justify-center"
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Send Message'}
          </Button>

          {apiError && (
            <p className="flex items-center gap-1.5 font-body text-xs text-red-400 mt-2">
              <AlertCircle size={11} />
              {apiError}
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}

function FieldError({ msg }: { msg?: string }) {
  return (
    <AnimatePresence>
      {msg && (
        <motion.p
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 mt-1.5 font-body text-xs text-red-400"
        >
          <AlertCircle size={11} />
          {msg}
        </motion.p>
      )}
    </AnimatePresence>
  );
}
