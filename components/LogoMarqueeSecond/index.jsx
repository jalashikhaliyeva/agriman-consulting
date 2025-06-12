import Image from "next/image";
import { useTranslation } from "react-i18next";
import React from "react";

export default function LogoMarqueeSecond({ projects }) {
  const { t } = useTranslation();

  const projectsArray = projects?.data || projects || [];

  const repeatedLogos = [
    ...projectsArray,
    ...projectsArray,
    ...projectsArray,
    ...projectsArray,
  ];

  return (
    <div className="w-full py-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row items-center font-arimo gap-10">
          <h2 className="text-4xl font-medium text-neutral-900">
            {t("successful_projects")}
          </h2>
          <p className="text-neutral-400 mt-2">{t("projects_description")}</p>
        </div>

        <div className="relative flex flex-col">
          <div className="flex items-center mt-8 mb-2">
            <div className="rounded-lg p-4 overflow-hidden flex-grow ml-4">
              <div className="flex space-x-12 animate-marquee">
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
                    className="flex items-center justify-center min-w-[80px]  hover:opacity-80 transition-opacity"
                  >
                    <Image
                      width={200}
                      height={200}
                      src={logo.image}
                      alt={logo.name}
                      className="w-[90px] max-w-full object-contain grayscale hover:grayscale-0"
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
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .grayscale {
          filter: grayscale(100%); 
        }

        .animate-marquee {
          animation: marquee 38s linear infinite;
          will-change: transform;
          display: flex;
          width: max-content; 
        }
      `}</style>
    </div>
  );
}
