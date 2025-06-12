import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { BsChevronDown } from "react-icons/bs";
import Cookies from "js-cookie";


export default function LanguageSwitcher({
  isScrolled,
  categories,
  selectedService,
}) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(
    router.locale?.toUpperCase() || "AZ"
  );
  const dropdownRef = useRef(null);

  const handleLanguageChange = (language) => {
    const newLang = language.toLowerCase();
    if (language.toUpperCase() === selectedLanguage) return;

    setSelectedLanguage(language.toUpperCase());
    i18n.changeLanguage(newLang);
    Cookies.set("selectedLanguage", language.toUpperCase(), { expires: 365 });
    setIsDropdownOpen(false);

    const { pathname, query } = router;
    // figure out the new slug, if we’re on a service page
    const currentSlug = typeof query.service === "string" ? query.service : null;
    let newServiceSlug = currentSlug;

    if (selectedService && categories) {
      // flatten all services and find the one matching our service.id
      const allServices = categories.flatMap((c) => c.services);
      const match = allServices.find((s) => s.id === selectedService.id);
      if (match) {
        newServiceSlug = match.slug;
      }
    }

    const newQuery = { ...query };
    if (newServiceSlug) {
      newQuery.service = newServiceSlug;
    } else {
      delete newQuery.service;
    }

    router.push(
      { pathname, query: newQuery },
      undefined,
      { locale: newLang }
    );
  };

  // initialize from cookie
  useEffect(() => {
    const saved = Cookies.get("selectedLanguage") || router.locale?.toUpperCase() || "AZ";
    setSelectedLanguage(saved);
    i18n.changeLanguage(saved.toLowerCase());
  }, [i18n, router.locale]);

  // close dropdown on outside click
  useEffect(() => {
    const onClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsDropdownOpen(true)}
      onMouseLeave={() => setIsDropdownOpen(false)}
      ref={dropdownRef}
    >
      <button
        className="px-2 flex items-center gap-2 py-1 text-base font-gilroy focus:outline-none"
        type="button"
      >
        {selectedLanguage}
        <BsChevronDown
          className={`text-xs transform-gpu origin-center transition-all duration-300 ease-out ${
            isDropdownOpen ? "rotate-180 scale-110" : "rotate-0 scale-100"
          }`}
        />
      </button>

      <div
        className={`absolute z-50 w-28 mt-2 font-gilroy bg-white border border-gray-300 rounded shadow-lg p-2 transition-all duration-200 ease-in-out ${
          isDropdownOpen ? "opacity-100 translate-y-0 visible" : "opacity-0 -translate-y-2 invisible"
        } left-1/2 -translate-x-1/2`}
      >
        <ul>
          {["AZ", "EN", "RU"].map((lang) => (
            <li
              key={lang}
              className={`px-4 py-2 cursor-pointer rounded hover:bg-gray-100 transition-colors ${
                selectedLanguage === lang ? "font-semibold" : ""
              }`}
              onClick={() => handleLanguageChange(lang)}
            >
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
