import React from "react";
import TabButton from "../TabButton";
import Image from "next/image";
import { useRouter } from "next/router";

function Systems() {
  const router = useRouter();
  return (
    <div
      className="p-4 md:p-6 lg:p-8 rounded-2xl md:rounded-3xl lg:rounded-4xl relative overflow-hidden"
      style={{
        backgroundImage: "url('/images/services/img1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-400/20 via-neutral-600/30 to-teal-800/40 z-0"></div>

      <div className="relative">
        <button className="inline-flex text-white items-center px-8 py-1 font-archivo bg-transparent border border-neutral-300 rounded-full">
          Suvarma
        </button>

        <div className="flex flex-col lg:flex-row gap-6 mt-4 md:mt-6 lg:mt-8">
          {/* Images Grid */}
          <div className="flex flex-col sm:flex-row gap-3 lg:w-2/3">
            {/* Left column - single tall image */}
            <div className="w-full sm:w-1/3">
              <div className="relative h-64 sm:h-96 md:h-[460px] w-full rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Top gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

                <Image
                  src="/images/services/img2.jpg"
                  alt="Irrigation system overview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                  priority
                />

                {/* Bottom text with gradient background */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
                  <p className="text-white font-medium font-archivo text-sm md:text-lg">
                    Pivot Irrigation Systems
                  </p>
                </div>
              </div>
            </div>

            {/* Middle column - two square images */}
            <div className="w-full sm:w-1/3 flex flex-col gap-3">
              <div className="relative h-48 md:h-52 lg:h-56 w-full rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Top gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

                <Image
                  src="/images/services/img3.jpg"
                  alt="Close-up of sprinkler system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />

                {/* Bottom text with gradient background */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-10">
                  <p className="text-white font-medium text-xs md:text-sm">
                    Sprinkler Systems
                  </p>
                </div>
              </div>

              <div className="relative h-48 md:h-52 lg:h-56 w-full rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Top gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

                <Image
                  src="/images/services/img4.jpg"
                  alt="Drip irrigation in field"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />

                {/* Bottom text with gradient background */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/70 to-transparent z-10">
                  <p className="text-white font-medium text-xs md:text-sm">
                    Drip Irrigation
                  </p>
                </div>
              </div>
            </div>

            {/* Right column - single tall image */}
            <div className="w-full sm:w-1/3">
              <div className="relative h-64 sm:h-96 md:h-[460px] w-full rounded-2xl md:rounded-3xl overflow-hidden">
                {/* Top gradient overlay */}
                <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black/50 to-transparent z-10"></div>

                <Image
                  src="/images/services/img5.jpg"
                  alt="Pivot irrigation system"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                />

                {/* Bottom text with gradient background */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent z-10">
                  <p className="text-white font-medium text-sm md:text-lg">
                    Underground Irrigation
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Card */}
          <div className="lg:w-1/3">
            <div className="backdrop-blur-md w-full bg-white/10 p-6 md:p-8 lg:p-12 rounded-2xl md:rounded-3xl border border-white/20 transition-all hover:bg-white/15 hover:border-white/30">
              <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">
                Suvarma Sistemlerinde Peşekar Heller
              </h2>
              <p className="text-white/90 mb-4 lg:mb-6 text-sm md:text-lg">
                <strong className="block mb-2">
                  Önenevi ve müasir metodlarla effektiv suvarma:
                </strong>
                İstenilen tasarrufat üçün uygun Pivot, Damlama, Sprinkler ve
                Yeraltı sistemler.
              </p>
              <div className="w-full h-px bg-white/20 my-4 lg:my-6"></div>
              <button
                onClick={() => router.push("/services")}
                className="relative cursor-pointer py-2 md:py-3 px-5 md:px-7 w-full max-w-[180px] font-archivo text-sm md:text-lg text-black rounded-full bg-white hover:bg-gray-100 transition-colors flex items-center justify-between"
                aria-label="Contact us about irrigation systems"
              >
                Contact Us
                <span className="bg-brand rounded-full p-1 md:p-1.5">
                  <svg
                    width="8"
                    height="15"
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
  );
}

export default Systems;
