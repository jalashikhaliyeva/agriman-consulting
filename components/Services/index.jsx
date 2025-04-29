import React from "react";
import TabButton from "../TabButton";
import Image from "next/image";
import { useRouter } from "next/router";

function Services() {
  const router = useRouter();
  return (
    <div className="bg-white p-4 md:p-6 rounded-3xl md:rounded-4xl">
      <TabButton>Services</TabButton>

      <div className="flex flex-col lg:flex-row gap-6 mt-4">
        {/* Large image container - full width on mobile, becomes left column on desktop */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[300px] sm:h-[400px] md:h-[500px] lg:h-[600px] w-full lg:max-w-[500px]">
          <Image
            src="/images/hero/hero2.jpg"
            alt="Service 1"
            fill
            className="object-cover"
            priority
          />
          <div
            className="absolute inset-0
                       bg-gradient-to-t
                       from-black/60
                       to-transparent"
          />
          <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-xl md:text-2xl font-semibold">
            Açıq Sahələr
          </div>
        </div>

        {/* Right content container - stacks on mobile, flex on desktop */}
        <div className="flex flex-col gap-4 md:gap-7 md:p-5 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="w-full sm:max-w-[70%]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-arimo">
                Geniş <span className="text-brand">Xidmət Spektri</span> ilə
                Torpağınıza Dəyər Qatın
              </h2>
            </div>
            <div className="w-full sm:w-auto self-end sm:self-auto">
              <button
                onClick={() => router.push("/services")}
                className="relative cursor-pointer py-3 px-7 mb-6 w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0"
              >
                View more
                <span className="absolute left-[120px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
                  <svg
                    width="8"
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

          <div className="pb-4 md:pb-7">
            <p className="text-neutral-500 font-arimo text-sm md:text-base">
              Kənd təsərrüfatı sahəsində hər mərhələdə sizinləyik — açıq
              sahələrdən istixanalara, laboratoriyadan topoqrafik planlaşdırmaya
              qədər.
            </p>
          </div>

          {/* Image grid - stacks on mobile, flex on tablet/desktop */}
          <div className="flex-grow">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 relative">
              {/* First image */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[180px] sm:h-[250px] md:h-[350px] w-full">
                <Image
                  src="/images/hero/hero.jpg"
                  alt="Service 1"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0
                       bg-gradient-to-t
                       from-black/60
                       to-transparent"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-lg md:text-2xl font-semibold">
                  Açıq Sahələr
                </div>
              </div>

              {/* Second image - moves up on larger screens */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[180px] sm:h-[250px] md:h-[350px] w-full md:-mt-16">
                <Image
                  src="/images/hero/hero2.jpg"
                  alt="Service 1"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0
                       bg-gradient-to-t
                       from-black/60
                       to-transparent"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-lg md:text-2xl font-semibold">
                  Açıq Sahələr
                </div>
              </div>

              {/* Third image - full width on mobile, normal on larger screens */}
              <div className="relative rounded-2xl md:rounded-3xl overflow-hidden h-[180px] sm:h-[250px] md:h-[350px] w-full col-span-2 sm:col-span-1">
                <Image
                  src="/images/hero/hero3.jpg"
                  alt="Service 1"
                  fill
                  className="object-cover"
                />
                <div
                  className="absolute inset-0
                       bg-gradient-to-t
                       from-black/60
                       to-transparent"
                />
                <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 text-white text-lg md:text-2xl font-semibold">
                  Açıq Sahələr
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
