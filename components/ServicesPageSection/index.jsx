import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import AboutService from "./AboutService";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ServicesPageSection({ categories: initialCategories, banner }) {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState(initialCategories);
  const [categoriesLoading, setCategoriesLoading] = useState(false);

  // Function to fetch categories in current language
  const fetchCategories = async (language) => {
    setCategoriesLoading(true);
    try {
      const response = await fetch(
        `https://admin.agrimanconsulting.com/api/categories`, // Adjust this endpoint as needed
        {
          headers: {
            "Accept-Language": language,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.status}`);
      }

      const data = await response.json();
      setCategories(data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      // Keep the existing categories if fetch fails
    } finally {
      setCategoriesLoading(false);
    }
  };

  const fetchService = async (slug) => {
    if (!slug) {
      setLoading(false);
      setError("No service selected.");
      return;
    }

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
        setSelectedService(data.data);

        if (router.query.service !== data.data.slug) {
          router.replace(
            {
              pathname: router.pathname,
              query: { ...router.query, service: data.data.slug },
            },
            undefined,
            { shallow: true }
          );
        }
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching service:", err);
      setError(err.message);
      setSelectedService(null);
    } finally {
      setLoading(false);
    }
  };

  // Effect to handle language changes
  useEffect(() => {
    if (i18n.language && categories) {
      fetchCategories(i18n.language);
    }
  }, [i18n.language]);

  // Effect to handle service selection and initial load
  useEffect(() => {
    const { service: serviceSlug } = router.query;

    if (router.isReady && categories?.data) {
      if (serviceSlug) {
        fetchService(serviceSlug);
      } else {
        const firstService = categories.data.reduce((first, category) => {
          if (first) return first;
          return category.services?.[0];
        }, null);

        if (firstService) {
          router.replace(
            {
              pathname: "/services",
              query: { service: firstService.slug },
            },
            undefined,
            { shallow: true }
          );
        } else {
          setLoading(false);
        }
      }
    }
  }, [router.isReady, router.query.service, categories?.data]);

  // Effect to refetch current service when language changes
  useEffect(() => {
    if (router.query.service && selectedService) {
      fetchService(router.query.service);
    }
  }, [i18n.language]);

  const handleServiceClick = (slug) => {
    router.push(
      {
        pathname: "/services",
        query: { service: slug },
      },
      undefined,
      { shallow: true }
    );
  };

  return (
    <div
      data-aos="fade-up"
      className="flex flex-col lg:flex-row w-full justify-between mt-6 lg:mt-10 gap-6"
    >
      <div className="md:flex hidden w-full lg:w-[25%] flex-col gap-5 relative lg:px-0">
        {categoriesLoading ? (
          <div className="p-7 rounded-4xl w-full flex flex-col border-2 border-brand sticky top-25">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded mb-2"></div>
              <div className="h-6 bg-gray-200 rounded mb-1"></div>
              <div className="h-6 bg-gray-200 rounded mb-1"></div>
              <div className="h-6 bg-gray-200 rounded mb-1"></div>
            </div>
          </div>
        ) : (
          <Sidebar
            categories={categories}
            onServiceClick={handleServiceClick}
            selectedService={selectedService}
          />
        )}
      </div>
      <div className="w-full lg:w-[73%] lg:px-0">
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