import Image from "next/image";
import { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";

export default function LogoMarquee({ projects }) {
  const { t } = useTranslation();

  // Sample logo data - replace with your actual logos
  const projectsArray = projects?.data || projects || [];

  // Create multiple copies for seamless looping
  const repeatedLogos = [
    ...projectsArray,
    ...projectsArray,
    ...projectsArray,
    ...projectsArray,
  ];

  const [isVisible, setIsVisible] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Optional: Add intersection observer for performance optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (marqueeRef.current) {
      observer.observe(marqueeRef.current);
    }

    return () => {
      if (marqueeRef.current) {
        observer.unobserve(marqueeRef.current);
      }
    };
  }, []);

  return (
    <div data-aos="fade-up" className="w-full py-16" ref={marqueeRef}>
      <div className="container mx-auto">
        <div className="flex  flex-col md:flex-row items-center font-arimo">
          <h2 className="text-4xl font-medium text-neutral-900">
            {t("successful_projects")}
          </h2>
          <p className="text-neutral-400 mt-2 flex items-center justify-center mx-auto">
            {t("projects_description")}
          </p>
        </div>

        <div className="relative flex flex-col">
          <div className="flex items-center mt-8 mb-2 gap-[100px]">
            <button
              onClick={() => router.push("/contact")} 
              className="relative mt-4 whitespace-nowrap cursor-pointer py-2 md:py-3 px-5 md:px-7 font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0"
            >
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

            <div className="rounded-lg p-4 overflow-hidden flex-grow ml-4">
              <div
                className={`flex space-x-12 ${
                  isVisible ? "animate-marquee" : ""
                }`}
                style={{ width: "max-content" }}
              >
                {repeatedLogos.map((logo, index) => (
                  <a
                    key={`${logo.id || logo.name}-${index}`}
                    href={
                      logo.link.startsWith("http")
                        ? logo.link
                        : `https://${logo.link}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center min-w-[90px] hover:opacity-80 transition-opacity"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={logo.image}
                      alt={logo.name}
                      className="w-[90px] max-w-full object-contain grayscale hover:grayscale-0" // Boz rəng üçün grayscale əlavə edildi
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 43s linear infinite;
          will-change: transform;
        }

        .grayscale {
          filter: grayscale(100%); /* Logoları boz rəngə çevirir */
        }
      `}</style>
    </div>
  );
}
