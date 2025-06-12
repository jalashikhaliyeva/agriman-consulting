import React from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function Sidebar({ categories, onServiceClick, selectedService }) {
  const router = useRouter();
  const { service: activeServiceSlug } = router.query;
  const { i18n } = useTranslation();

  return (
    <div className="p-7 rounded-4xl w-full  flex flex-col border-2 border-brand  sticky top-25">
      {categories?.data?.map((category) => (
        <div key={category.id}>
          <p className="bg-[#bbbbbb] rounded-4xl text-md text-white px-7 p-2 font-archivo mb-2">
            {category.name}
          </p>

          {category.services.map((service) => (
            <div key={service.slug} className="flex items-center gap-2 px-2">
             
              <p
                className={`flex flex-col rounded-4xl text-lg p-1 pl-4 mb-1 w-full font-archivo font-normal cursor-pointer transition-colors ${
                  (activeServiceSlug === service.slug || selectedService?.slug === service.slug)
                    ? "text-white bg-brand"
                    : "text-brand hover:border-2 hover:border-brand"
                }`}
                onClick={() => onServiceClick(service.slug)}
              >
                {service.title || service.name}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
