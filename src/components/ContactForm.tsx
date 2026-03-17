"use client";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import countryCodes from "@/data/countryCode.json";
import { ChevronDown } from "lucide-react";
import { useTranslations, useLocale } from "next-intl";

type CountryCode = {
  name: string;
  code: string;
  emoji: string;
  unicode: string;
  image: string;
  dial_code: string;
};

type FormData = {
  lang: string;
  full_name: string;
  email: string;
  phone_number: string;
  dial_code: string;
  company: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormData, string>>;
type TouchedFields = Partial<Record<keyof FormData, boolean>>;
type Status = null | "loading" | "success" | "error";

const initialState: FormData = {
  lang: "",
  full_name: "",
  email: "",
  phone_number: "",
  dial_code: "+32",
  company: "",
  message: "",
};

// ─── FieldError helper ─────────────────────────────────────────────────────────
function FieldError({ message }: { message?: string }) {
  if (!message) return null;
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
      >
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      {message}
    </p>
  );
}

// ─── Input class helper ────────────────────────────────────────────────────────
function inputClass(hasError: boolean) {
  return `h-11 w-full rounded-lg border px-3 text-sm text-gray-900 placeholder-gray-400 outline-none transition
    ${
      hasError
        ? "border-red-400 focus:border-red-400 focus:ring-2 focus:ring-red-100"
        : "border-gray-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
    }`;
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function ContactForm() {
  const t = useTranslations("ContactSection");
  const locale = useLocale();

  const [formData, setFormData] = useState<FormData>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<TouchedFields>({});
  const [status, setStatus] = useState<Status>(null);
  const [responseMsg, setResponseMsg] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  const countries = countryCodes as CountryCode[];

  const selectedCountry =
    countries.find((c) => c.dial_code === formData.dial_code) ??
    countries.find((c) => c.dial_code === "+32")!;

  // ─── Validators (inside component to access t()) ──────────────────────────
  const validate = useCallback(
    (data: FormData): FormErrors => {
      const errors: FormErrors = {};

      if (!data.full_name.trim()) {
        errors.full_name = t("validationFullNameRequired");
      } else if (data.full_name.trim().length < 2) {
        errors.full_name = t("validationFullNameMin");
      }

      if (!data.email.trim()) {
        errors.email = t("validationEmailRequired");
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        errors.email = t("validationEmailInvalid");
      }

      if (!data.phone_number.trim()) {
        errors.phone_number = t("validationPhoneRequired");
      } else if (!/^\d{6,15}$/.test(data.phone_number.replace(/\s+/g, ""))) {
        errors.phone_number = t("validationPhoneInvalid");
      }

      if (!data.company.trim()) {
        errors.company = t("validationCompanyRequired");
      }

      // message is optional — no validation needed

      return errors;
    },
    [t],
  );

  const filteredCountries = useMemo(() => {
    const q = search.toLowerCase().trim();
    if (!q) return countries;
    return countries.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.dial_code.includes(q) ||
        c.code.toLowerCase().includes(q),
    );
  }, [search, countries]);

  // Focus search when dropdown opens
  useEffect(() => {
    if (showDropdown) {
      setTimeout(() => searchRef.current?.focus(), 50);
    } else {
      setSearch("");
    }
  }, [showDropdown]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Re-validate touched fields whenever formData changes
  useEffect(() => {
    if (Object.keys(touched).length === 0) return;
    const allErrors = validate(formData);
    setErrors((prev) => {
      const next = { ...prev };
      (Object.keys(touched) as (keyof FormData)[]).forEach((field) => {
        if (touched[field]) {
          next[field] = allErrors[field];
        }
      });
      return next;
    });
  }, [formData, validate]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // Validate on blur
  const handleBlur = (field: keyof FormData) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const allErrors = validate(formData);
    setErrors((prev) => ({ ...prev, [field]: allErrors[field] }));
  };

  const handleCountrySelect = (dial_code: string) => {
    setFormData((prev) => ({ ...prev, dial_code }));
    setShowDropdown(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Mark all fields as touched and show all errors on submit
    const allTouched: TouchedFields = {
      full_name: true,
      email: true,
      phone_number: true,
      company: true,
      message: true,
    };
    setTouched(allTouched);
    setFormData((prev) => ({ ...prev, lang: locale }));

    const allErrors = validate(formData);
    setErrors(allErrors);

    if (Object.keys(allErrors).length > 0) return;

    setStatus("loading");
    setResponseMsg("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang: locale,
          full_name: formData.full_name,
          email: formData.email,
          phone_number: `${formData.dial_code}${formData.phone_number}`,
          company: formData.company,
          message: formData.message || null,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setFormData(initialState);
        setTouched({});
        setErrors({});
      } else {
        setStatus("error");
        setResponseMsg(data.message || t("formError"));
      }
    } catch {
      setStatus("error");
      setResponseMsg(t("formError"));
    }
  };

  return (
    <div className="flex w-full items-start justify-center">
      <div className="w-full rounded-xl bg-white p-5 shadow-md">
        <form
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-5"
        >
          {/* Full Name */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              {t("formFullName")} <span className="text-red-500">*</span>
            </label>
            <input
              name="full_name"
              type="text"
              placeholder="John Doe"
              value={formData.full_name}
              onChange={handleChange}
              onBlur={() => handleBlur("full_name")}
              required
              className={inputClass(!!errors.full_name)}
            />
            <FieldError message={errors.full_name} />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              {t("formEmail")} <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="pointer-events-none absolute left-3 text-gray-400">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M2 7l10 7 10-7" />
                </svg>
              </span>
              <input
                name="email"
                type="email"
                placeholder="john@company.com"
                value={formData.email}
                onChange={handleChange}
                onBlur={() => handleBlur("email")}
                required
                className={`${inputClass(!!errors.email)} pl-9`}
              />
            </div>
            <FieldError message={errors.email} />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              {t("formPhoneNumber")} <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-2">
              {/* Country Dropdown */}
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setShowDropdown((v) => !v)}
                  className="flex h-11 cursor-pointer items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 transition hover:border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-100"
                >
                  <img
                    src={`https://country-code-au6g.vercel.app/${selectedCountry.image}`}
                    alt={selectedCountry.name}
                    className="h-4 w-6 object-cover"
                  />
                  <span className="text-xs text-gray-500">
                    {selectedCountry.dial_code}
                  </span>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {showDropdown && (
                  <div className="absolute left-0 top-12 z-50 w-64 rounded-lg border border-gray-200 bg-white shadow-lg">
                    {/* Search */}
                    <div className="border-b border-gray-100 p-2">
                      <div className="relative flex items-center">
                        <span className="pointer-events-none absolute left-2.5 text-gray-400">
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <circle cx="11" cy="11" r="8" />
                            <path d="M21 21l-4.35-4.35" />
                          </svg>
                        </span>
                        <input
                          ref={searchRef}
                          type="text"
                          placeholder={t("searchCountry")}
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          className="h-8 w-full rounded-md border border-gray-200 pl-7 pr-3 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-yellow-400 focus:ring-1 focus:ring-yellow-100"
                        />
                      </div>
                    </div>

                    {/* Country List */}
                    <ul className="max-h-48 overflow-y-auto py-1">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((c) => (
                          <li key={`${c.code}-${c.dial_code}`}>
                            <button
                              type="button"
                              onClick={() => handleCountrySelect(c.dial_code)}
                              className={`flex w-full cursor-pointer items-center gap-2.5 px-3 py-2 text-left text-sm transition hover:bg-yellow-50 ${
                                c.dial_code === formData.dial_code
                                  ? "bg-yellow-50 font-medium"
                                  : ""
                              }`}
                            >
                              <img
                                src={`https://country-code-au6g.vercel.app/${c.image}`}
                                alt={c.name}
                                className="h-4 w-6 object-cover"
                              />
                              <span className="flex-1 truncate text-gray-800">
                                {c.name}
                              </span>
                              <span className="shrink-0 text-xs text-gray-400">
                                {c.dial_code}
                              </span>
                            </button>
                          </li>
                        ))
                      ) : (
                        <li className="px-3 py-4 text-center text-sm text-gray-400">
                          {t("noResults")}
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <input
                  name="phone_number"
                  type="tel"
                  placeholder={t("formPhoneNumberPlaceholder")}
                  value={formData.phone_number}
                  onChange={handleChange}
                  onBlur={() => handleBlur("phone_number")}
                  required
                  className={inputClass(!!errors.phone_number)}
                />
              </div>
            </div>
            <FieldError message={errors.phone_number} />
          </div>

          {/* Company */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              {t("formCompany")} <span className="text-red-500">*</span>
            </label>
            <input
              name="company"
              type="text"
              value={formData.company}
              onChange={handleChange}
              onBlur={() => handleBlur("company")}
              required
              className={inputClass(!!errors.company)}
            />
            <FieldError message={errors.company} />
          </div>

          {/* Message */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-gray-800">
              {t("formMessage")}
            </label>
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="w-full resize-y rounded-lg border border-gray-200 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none transition focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={status === "loading"}
            className="mt-1 h-12 w-full cursor-pointer rounded-lg bg-brand-accent text-sm font-semibold text-gray-900 transition hover:bg-brand-accent/80 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {status === "loading" ? t("formSending") : t("formSubmit")}
          </button>

          {status === "success" && (
            <p className="text-center text-sm font-medium text-green-600">
              {t("formSuccess")}
            </p>
          )}
          {status === "error" && (
            <p className="text-center text-sm font-medium text-red-500">
              {responseMsg || t("formError")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
