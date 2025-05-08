import React, { useState } from "react";
import TabButton from "../TabButton";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { postContactForm } from "@/lib/api";
import { useTranslation } from "react-i18next";

function ContactUsSection({ data, contact }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    about: "",
    message: "",
    phone: "", // Added phone field
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null,
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = t("formErrors.nameRequired");
    if (!formData.surname.trim())
      newErrors.surname = t("formErrors.surnameRequired");
    if (!formData.email.trim()) {
      newErrors.email = t("formErrors.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t("formErrors.validEmail");
    }
    if (!formData.about.trim())
      newErrors.about = t("formErrors.subjectRequired");
    if (!formData.phone.trim())
      newErrors.phone = t("formErrors.numberRequired");
    if (!formData.message.trim())
      newErrors.message = t("formErrors.messageRequired");
    // Phone validation is optional, but you can add it if needed
    // if (!formData.phone.trim()) newErrors.phone = "Phone is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await postContactForm({
        name: `${formData.name} ${formData.surname}`, // Combine name and surname
        email: formData.email,
        phone: formData.phone, // Include phone number
        subject: formData.about,
        message: formData.message,
      });

      // Reset form after successful submission
      setFormData({
        name: "",
        surname: "",
        email: "",
        about: "",
        message: "",
        phone: "",
      });

      toast.success("Your message has been sent successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error("An error occurred. Please try again.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div data-aos="fade-up" className="bg-white rounded-3xl p-6 md:p-10 my-8">
      <ToastContainer />
      <TabButton>Contact Us</TabButton>
      <div className="flex items-center justify-center">
        <svg
          width="46"
          height="19"
          viewBox="0 0 46 19"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.55273 2.2132L22.727 16.6037L43.9012 2.2132"
            stroke="#90A674"
            stroke-width="3"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>

      <div className="flex flex-col lg:flex-row justify-between py-10 lg:py-20 w-full gap-8 lg:gap-12">
        <div  className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black font-arimo pb-5">
            {contact?.title}
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            {contact?.description}
          </p>

          <div className="flex flex-col mt-6 gap-2 md:gap-3 border-l-4 pl-5 text-sm md:text-lg border-brand py-2">
            <p>Email: {data.email}</p>
            <p>Telefon: {data.phone}</p>
            <p>İş saatları: {data.working_hour}</p>
          </div>
          <button className="relative py-2 md:py-3 px-5 md:px-7 mt-5 w-[120px] md:w-[140px] font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
            {t("view_more")}
            <span className="absolute left-[100px] md:left-[120px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.50002 7.42893L0.428955 14.5L3.09807 7.33111L0.428955 0.357865L7.50002 7.42893Z"
                  fill="white"
                />
              </svg>
            </span>
          </button>
        </div>
        <div  className="w-full lg:w-1/2">
          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <div className="w-full">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                    errors.name ? "border-red-500" : "border-gray-300"
                  } bg-white focus:outline-none focus:ring-2 focus:ring-brand/50`}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                )}
              </div>
              <div className="w-full">
                <input
                  type="text"
                  name="surname"
                  placeholder="Surname"
                  value={formData.surname}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                    errors.surname ? "border-red-500" : "border-gray-300"
                  } bg-white focus:outline-none focus:ring-2 focus:ring-brand/50`}
                />
                {errors.surname && (
                  <p className="mt-1 text-sm text-red-500">{errors.surname}</p>
                )}
              </div>
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-brand/50`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">{errors.email}</p>
              )}
            </div>
            <div>
              <input
                type="tel" // Changed to tel for phone numbers
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-brand/50`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
              )}
            </div>
            <div>
              <input
                type="text"
                name="about"
                placeholder="About"
                value={formData.about}
                onChange={handleChange}
                className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                  errors.about ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-brand/50`}
              />
              {errors.about && (
                <p className="mt-1 text-sm text-red-500">{errors.about}</p>
              )}
            </div>
            <div>
              <textarea
                name="message"
                placeholder="Message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                  errors.message ? "border-red-500" : "border-gray-300"
                } bg-white focus:outline-none focus:ring-2 focus:ring-brand/50`}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-500">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-fit py-2 md:py-3 px-8 cursor-pointer bg-brand text-white rounded-full hover:bg-brand/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? t("formSubmit.sending") : t("formSubmit.send")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsSection;
