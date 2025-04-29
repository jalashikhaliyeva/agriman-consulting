import React from "react";
import TabButton from "../TabButton";

function ContactUsSection() {
  return (
    <div className="bg-white rounded-3xl p-6 md:p-10 my-8">
      <TabButton>Contact Us</TabButton>

      <div className="flex flex-col lg:flex-row justify-between py-10 lg:py-20 w-full gap-8 lg:gap-12">
        <div className="w-full lg:w-1/2">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-black font-arimo pb-5">
            AGRIMAN ofisi və texniki heyəti ilə əlaqə
          </h2>
          <p className="text-neutral-400 text-sm md:text-base">
            Sizə ən yaxın texniki komandamızla görüş təyin edin və
            təsərrüfatınız üçün ən uyğun suvarma, istixana və torpaq həllərini
            müzakirə edin. Əkin sahənizə uyğun fərdi yanaşma üçün biz buradayıq.
          </p>

          <div className="flex flex-col mt-6 gap-2 md:gap-3 border-l-4 pl-5 text-sm md:text-lg border-brand py-2">
            <p>Email: info@agrimanconsulting.com</p>
            <p>Telefon: +994 12 123 45 67</p>
            <p>İş saatları: Həftəiçi 09:00 – 18:00</p>
          </div>
          <button className="relative py-2 md:py-3 px-5 md:px-7 mt-5 w-[120px] md:w-[140px] font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
            View more
            <span className="absolute left-[100px] md:left-[120px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
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
        <div className="w-full lg:w-1/2">
          <form className="space-y-3 md:space-y-4">
            <div className="flex flex-col md:flex-row gap-3 md:gap-4">
              <input
                type="text"
                placeholder="Name"
                className="w-full px-4 py-2 md:py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
              <input
                type="text"
                placeholder="Surname"
                className="w-full px-4 py-2 md:py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
              />
            </div>
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-2 md:py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
            <input
              type="text"
              placeholder="About"
              className="w-full px-4 py-2 md:py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
            <textarea
              placeholder="Message"
              rows={4}
              className="w-full px-4 py-2 md:py-3 rounded-2xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-brand/50"
            />
            <button
              type="submit"
              className="w-full py-2 md:py-3 px-6 bg-brand text-white rounded-full hover:bg-brand/90 transition-colors"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ContactUsSection;
