import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Container from "../Container";
import { useRouter } from "next/router";
import LanguageSwitcher from "../LanguageSwitcher";
import { useTranslation } from "react-i18next";

function Header({ backgroundImage, settings, categories }) {
  const { t } = useTranslation();
  const servicesCategory = categories.find((cat) => cat.id === 1);
  const suvarmaCategory = categories.find((cat) => cat.id === 2);
  const router = useRouter();
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [isSuvarmaHovered, setIsSuvarmaHovered] = useState(false);
  const [servicesDropdownHovered, setServicesDropdownHovered] = useState(false);
  const [suvarmaDropdownHovered, setSuvarmaDropdownHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileSuvarmaOpen, setMobileSuvarmaOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const showServicesDropdown = isServicesHovered || servicesDropdownHovered;
  const showSuvarmaDropdown = isSuvarmaHovered || suvarmaDropdownHovered;
  const servicesCloseTimeout = useRef(null);
  const suvarmaCloseTimeout = useRef(null);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const openServices = () => {
    window.clearTimeout(servicesCloseTimeout.current);
    setIsServicesHovered(true);
  };

  const toggleScroll = () => {
    setIsScrolled(!isScrolled);
  };
  const closeServices = () => {
    servicesCloseTimeout.current = window.setTimeout(
      () => setIsServicesHovered(false),
      200
    );
  };

  const openSuvarma = () => {
    window.clearTimeout(suvarmaCloseTimeout.current);
    setIsSuvarmaHovered(true);
  };

  const closeSuvarma = () => {
    suvarmaCloseTimeout.current = window.setTimeout(
      () => setIsSuvarmaHovered(false),
      200
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset mobile dropdowns when closing menu
    if (mobileMenuOpen) {
      setMobileServicesOpen(false);
      setMobileSuvarmaOpen(false);
    }
    // Disable body scroll when mobile menu is open
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  const toggleMobileSuvarma = () => {
    setMobileSuvarmaOpen(!mobileSuvarmaOpen);
  };

  // This function handles service clicks
  const handleServiceClick = async (slug, type) => {
    if (!slug) return;

    // First navigate to the appropriate page
    router.push({
      pathname: `/${type}`,
      query: { service: slug }, // Add slug as query parameter
    });

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://agriman.markup.az/api/service/${slug}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch service details: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.status && data.data) {
        localStorage.setItem("selectedService", JSON.stringify(data.data));
        setSelectedService(data.data);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching service:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-[9999] transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      style={{
        backgroundImage:
          backgroundImage && !isScrolled
            ? `url(${backgroundImage})`
            : undefined,
      }}
    >
      <Container>
        <div className="w-full flex justify-between items-center py-4">
          <div onClick={() => router.push("/")} className="z-60">
            <Image
              src={settings?.logo?.logo}
              alt="Logo"
              width={240}
              height={100}
              className={`cursor-pointer  w-[140px] transition-filter duration-300 ${
                isScrolled ? "filter brightness-0" : ""
              }`}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-10">
            <nav className="font-archivo">
              <ul className="flex gap-8 items-center">
                <li
                  onClick={() => router.push("/about")}
                  className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  {t("nav.about")}
                </li>
                <li
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={closeServices}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {t("nav.services")}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        showServicesDropdown ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke={isScrolled ? "#5E7740" : "white"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {/* Services Dropdown Content */}
                  {showServicesDropdown && servicesCategory && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-50"
                      onMouseEnter={() => setServicesDropdownHovered(true)}
                      onMouseLeave={() => setServicesDropdownHovered(false)}
                    >
                      {servicesCategory.services.map((service, index) => (
                        <a
                          key={index}
                          onClick={() =>
                            handleServiceClick(service.slug, "services")
                          }
                          className="block px-4 cursor-pointer py-2 text-gray-800 hover:bg-gray-100"
                        >
                          {service.title || service.name}
                        </a>
                      ))}
                    </div>
                  )}
                </li>
                <li
                  className="relative"
                  onMouseEnter={openSuvarma}
                  onMouseLeave={closeSuvarma}
                >
                  <div className="flex items-center gap-1">
                    <span
                      className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      {t("nav.suvarma")}
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        showSuvarmaDropdown ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1L6 6L11 1"
                        stroke={isScrolled ? "#5E7740" : "white"}
                        strokeWidth="2"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>

                  {showSuvarmaDropdown && suvarmaCategory && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-50"
                      onMouseEnter={() => setSuvarmaDropdownHovered(true)}
                      onMouseLeave={() => setSuvarmaDropdownHovered(false)}
                    >
                      {suvarmaCategory.services.map((service, index) => (
                        <a
                          key={index}
                          onClick={() =>
                            handleServiceClick(service.slug, "services")
                          }
                          className="block px-4 cursor-pointer py-2 text-gray-800 hover:bg-gray-100"
                        >
                          {service.title || service.name}
                        </a>
                      ))}
                    </div>
                  )}
                </li>

                <li
                  onClick={() => router.push("/career")}
                  className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  {t("nav.career")}
                </li>
              </ul>
            </nav>

            <button
              onClick={() => router.push("/contact")}
              className={`py-3 pl-7 pr-12 cursor-pointer font-medium text-base rounded-full relative transition-colors duration-300 ${
                isScrolled
                  ? "bg-brand text-white"
                  : "bg-white text-gray-800 border border-gray-300"
              } flex items-center`}
            >
              <span>{t("contact_us")}</span>

              <span
                className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full p-1.5"
                style={{
                  backgroundColor: isScrolled ? "white" : "#5E7740",
                  border: isScrolled ? "1px solid #f3f4f6" : "none",
                }}
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 8 15"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M-2.3365e-05 7.07107L7.07104 0L4.40193 7.16889L7.07104 14.1421L-2.3365e-05 7.07107Z"
                    fill={isScrolled ? "#5E7740" : "white"}
                  />
                </svg>
              </span>
            </button>

            <div
              className={`flex items-center gap-4 py-2 px-7 rounded-4xl ${
                isScrolled ? "bg-gray-100" : "bg-white"
              }`}
            >
              <div>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 19L13.8032 13.8032M13.8032 13.8032C15.2097 12.3967 15.9999 10.4891 15.9999 8.49996C15.9999 6.51084 15.2097 4.6032 13.8032 3.19669C12.3967 1.79017 10.4891 1 8.49996 1C6.51084 1 4.6032 1.79017 3.19669 3.19669C1.79017 4.6032 1 6.51084 1 8.49996C1 10.4891 1.79017 12.3967 3.19669 13.8032C4.6032 15.2097 6.51084 15.9999 8.49996 15.9999C10.4891 15.9999 12.3967 15.2097 13.8032 13.8032Z"
                    stroke="#BCBCBC"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div>
                <svg
                  width="17"
                  height="21"
                  viewBox="0 0 17 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2505 4.65384C12.2505 5.6229 11.8554 6.55227 11.152 7.2375C10.4486 7.92273 9.49469 8.30769 8.5 8.30769C7.50531 8.30769 6.55135 7.92273 5.848 7.2375C5.14464 6.55227 4.7495 5.6229 4.7495 4.65384C4.7495 3.68478 5.14464 2.75541 5.848 2.07019C6.55135 1.38496 7.50531 1 8.5 1C9.49469 1 10.4486 1.38496 11.152 2.07019C11.8554 2.75541 12.2505 3.68478 12.2505 4.65384ZM1 18.4098C1.03214 16.4926 1.83645 14.6646 3.23948 13.3198C4.6425 11.9751 6.53183 11.2215 8.5 11.2215C10.4682 11.2215 12.3575 11.9751 13.7605 13.3198C15.1636 14.6646 15.9679 16.4926 16 18.4098C13.6471 19.4609 11.0885 20.0034 8.5 20C5.82364 20 3.2833 19.431 1 18.4098Z"
                    stroke="#5E7740"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <LanguageSwitcher isScrolled={isScrolled} />
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="flex lg:hidden items-center gap-4">
            {/* Search and User Icons */}
            <div className="flex items-center gap-3">
              <button className="p-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 19L13.8032 13.8032M13.8032 13.8032C15.2097 12.3967 15.9999 10.4891 15.9999 8.49996C15.9999 6.51084 15.2097 4.6032 13.8032 3.19669C12.3967 1.79017 10.4891 1 8.49996 1C6.51084 1 4.6032 1.79017 3.19669 3.19669C1.79017 4.6032 1 6.51084 1 8.49996C1 10.4891 1.79017 12.3967 3.19669 13.8032C4.6032 15.2097 6.51084 15.9999 8.49996 15.9999C10.4891 15.9999 12.3967 15.2097 13.8032 13.8032Z"
                    stroke={isScrolled ? "#5E7740" : "white"}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>

              <button className="p-2">
                <svg
                  width="17"
                  height="21"
                  viewBox="0 0 17 21"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.2505 4.65384C12.2505 5.6229 11.8554 6.55227 11.152 7.2375C10.4486 7.92273 9.49469 8.30769 8.5 8.30769C7.50531 8.30769 6.55135 7.92273 5.848 7.2375C5.14464 6.55227 4.7495 5.6229 4.7495 4.65384C4.7495 3.68478 5.14464 2.75541 5.848 2.07019C6.55135 1.38496 7.50531 1 8.5 1C9.49469 1 10.4486 1.38496 11.152 2.07019C11.8554 2.75541 12.2505 3.68478 12.2505 4.65384ZM1 18.4098C1.03214 16.4926 1.83645 14.6646 3.23948 13.3198C4.6425 11.9751 6.53183 11.2215 8.5 11.2215C10.4682 11.2215 12.3575 11.9751 13.7605 13.3198C15.1636 14.6646 15.9679 16.4926 16 18.4098C13.6471 19.4609 11.0885 20.0034 8.5 20C5.82364 20 3.2833 19.431 1 18.4098Z"
                    stroke="#5E7740"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            {!mobileMenuOpen && (
              <button
                onClick={toggleMobileMenu}
                className="p-2 z-60 focus:outline-none"
                aria-label="Open menu"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 12H21M3 6H21M3 18H21"
                    stroke={isScrolled ? "#5E7740" : "white"}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        <div
          className={`fixed inset-0 bg-white z-50 transition-all duration-300 ease-in-out transform ${
            mobileMenuOpen ? "translate-y-0" : "-translate-y-full"
          }`}
        >
          <div className="container mx-auto px-4 py-20 h-full flex flex-col">
            {/* Close Button (Top Right) */}
            <button
              onClick={toggleMobileMenu}
              className="absolute top-6 right-6 p-2 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18 6L6 18M6 6L18 18"
                  stroke="#5E7740"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>

            <nav className="flex-1 mt-12">
              <ul className="space-y-6 text-xl font-medium">
                <li className="border-b border-gray-100 pb-4">
                  <a
                    className="block text-gray-800 hover:text-brand py-3 cursor-pointer"
                    onClick={() => {
                      router.push("/about");
                      toggleMobileMenu();
                    }}
                  >
                    {t("nav.about")}
                  </a>
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={toggleMobileServices}
                  >
                    <span className="text-gray-800"> {t("nav.services")}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        mobileServicesOpen ? "rotate-90" : ""
                      }`}
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="#5E7740"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {mobileServicesOpen && servicesCategory && (
                    <ul className="mt-4 space-y-4 pl-4">
                      {servicesCategory.services.map((service, index) => (
                        <li key={index}>
                          <a
                            className="block text-gray-600 hover:text-brand py-2 cursor-pointer"
                            onClick={() => {
                              handleServiceClick(service.slug, "services");
                              toggleMobileMenu();
                            }}
                          >
                            {service.title || service.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={toggleMobileSuvarma}
                  >
                    <span className="text-gray-800"> {t("nav.suvarma")}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        mobileSuvarmaOpen ? "rotate-90" : ""
                      }`}
                    >
                      <path
                        d="M9 18L15 12L9 6"
                        stroke="#5E7740"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                  {mobileSuvarmaOpen && suvarmaCategory && (
                    <ul className="mt-4 space-y-4 pl-4">
                      {suvarmaCategory.services.map((service, index) => (
                        <li key={index}>
                          <a
                            className="block text-gray-600 hover:text-brand py-2 cursor-pointer"
                            onClick={() => {
                              handleServiceClick(service.slug, "services");
                              toggleMobileMenu();
                            }}
                          >
                            {service.title || service.name}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <a
                    className="block text-gray-800 hover:text-brand py-3 cursor-pointer"
                    onClick={() => {
                      router.push("/career");
                      toggleMobileMenu();
                    }}
                  >
                    {t("nav.career")}
                  </a>
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <a
                    className="block text-brand hover:text-brand py-3 cursor-pointer"
                    onClick={() => {
                      router.push("/contact");
                      toggleMobileMenu();
                    }}
                  >
                    {t("nav.contact")}
                  </a>
                </li>
                <LanguageSwitcher />
              </ul>
            </nav>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
