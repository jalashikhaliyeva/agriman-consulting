import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import AboutService from "./AboutService";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ServicesPageSection({ categories, banner }) {

  const { t } = useTranslation();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    const { service: serviceSlug } = router.query;
    const storedService = localStorage.getItem("selectedService");

    // Priority: URL query > localStorage
    if (serviceSlug) {
      fetchService(serviceSlug);
    } else if (storedService) {
      try {
        const parsedService = JSON.parse(storedService);
        setSelectedService(parsedService);
        // Update URL to match
        router.push(
          {
            pathname: "/services",
            query: { service: parsedService.slug },
          },
          undefined,
          { shallow: true }
        );
        localStorage.removeItem("selectedService");
      } catch (err) {
        console.error("Error parsing stored service:", err);
      }
    }
  }, []);
  const fetchService = async (slug) => {
    if (!slug) return;

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://agriman.markup.az/api/service/${slug}`
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch service details: ${response.status}`);
      }

      const data = await response.json();

      if (data && data.status && data.data) {
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

  const handleServiceClick = async (slug) => {
    // Update URL first
    router.push(
      {
        pathname: "/services",
        query: { service: slug },
      },
      undefined,
      { shallow: true }
    );

    // Then fetch the service
    await fetchService(slug);
  };

  return (
    <div
      data-aos="fade-up"
      className="flex flex-col lg:flex-row w-full justify-between mt-6 lg:mt-10 gap-6"
    >
      <div className="md:flex hidden w-full lg:w-[25%] flex-col gap-5 relative lg:px-0">
        {/* sidebar and image */}
        <Sidebar categories={categories} onServiceClick={handleServiceClick} />
        <div className="relative rounded-3xl shadow-lg w-full  h-[360px] lg:h-[460px] overflow-hidden mx-auto">
          <Image
            src={banner.data[0].image}
            alt="hero"
            width={500}
            height={500}
            className="w-full h-full object-cover"
            priority
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent via-black/30" />

          {/* Text content */}
          <div className="absolute bottom-0 left-0 right-0 p-4 lg:p-6 text-white space-y-2">
            <h3 className="text-xl lg:text-2xl font-bold">
              {banner.data.title}
            </h3>
            <p className="text-gray-300 text-sm lg:text-base">
              {banner.data.description}
            </p>
            <button
              onClick={() => {
                const raw = banner.data.link;
                const url = raw.match(/^https?:\/\//) ? raw : `https://${raw}`;
                window.open(url, "_blank", "noopener,noreferrer");
              }}
              className="relative cursor-pointer py-2 lg:py-3 px-4 lg:px-7 text-sm lg:text-lg w-full font-archivo text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0 hover:bg-black/90 transition-colors"
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
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[73%]  lg:px-0">
        {loading ? (
          <div className="bg-white rounded-4xl p-6 flex items-center justify-center h-96">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-brand"></div>
          </div>
        ) : error ? (
          <div className="bg-white rounded-4xl p-6 flex items-center justify-center h-96">
            <div className="text-red-500 text-center">
              <p className="text-xl mb-3">Error loading service details</p>
              <p>{error}</p>
            </div>
          </div>
        ) : (
          <AboutService serviceData={selectedService} />
        )}
      </div>
    </div>
  );
}

export default ServicesPageSection;
