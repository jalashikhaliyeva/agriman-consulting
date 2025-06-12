import { useRouter } from "next/router";
import React from "react";
import { useTranslation } from "react-i18next";

function ContactBannerService({ banner }) {
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center rounded-2xl md:rounded-full bg-brand py-4 px-6 md:py-5 md:px-10 mt-10 gap-4 md:gap-0">
      <p className="text-white text-xl md:text-2xl text-center md:text-left">
        {t("contactBannerService.title")}
      </p>
      <button
        onClick={() => router.push("/portfolio")}
        className="py-2  md:py-3 px-5 cursor-pointer font-archivo text-sm md:text-base text-white rounded-full bg-black relative transition-colors duration-300 flex items-center"
      >
        <span>{t("contactBannerService.get_offer")}</span>
        <span className="absolute -right-2 top-1/2 -translate-y-1/2 rounded-full p-1 bg-white">
          <svg
            width="12"
            height="12"
            viewBox="0 0 8 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.50002 7.42893L0.428955 14.5L3.09807 7.33111L0.428955 0.357865L7.50002 7.42893Z"
              fill="black"
            />
          </svg>
        </span>
      </button>
    </div>
  );
}

export default ContactBannerService;