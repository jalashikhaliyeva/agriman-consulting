import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Footer = ({ settings, contact, socialLinks }) => {
  const router = useRouter();

  const { t } = useTranslation();
  return (
    <footer
      data-aos="fade-up"
      className="bg-black mb-4 rounded-4xl text-white py-12 px-6 md:px-12 "
    >
      <div className="mx-auto">
        <div className="mb-10 flex flex-col md:flex-row w-full md:justify-between">
          <div className="flex items-center mb-6">
            <Image
              src={settings?.logo?.logo}
              alt="Logo"
              width={240}
              height={80}
              className={`cursor-pointer w-[140px] transition-filter duration-300`}
              priority
            />
          </div>
          <div className="flex items-center gap-4 mb-6">
            <p className="text-2xl text-brand font-archivo">*3399</p>
            <p className="border-b-2 border-brand h-2 w-[100px]"></p>
          </div>
        </div>

        {/* Footer links section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <h2 className="text-brand text-2xl md:text-3xl font-light mb-2">
              {t("slogan")}
            </h2>

            <p className="text-neutral-600 mt-4 max-w-md">{t("mission")}</p>

            <button
              onClick={() => router.push("/contact")} // Change '/contact' to your actual contact page route
              className="relative mt-4 cursor-pointer py-2 md:py-3 px-5 md:px-7 font-archivo text-sm md:text-base text-black rounded-4xl backdrop-blur-md bg-white mx-auto lg:mx-0"
            >
              {t("contact_us")}
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
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-xl font-semibold mb-4"> {t("company")}</h3>
            <ul className="space-y-3">
              {["Services", "Suvarma", "About", "Portfolio", "News / blog"].map(
                (item) => (
                  <li key={item}>
                    <Link
                      href={`/${item.toLowerCase().replace(" / ", "-")}`}
                      className="text-gray-400 hover:text-brand transition-colors duration-200"
                    >
                      {item}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Social links - Updated section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("socials")}</h3>
            <ul className="space-y-3">
              {socialLinks?.map((social) => (
                <li key={social.name}>
                  <a
                    href={`https://${social.link}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-brand transition-colors duration-200"
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info and CTA */}
          <div>
            <h3 className="text-xl font-semibold mb-4">{t("contact_us")}</h3>
            <p className="text-[#90A674] mb-1">{contact.email}</p>
            <p className="text-[#90A674] mb-6">{contact.phone}</p>

            <div className="mt-6">
              <h3 className="text-xl font-semibold mb-2">
                {t("solution_title")}
              </h3>
              <p className="text-xs text-gray-500 mb-4 max-w-xs">
                {t("service_inquiry")}
              </p>
              <button
                onClick={() => router.push("/contact")}
                className="relative cursor-pointer py-2 md:py-3 px-5 md:px-7 font-archivo text-sm md:text-base text-white rounded-4xl  bg-brand  mx-auto lg:mx-0"
              >
                {t("get_offer")}
                <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white rounded-full p-1">
                  <svg
                    width="16"
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
          </div>
        </div>

        {/* Copyright and Policy links */}
        <div className="mt-5 pt-6 border-t border-gray-800 flex flex-col md:flex-row justify-between text-gray-500 text-sm">
          <p>© 2025 AGRIMAN Consulting MMC. {t("copyright")}.</p>
          <div className="mt-4 md:mt-0 space-x-4">
            <Link
              href="/terms"
              className="hover:text-brand transition-colors duration-200"
            >
              {t("terms")}
            </Link>
            <span>|</span>
            {/* <Link
              href="/privacy"
              className="hover:text-brand transition-colors duration-200"
            >
              {t("privacy")}
            </Link>
            <span>|</span>
            <Link
              href="/agreement"
              className="hover:text-brand transition-colors duration-200"
            >
              {t("agreement")}
            </Link> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
