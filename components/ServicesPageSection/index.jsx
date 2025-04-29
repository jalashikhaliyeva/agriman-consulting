import React from "react";
import Sidebar from "./Sidebar";
import Image from "next/image";
import Link from "next/link";
import AboutService from "./AboutService";

function ServicesPageSection() {
  return (
    <div className="flex flex-col lg:flex-row  w-full justify-between mt-6 lg:mt-10 gap-6 ">
      <div className="flex w-full lg:w-1/3 flex-col gap-5 relative px-4 lg:px-0">
        {/* sidebar and image */}
        <Sidebar />
        <div className="relative rounded-3xl shadow-lg w-full lg:w-[400px] h-[360px] lg:h-[460px] overflow-hidden mx-auto">
          <Image
            src={"/images/hero/hero2.jpg"}
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
              2025-ci il üçün Əkin Planlaşdırması
            </h3>
            <p className="text-gray-300 text-sm lg:text-base">
              Əkin mövsümünə hazırlıq və yüksək məhsuldarlıq üçün praktiki
              addımlar.
            </p>
            <button className="relative py-2 lg:py-3 px-4 lg:px-7 text-sm lg:text-lg w-full font-archivo text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0 hover:bg-black/90 transition-colors">
              View more
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:w-3/4 px-4 lg:px-0">
        <AboutService />
      </div>
    </div>
  );
}

export default ServicesPageSection;
