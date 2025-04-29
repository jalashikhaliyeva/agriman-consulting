import React from "react";
import TabButton from "../TabButton";

function CareerSection() {
  return (
    <div className="relative rounded-3xl p-6 md:p-10 my-8 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: "url('/images/services/img4.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Enhanced Gradient Overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(49, 73, 21, 0.8) 0%, rgba(30, 30, 30, 0.9) 100%)",
        }}
      />

      {/* Additional Dark Overlay for Better Contrast */}
      <div className="absolute inset-0 z-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10">
        <button className="inline-flex items-center px-8 py-1 font-archivo bg-transparent text-white border border-neutral-300 rounded-full">
          Contact us
        </button>

        <div className="flex flex-col lg:flex-row justify-between py-10 lg:py-20 w-full gap-8 lg:gap-12">
          <div className="w-full lg:w-1/2">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-white font-arimo pb-5">
              AGRIMAN ofisi və texniki heyəti ilə əlaqə
            </h2>
            <p className="text-white/80 text-sm md:text-base">
              Sizə ən yaxın texniki komandamızla görüş təyin edin və
              təsərrüfatınız üçün ən uyğun suvarma, istixana və torpaq həllərini
              müzakirə edin. Əkin sahənizə uyğun fərdi yanaşma üçün biz
              buradayıq.
            </p>

            <div className="flex flex-col md:flex-row gap-5 w-full my-7">
              <button className="relative py-2 md:py-3 px-5 md:px-7 w-[120px] md:w-1/2 font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black/30 border border-white/20 mx-auto lg:mx-0">
                View more
                <span className="absolute left-[100px] md:left-[202px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
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
              <p className="font-archivo text-white/80">
                Texniki sahələr, aqronomika, satış, layihələndirmə və daha çox
                üzrə açıq vəzifələr.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <form className="space-y-3 md:space-y-4">
              <div className="flex flex-col md:flex-row gap-3 md:gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-2 md:py-3 rounded-2xl border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70"
                />
                <input
                  type="text"
                  placeholder="Surname"
                  className="w-full px-4 py-2 md:py-3 rounded-2xl border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full px-4 py-2 md:py-3 rounded-2xl border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70"
              />
              <input
                type="text"
                placeholder="About"
                className="w-full px-4 py-2 md:py-3 rounded-2xl border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70"
              />
              <textarea
                placeholder="Message"
                rows={4}
                className="w-full px-4 py-2 md:py-3 rounded-2xl border border-white/30 bg-white/10 text-white focus:outline-none focus:ring-2 focus:ring-brand/50 placeholder:text-white/70"
              />
              <div className="flex flex-col md:flex-row gap-5 w-full justify-between items-center">
                <div className="bg-white p-2 rounded-4xl cursor-pointer text-neutral-500 whitespace-nowrap overflow-hidden">
                  <p className="text-sm md:text-base">
                    Send CV to{" "}
                    <a
                      className="text-brand"
                      href="mailto:hr@agrimanconsulting.com"
                    >
                      hr@agrimanconsulting.com
                    </a>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full py-2 md:py-3 px-6 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors max-w-[200px] ml-4"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CareerSection;
