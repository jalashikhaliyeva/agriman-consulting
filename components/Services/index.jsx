import React, { useState } from "react";
import TabButton from "../TabButton";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Spinner from "../Spinner";

function Services({ data }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (!data) {
    return null;
  }

  const formatTitleWithBrandWords = (htmlString) => {
    if (!htmlString) return "";

    const textWithoutTags = htmlString.replace(/<[^>]*>/g, "");

    const words = textWithoutTags
      .replace(/&nbsp;/g, " ")
      .split(/\s+/)
      .filter(Boolean);

    if (words.length < 3) return htmlString;

    const firstWord = words[0];
    const secondWord = words[1];
    const thirdWord = words[2];
    const remainingWords = words.slice(3).join(" ");

    return `${firstWord} <span class="text-brand">${secondWord} ${thirdWord}</span> ${remainingWords}`;
  };

  const services = data?.services?.slice(0, 4) || [];

  const handleCardClick = async (slug, e) => {
    if (!slug) return;

    // Check if it's a modified click (Ctrl/Cmd + click or middle mouse button)
    // If so, let the browser handle it naturally (will open in new tab)
    if (e.ctrlKey || e.metaKey || e.button === 1) {
      return; // Let the browser handle it with the normal anchor behavior
    }

    // For normal clicks, prevent default to handle with our router
    e.preventDefault();

    // Navigate in the current window
    router.push({
      pathname: "/services",
      query: { service: slug },
    });

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://admin.agrimanconsulting.com/api/service/${slug}`,
        {
          headers: {
            "Accept-Language": i18n.language,
          },
        }
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

      <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl">
        <div>
          <div className="hidden md:flex">
            <TabButton>{data?.name}</TabButton>
          </div>

          <div className="py-4 flex  flex-row  md:hidden justify-between items-center">
            <TabButton>{data?.name}</TabButton>
            <div className="flex px-5 float-animation">
              <svg
                width="46"
                height="19"
                viewBox="0 0 46 19"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 2.17426L23.1742 16.5647L44.3485 2.17426"
                  stroke="#90A674"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          <div className="hidden md:flex items-center justify-center pb-4 float-animation">
            <svg
              width="46"
              height="19"
              viewBox="0 0 46 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2.17426L23.1742 16.5647L44.3485 2.17426"
                stroke="#90A674"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          {/* Main content container - ensure flex wrap properly with fixed heights */}
          <div className="flex flex-col lg:flex-row gap-6 mt-4">
            {/* Large image container - fixed width on larger screens */}
            <div
              className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[580px] w-full lg:w-2/5 flex-shrink-0 cursor-pointer"
              onClick={(e) => handleCardClick(services[0]?.slug, e)}
            >
              <a
                href={`/services?service=${services[0]?.slug}`}
                onClick={(e) => handleCardClick(services[0]?.slug, e)}
                className="block h-full w-full"
              >
                <Image
                  src={services[0]?.image || "/images/hero/hero2.jpg"}
                  alt={services[0]?.name || "Service"}
                  fill
                  className="object-cover pointer-events-none"
                  priority
                />
                <div
                  className="absolute inset-0
                  bg-gradient-to-t
                  from-black/60
                  to-transparent pointer-events-none"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] pointer-events-none">
                  <div className="text-xl md:text-2xl font-semibold">
                    {services[0]?.name || "Açıq Sahələr"}
                  </div>
                  <div
                    className="text-neutral-300 pt-1 text-xs md:text-sm line-clamp-2"
                    dangerouslySetInnerHTML={{
                      __html: services[0]?.description || "",
                    }}
                  />
                </div>
              </a>
            </div>

            {/* Right side content - ensure it takes remaining space */}
            <div className="flex flex-col gap-4 md:gap-7 w-full lg:w-3/5 flex-grow">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div className="w-full sm:max-w-[70%]">
                  <h2
                    className="text-2xl sm:text-3xl md:text-4xl font-arimo"
                    dangerouslySetInnerHTML={{
                      __html: formatTitleWithBrandWords(data?.title),
                    }}
                  />
                </div>
                <div className="w-full sm:w-auto self-end sm:self-auto">
                  <button
                    onClick={() => router.push("/services")}
                    className="relative cursor-pointer py-3 pl-7 pr-12 font-archivo font-medium text-base text-white rounded-full backdrop-blur-md bg-black mx-auto lg:mx-0 flex items-center whitespace-nowrap"
                  >
                    {t("view_more")}
                    <span className="absolute -right-2 top-1/2 -translate-y-1/2 bg-brand rounded-full p-1.5">
                      <svg
                        width="18"
                        height="18"
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
              </div>

              <div className="pb-4 md:pb-7">
                <p className="text-neutral-500 font-arimo text-sm md:text-base">
                  {data?.description}
                </p>
              </div>

              {/* Grid container for the three smaller images */}
              <div className="flex-grow grid grid-cols-2 sm:grid-cols-3 gap-4 h-full relative">
                {/* First service */}
                <div
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden h-full w-full transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={(e) => handleCardClick(services[1]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[1]?.slug}`}
                    onClick={(e) => handleCardClick(services[1]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <Image
                      src={services[1]?.image || "/images/hero/hero.jpg"}
                      alt={services[1]?.name || "Service"}
                      fill
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] pointer-events-none">
                      <div className="text-lg md:text-xl font-semibold">
                        {services[1]?.name || "Açıq Sahələr"}
                      </div>
                      <div
                        className="text-neutral-300 text-xs md:text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: services[1]?.description || "",
                        }}
                      />
                    </div>
                  </a>
                </div>

                {/* Second service - elevated */}
                <div
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden h-full w-full transform transition-transform duration-300 hover:-translate-y-8 cursor-pointer -translate-y-6"
                  onClick={(e) => handleCardClick(services[2]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[2]?.slug}`}
                    onClick={(e) => handleCardClick(services[2]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <Image
                      src={services[2]?.image || "/images/hero/hero2.jpg"}
                      alt={services[2]?.name || "Service"}
                      fill
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] pointer-events-none">
                      <div className="text-lg md:text-xl font-semibold">
                        {services[2]?.name || "Açıq Sahələr"}
                      </div>
                      <div
                        className="text-neutral-300 text-xs md:text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: services[2]?.description || "",
                        }}
                      />
                    </div>
                  </a>
                </div>

                {/* Third service */}
                <div
                  className="relative rounded-2xl md:rounded-3xl overflow-hidden h-full w-full col-span-2 sm:col-span-1 transform transition-transform duration-300 hover:-translate-y-2 cursor-pointer"
                  onClick={(e) => handleCardClick(services[3]?.slug, e)}
                >
                  <a
                    href={`/services?service=${services[3]?.slug}`}
                    onClick={(e) => handleCardClick(services[3]?.slug, e)}
                    className="block h-full w-full"
                  >
                    <Image
                      src={services[3]?.image || "/images/hero/hero3.jpg"}
                      alt={services[3]?.name || "Service"}
                      fill
                      className="object-cover pointer-events-none"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white w-[calc(100%-2rem)] md:w-[calc(100%-3rem)] pointer-events-none">
                      <div className="text-lg md:text-xl font-semibold">
                        {services[3]?.name || "Açıq Sahələr"}
                      </div>
                      <div
                        className="text-neutral-300 text-xs md:text-sm line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: services[3]?.description || "",
                        }}
                      />
                    </div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Services;
