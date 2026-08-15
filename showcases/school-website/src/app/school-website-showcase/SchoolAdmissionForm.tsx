'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

import { ACADEMIC_YEARS, GRADE_OPTIONS } from './school-demo-data';
import { useSchoolDemo } from './SchoolDemoContext';

type SchoolAdmissionFormProps = {
  compact?: boolean;
  dense?: boolean;
  hero?: boolean;
  onSuccess?: () => void;
};

export function SchoolAdmissionForm({
  compact = false,
  dense = false,
  hero = false,
  onSuccess,
}: SchoolAdmissionFormProps) {
  const { showToast, openWhatsApp } = useSchoolDemo();
  const [parentName, setParentName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [academicYear, setAcademicYear] = useState('');
  const [grade, setGrade] = useState('');
  const [message, setMessage] = useState('');

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hero) {
      if (!parentName.trim() || !mobile.trim() || !grade) {
        showToast('Please fill Parent Name, Mobile & Grade', 'error');
        return;
      }
      if (mobile.replace(/\D/g, '').length < 10) {
        showToast('Please enter a valid 10-digit mobile number', 'error');
        return;
      }
    } else if (!parentName.trim() || !mobile.trim() || !grade) {
      showToast('Please fill required fields · name, mobile & grade', 'error');
      return;
    }
    if (mobile.replace(/\D/g, '').length < 10) {
      showToast('Please enter a valid 10-digit mobile number', 'error');
      return;
    }
    showToast('Enquiry submitted · admissions team will call within 24 hours', 'success');
    setParentName('');
    setMobile('');
    setEmail('');
    setAcademicYear('');
    setGrade('');
    setMessage('');
    onSuccess?.();
  };

  const fieldClass = hero
    ? 'school-input-hero w-full rounded-md px-3.5 py-2.5 text-sm'
    : dense
      ? 'school-input w-full rounded-md px-3 py-2 text-sm'
      : 'school-input w-full rounded-lg';

  if (hero) {
    return (
      <form onSubmit={submit} className="space-y-3" aria-label="Admissions enquiry">
        <div>
          <label htmlFor="school-hero-parent" className="sr-only">
            Parent name
          </label>
          <input
            id="school-hero-parent"
            required
            value={parentName}
            onChange={(e) => setParentName(e.target.value)}
            placeholder="Parent Name *"
            className={fieldClass}
            autoComplete="name"
          />
        </div>
        <div>
          <label htmlFor="school-hero-mobile" className="sr-only">
            Mobile number
          </label>
          <input
            id="school-hero-mobile"
            required
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="Mobile Number *"
            className={fieldClass}
            inputMode="tel"
            autoComplete="tel"
          />
        </div>
        <div>
          <label htmlFor="school-hero-grade" className="sr-only">
            Grade applying for
          </label>
          <select
            id="school-hero-grade"
            required
            value={grade}
            onChange={(e) => setGrade(e.target.value)}
            className={fieldClass}
          >
            <option value="">Grade Applying For *</option>
            {GRADE_OPTIONS.map((g) => (
              <option key={g} value={g}>
                {g}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="school-btn-orange w-full rounded-md py-3 text-sm font-bold uppercase tracking-wide"
        >
          Submit Request
        </button>
        <button
          type="button"
          onClick={openWhatsApp}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-[#25D366] hover:underline"
        >
          <MessageCircle className="h-4 w-4 text-[#25D366]" aria-hidden />
          Chat on WhatsApp
        </button>
      </form>
    );
  }

  return (
    <form onSubmit={submit} className={dense ? 'space-y-2' : compact ? 'space-y-3' : 'space-y-3.5'}>
      <input
        required
        value={parentName}
        onChange={(e) => setParentName(e.target.value)}
        placeholder="Parent Name *"
        className={fieldClass}
      />
      <input
        required
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        placeholder="Mobile Number *"
        className={fieldClass}
        inputMode="tel"
      />
      {!dense ? (
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="Email"
          className={fieldClass}
        />
      ) : null}
      {!dense ? (
        <select
          value={academicYear}
          onChange={(e) => setAcademicYear(e.target.value)}
          className={fieldClass}
        >
          <option value="">Academic Year</option>
          {ACADEMIC_YEARS.map((y) => (
            <option key={y} value={y}>
              {y}
            </option>
          ))}
        </select>
      ) : null}
      <select
        required
        value={grade}
        onChange={(e) => setGrade(e.target.value)}
        className={fieldClass}
      >
        <option value="">Select Grade *</option>
        {GRADE_OPTIONS.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select>
      {!dense ? (
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message"
          rows={compact ? 2 : 3}
          className={`${fieldClass} resize-none`}
        />
      ) : null}
      <button
        type="submit"
        className={`school-btn-orange w-full rounded-md font-bold uppercase tracking-wide ${dense ? 'py-2.5 text-xs' : 'rounded-lg py-3 text-sm'}`}
      >
        Submit Enquiry
      </button>
      {!dense ? (
        <button
          type="button"
          onClick={openWhatsApp}
          className="flex w-full items-center justify-center gap-2 text-sm font-semibold text-[var(--school-brand)] hover:underline"
        >
          <MessageCircle className="h-4 w-4" aria-hidden />
          Chat on WhatsApp
        </button>
      ) : null}
    </form>
  );
}
