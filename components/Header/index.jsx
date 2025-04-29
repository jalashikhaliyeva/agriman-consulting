import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";
import Container from "../Container";
import { useRouter } from "next/router";

function Header({ backgroundImage }) {
  const router = useRouter();
  const [isServicesHovered, setIsServicesHovered] = useState(false);
  const [dropdownHovered, setDropdownHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const showDropdown = isServicesHovered || dropdownHovered;
  const closeTimeout = useRef(null);

  // Handle scroll effect for header
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

  const open = () => {
    window.clearTimeout(closeTimeout.current);
    setIsServicesHovered(true);
  };

  const close = () => {
    closeTimeout.current = window.setTimeout(
      () => setIsServicesHovered(false),
      200
    );
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Reset mobile services dropdown when closing menu
    if (mobileMenuOpen) {
      setMobileServicesOpen(false);
    }
    // Disable body scroll when mobile menu is open
    document.body.style.overflow = mobileMenuOpen ? "auto" : "hidden";
  };

  const toggleMobileServices = () => {
    setMobileServicesOpen(!mobileServicesOpen);
  };

  return (
    <header
      className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
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
          {/* Logo */}
          <div onClick={() => router.push("/")} className="z-60">
            <Image
              src="/images/logo/agriman-logo.png"
              alt="Logo"
              width={140}
              height={80}
              className={`cursor-pointer transition-filter duration-300 ${
                isScrolled ? "filter brightness-0" : ""
              }`}
              priority
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-6">
            <nav className="font-archivo">
              <ul className="flex gap-4 items-center">
                <li
                  className="relative"
                  onMouseEnter={open}
                  onMouseLeave={close}
                >
                  <div className="flex items-center gap-1">
                    <span
                      onClick={() => router.push("/services")}
                      className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                        isScrolled ? "text-gray-800" : "text-white"
                      }`}
                    >
                      Services
                    </span>
                    <svg
                      width="12"
                      height="8"
                      viewBox="0 0 12 8"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className={`transition-transform duration-200 ${
                        showDropdown ? "rotate-180" : ""
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

                  {/* Dropdown */}
                  {showDropdown && (
                    <div
                      className="absolute top-full left-0 mt-2 bg-white rounded-lg shadow-lg py-2 min-w-[200px] z-50"
                      onMouseEnter={() => setDropdownHovered(true)}
                      onMouseLeave={() => setDropdownHovered(false)}
                    >
                      <a
                        onClick={() => router.push("/services")}
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Service 1
                      </a>
                      <a
                        onClick={() => router.push("/services")}
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Service 2
                      </a>
                      <a
                        onClick={() => router.push("/services")}
                        href="#"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      >
                        Service 3
                      </a>
                    </div>
                  )}
                </li>
                {/* <li
                  className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Suvarma
                </li> */}
                <li
                  onClick={() => router.push("/career")}
                  className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  Career
                </li>
                <li
                  onClick={() => router.push("/about")}
                  className={`text-base font-normal hover:text-gray-300 transition-colors duration-200 cursor-pointer ${
                    isScrolled ? "text-gray-800" : "text-white"
                  }`}
                >
                  About us
                </li>
              </ul>
            </nav>

            <button
              onClick={() => router.push("/contact")}
              className={`py-3 px-7 cursor-pointer font-archivo text-base rounded-4xl relative transition-colors duration-300 ${
                isScrolled ? "bg-brand text-white" : "bg-white text-gray-800"
              }`}
            >
              Contact Us
              <span
                className="absolute left-[120px] top-1/2 -translate-y-1/2 rounded-full px-2 py-1 "
                style={{
                  backgroundColor: isScrolled ? "white" : "#5E7740",
                  border: isScrolled ? "1px solid #f3f4f6" : "none",
                }}
              >
                <svg
                  width="10"
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
              className={`flex items-center gap-4 py-3 px-7 rounded-4xl ${
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>

              <div
                className={`${isScrolled ? "text-gray-800" : "text-gray-600"}`}
              >
                EN
              </div>
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
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
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
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={toggleMobileServices}
                  >
                    <span className="text-gray-800">Services</span>
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
                  {mobileServicesOpen && (
                    <ul className="mt-4 space-y-4 pl-4">
                      <li>
                        <a
                          href="#"
                          className="block text-gray-600 hover:text-brand py-2"
                        >
                          Service 1
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block text-gray-600 hover:text-brand py-2"
                        >
                          Service 2
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block text-gray-600 hover:text-brand py-2"
                        >
                          Service 3
                        </a>
                      </li>
                    </ul>
                  )}
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <a
                    href="#"
                    className="block text-gray-800 hover:text-brand py-3"
                  >
                    Suvarma
                  </a>
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <a
                    href="#"
                    className="block text-gray-800 hover:text-brand py-3"
                  >
                    Career
                  </a>
                </li>
                <li className="border-b border-gray-100 pb-4">
                  <a
                    href="#"
                    className="block text-gray-800 hover:text-brand py-3"
                  >
                    About us
                  </a>
                </li>
              </ul>
            </nav>

            <div className="mt-auto pb-8">
              <button className="w-full py-4 px-6 font-archivo text-lg bg-brand text-white rounded-lg mb-4 flex items-center justify-center">
                Contact Us
                <span className="ml-2">
                  <svg
                    width="12"
                    height="18"
                    viewBox="0 0 8 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M-2.3365e-05 7.07107L7.07104 0L4.40193 7.16889L7.07104 14.1421L-2.3365e-05 7.07107Z"
                      fill="white"
                    />
                  </svg>
                </span>
              </button>

              <div className="flex items-center justify-center gap-2">
                <div className="text-gray-600">EN</div>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M19 9L12 16L5 9"
                    stroke="#5E7740"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </header>
  );
}

export default Header;
