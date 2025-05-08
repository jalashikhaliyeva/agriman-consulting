import React, { useState, useRef } from "react";
import TabButton from "../TabButton";
import { LuLink, LuUpload, LuFile } from "react-icons/lu";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";

function CareerSection({ data, contact }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    profession: "",
    message: "",
    cv: null,
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);

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

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({
        ...formData,
        cv: file,
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
    if (!formData.profession.trim())
      newErrors.profession = t("formErrors.professionRequired");
    if (!formData.message.trim())
      newErrors.message = t("formErrors.messageRequired");
    if (!formData.cv) newErrors.cv = t("formErrors.cvRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      // Create FormData for file upload
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("surname", formData.surname);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("profession", formData.profession);
      formDataToSend.append("message", formData.message);
      formDataToSend.append("cv", formData.cv);

      // Here you would call your API function
      // await postCareerForm(formDataToSend);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Reset form after successful submission
      setFormData({
        name: "",
        surname: "",
        email: "",
        profession: "",
        message: "",
        cv: null,
      });

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      toast.success(t("success_message"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      toast.error(t("error_submission"), {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      // console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div data-aos="fade-up" className="relative rounded-3xl p-6 md:p-10 my-8 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/services/img4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Enhanced Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(49, 73, 21, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%)",
        }}
      />

      {/* Additional Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10">
        <button className="inline-flex items-center px-8 py-1 font-archivo bg-transparent text-white border border-neutral-300 rounded-full">
          {t("contact_us")}
        </button>

        <div className="flex flex-col lg:flex-row justify-between py-10 lg:py-20 w-full gap-8 lg:gap-12">
          <div  className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white font-arimo pb-5">
              {data?.title}
            </h2>
            <p
              className="text-white/80 text-sm md:text-base"
              dangerouslySetInnerHTML={{ __html: data?.description || "" }}
            />

            <div className="flex flex-col md:flex-row gap-5 w-full my-7">
              <button className="relative cursor-pointer py-2 md:py-3 px-5 md:px-7 font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
                {t("view_more")}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-brand rounded-full p-1">
                  <svg
                    width="16"
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
              <p className="font-archivo text-white/80">{t("jobCategories")}</p>
            </div>
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
                      errors.name ? "border-red-500" : "border-white/30"
                    } bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-400">{errors.name}</p>
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
                      errors.surname ? "border-red-500" : "border-white/30"
                    } bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70`}
                  />
                  {errors.surname && (
                    <p className="mt-1 text-sm text-red-400">
                      {errors.surname}
                    </p>
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
                    errors.email ? "border-red-500" : "border-white/30"
                  } bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">{errors.email}</p>
                )}
              </div>
              <div>
                <input
                  type="text"
                  name="profession"
                  placeholder="Profession"
                  value={formData.profession}
                  onChange={handleChange}
                  className={`w-full px-4 py-2 md:py-3 rounded-2xl border ${
                    errors.profession ? "border-red-500" : "border-white/30"
                  } bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70`}
                />
                {errors.profession && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.profession}
                  </p>
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
                    errors.message ? "border-red-500" : "border-white/30"
                  } bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70`}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">{errors.message}</p>
                )}
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
                accept=".pdf,.doc,.docx"
              />
              <div className="flex flex-col md:flex-row gap-5 w-full justify-between items-center">
                <div
                  onClick={triggerFileInput}
                  className={`bg-white flex flex-row items-center gap-2 p-2 rounded-4xl cursor-pointer text-neutral-500 whitespace-nowrap overflow-hidden ${
                    errors.cv ? "border border-red-500" : ""
                  }`}
                >
                  {formData.cv ? (
                    <>
                      <LuFile className="text-brand" />
                      <p className="text-sm md:text-base truncate max-w-[180px]">
                        {formData.cv.name}
                      </p>
                    </>
                  ) : (
                    <>
                      <LuLink className="text-brand" />
                      <p className="text-sm md:text-base">
                        {" "}
                        {t("uploadCvPrompt")}
                      </p>
                      <p className="text-brand">{contact.email}</p>
                    </>
                  )}
                </div>
                {errors.cv && (
                  <p className="text-sm text-red-400 md:hidden">{errors.cv}</p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 md:py-3 px-6 cursor-pointer bg-brand text-white rounded-full hover:bg-brand/90 transition-colors max-w-[200px] ml-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting
                    ? t("formSubmit.sending")
                    : t("formSubmit.send")}
                </button>
              </div>
              {errors.cv && (
                <p className="text-sm text-red-400 hidden md:block">
                  {errors.cv}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerSection;
