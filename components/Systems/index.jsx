import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner";

function Systems({ data }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const services = data?.services?.slice(0, 4) || [];
  // Fallback images in case service images are missing
  const fallbackImages = [
    "/images/services/img1.jpg",
    "/images/services/img2.jpg",
    "/images/services/img3.jpg",
    "/images/services/img4.jpg",
  ];

  // Extract text content and split into words
  const textContent = data?.title ? data.title.replace(/<[^>]*>/g, "") : "";
  const words = textContent.trim().split(/\s+/);

  // Get first word and remaining text
  const firstWord = words[0] || "";
  const remainingText = words.slice(1).join(" ");

  const handleCardClick = async (slug, e) => {
    if (!slug) return;

    // Check if it's a modified click (Ctrl/Cmd + click or middle mouse button)
    // If so, let the browser handle it naturally (will open in new tab)
    if (e && (e.ctrlKey || e.metaKey || e.button === 1)) {
      return; // Let the browser handle it with the normal anchor behavior
    }

    // For normal clicks, prevent default to handle with our router
    if (e) {
      e.preventDefault();
    }

    // Navigate in the current window
    router.push({
      pathname: "/services",
      query: { service: slug },
    });

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://admin.agrimanconsulting.com/api/service/${slug}`
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
    <>
      {loading && <Spinner />}

      <div
      data-aos="fade-up"
     
        className="p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl lg:rounded-4xl relative overflow-hidden"
        style={{
          backgroundImage: "url('/images/services/img1.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-400/20 via-neutral-600/30 to-teal-800/40 z-0"></div>

        <div className="relative">
          <button className="inline-flex text-white items-center px-8 py-1 font-archivo bg-transparent border border-neutral-300 rounded-full">
            {data?.name || "Our Services"}
          </button>
          <div className="flex items-end justify-end">
            <svg
              width="111"
              height="4"
              viewBox="0 0 111 4"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2H109"
                stroke="#5E7740"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 mt-4 md:mt-6 lg:mt-8">
            <div className="flex flex-col sm:flex-row gap-3 lg:w-2/3">
              <div className="w-full sm:w-1/3">
                <div
                  className="relative h-64 sm:h-96 md:h-[460px] w-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={(e) => handleCardClick(services[0]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[0]?.slug}`}
                    onClick={(e) => handleCardClick(services[0]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none"></div>

                    <Image
                      src={services[0]?.image || fallbackImages[0]}
                      alt={services[0]?.name || "Irrigation system"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                      priority
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none">
                      <p
                        className="text-white font-medium font-archivo text-lg md:text-2xl"
                        dangerouslySetInnerHTML={{
                          __html:
                            services[0]?.name || "Pivot Irrigation Systems",
                        }}
                      />
                      <p
                        className="text-neutral-300 font-medium font-archivo text-sm md:text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html:
                            services[0]?.description ||
                            "Pivot Irrigation Systems",
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>

              <div className="w-full sm:w-1/3 flex flex-col gap-3">
                <div
                  className="relative h-48 md:h-52 lg:h-56 w-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={(e) => handleCardClick(services[1]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[1]?.slug}`}
                    onClick={(e) => handleCardClick(services[1]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none"></div>

                    <Image
                      src={services[1]?.image || fallbackImages[1]}
                      alt={services[1]?.name || "Sprinkler system"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none">
                      <p className="text-white font-medium text-lg md:text-2xl pointer-events-none">
                        {services[1]?.name || "Sprinkler Systems"}
                      </p>
                      <p
                        className="text-neutral-300 font-medium font-archivo text-sm md:text-sm line-clamp-2 pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html:
                            services[1]?.description ||
                            "Pivot Irrigation Systems",
                        }}
                      />
                    </div>
                  </a>
                </div>

                <div
                  className="relative h-48 md:h-52 lg:h-56 w-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={(e) => handleCardClick(services[2]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[2]?.slug}`}
                    onClick={(e) => handleCardClick(services[2]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none"></div>

                    <Image
                      src={services[2]?.image || fallbackImages[2]}
                      alt={services[2]?.name || "Drip irrigation"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none">
                      <p className="text-white font-medium text-lg md:text-2xl pointer-events-none">
                        {services[2]?.name || "Drip Irrigation"}
                      </p>
                      <p
                        className="text-neutral-300 font-medium font-archivo text-sm md:text-sm line-clamp-2 pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html:
                            services[2]?.description ||
                            "Pivot Irrigation Systems",
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>

              <div className="w-full sm:w-1/3">
                <div
                  className="relative h-64 sm:h-96 md:h-[460px] w-full rounded-2xl md:rounded-3xl overflow-hidden group cursor-pointer"
                  onClick={(e) => handleCardClick(services[3]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[3]?.slug}`}
                    onClick={(e) => handleCardClick(services[3]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10 pointer-events-none"></div>

                    <Image
                      src={services[3]?.image || fallbackImages[3]}
                      alt={services[3]?.name || "Underground irrigation"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    />

                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10 pointer-events-none">
                      <p className="text-white font-medium text-lg md:text-2xl pointer-events-none">
                        {services[3]?.name || "Underground Irrigation"}
                      </p>
                      <p
                        className="text-neutral-300 font-medium font-archivo text-sm md:text-sm line-clamp-2 pointer-events-none"
                        dangerouslySetInnerHTML={{
                          __html:
                            services[3]?.description ||
                            "Pivot Irrigation Systems",
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div  className="lg:w-1/3">
              <div className="backdrop-blur-md w-full h-full flex flex-col justify-center bg-white/10 p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl border border-white/20 transition-all hover:bg-white/15 hover:border-white/30">
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                  <span className="text-brand">{firstWord}</span>
                  {remainingText && ` ${remainingText}`}
                </h2>
                <p className="text-white/90 mb-4 lg:mb-6 text-sm md:text-sm">
                  {data?.description ||
                    "High-quality irrigation solutions for your agricultural needs"}
                </p>
                <div className="w-full h-px bg-white/20 my-4 lg:my-6"></div>
                <button
                  onClick={() => router.push("/services")}
                  className="relative cursor-pointer py-2 md:py-3 pl-5 md:pl-7 pr-10 md:pr-12 w-full max-w-[180px] font-archivo text-sm md:text-lg text-black rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center whitespace-nowrap"
                  aria-label="Contact us about irrigation systems"
                >
                  {t("contact_us")}
                  <span className="absolute -right-2 top-1/2 -translate-y-1/2 bg-brand rounded-full p-1 md:p-1.5">
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 8 15"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-3 h-3 md:w-4 md:h-4"
                    >
                      <path
                        d="M7.50002 7.42893L0.428955 14.5L3.09807 7.33111L0.428955 0.357865L7.50002 7.42893Z"
                        fill="white"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Systems;
