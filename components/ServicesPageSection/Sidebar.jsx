import React from "react";
import { useRouter } from "next/router";

function Sidebar({ categories, onServiceClick }) {
  const router = useRouter();
  const { service: activeServiceSlug } = router.query;

  return (
    <div className="p-7 rounded-4xl w-full  flex flex-col bg-brand">
      {categories?.data?.map((category) => (
        <div key={category.id}>
          <p className="bg-[#819D72] rounded-4xl text-md text-white px-7 p-2 font-archivo mb-2">
            {category.name}
          </p>

          {category.services.map((service) => (
            <div key={service.slug} className="flex items-center gap-2 px-2">
              <div className="w-[14px] flex justify-center">
                {activeServiceSlug === service.slug && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect width="14" height="14" rx="7" fill="white" />
                    <path
                      d="M10.5 7.00002L5.83337 11.6667L7.58337 7.00002L5.83337 2.33335L10.5 7.00002Z"
                      fill="#5E7740"
                    />
                  </svg>
                )}
              </div>
              <p
                className={`rounded-4xl text-lg p-2 font-archivo font-normal cursor-pointer transition-colors ${
                  activeServiceSlug === service.slug
                    ? "text-white"
                    : "text-neutral-300 hover:text-white"
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
