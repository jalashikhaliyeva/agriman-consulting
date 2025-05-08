import React from "react";
import { useTranslation } from "react-i18next";

function ContactBanner({ banner }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col md:flex-row w-full justify-between items-center rounded-2xl md:rounded-full bg-brand py-4 px-6 md:py-5 md:px-10 mt-10 gap-4 md:gap-0">
      <p className="text-white text-xl md:text-2xl lg:text-3xl text-center md:text-left">
        {banner?.data[1].title }
      </p>
      <button 
      onClick={() => {
        const raw = banner.data[1].link;
        const url = raw.match(/^https?:\/\//)
          ? raw
          : `https://${raw}`;
        window.open(url, "_blank", "noopener,noreferrer");
      }}
      
      className="relative cursor-pointer py-2 px-5 md:py-3 md:px-7 w-[120px] md:w-[140px] text-center font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
        {t("view_more")}
        <span className="absolute left-[100px] md:left-[120px] top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-1">
          <svg
            width="8"
            height="15"
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

export default ContactBanner;
