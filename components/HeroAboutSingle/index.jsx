import React from "react";
import Container from "../Container";
import { useTranslation } from "react-i18next";
import Link from "next/link";

function HeroAboutSingle({ data }) {
  const { t } = useTranslation();
  return (
    <Container>
      <div
        data-aos="fade-up"
        className="w-full mt-20 flex flex-col lg:flex-row justify-between items-center h-[480px] md:h-[600px] py-10 lg:py-0"
      >
        <div className="flex   max-w-[700px] flex-col md:flex-col pt-10 md:pt-2 text-white mb-10 lg:mb-0 w-full lg:w-auto text-center lg:text-left">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arimo font-medium leading-snug pb-4 sm:pb-6 lg:pb-6">
            {data?.title || "Kənd Təsərrüfatı Xidmətləri"}
          </h1>

          <div className="flex items-start gap-4">
            {/* Visible Vertical Line */}
            <div className="w-[3px] md:w-[3px] bg-[#5E7740]  rounded-full self-stretch" />

            {/* Paragraph */}
            <p
              className="text-base sm:text-lg font-archivo font-normal tracking-wide pb-6 sm:pb-8 lg:pb-9"
              dangerouslySetInnerHTML={{
                __html:
                  data?.description ||
                  "Ağıllı kənd təsərrüfatı həlləri ilə müasir kənd təsərrüfatına doğru.",
              }}
            />
          </div>
          <Link
            href="/contact"
            className="relative py-3 px-7 mb-6 w-[190px] font-archivo text-base text-white rounded-4xl bg-[#5E7740] mx-auto lg:mx-0"
          >
            {t("contact_us")}
            <span className="absolute left-[170px] top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-1">
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.14214 7.07107L0.0710678 14.1421L2.74019 6.97325L0.0710678 0L7.14214 7.07107Z"
                  fill="black"
                />
              </svg>
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
}

export default HeroAboutSingle;
