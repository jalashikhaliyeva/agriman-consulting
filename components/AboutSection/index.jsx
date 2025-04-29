import React from "react";
import TabButton from "../TabButton";
import Image from "next/image";
import ContactBanner from "../ContactBanner";

function AboutSection() {
  return (
    <div className="bg-white rounded-3xl p-6 my-6">
      <TabButton>About us</TabButton>

      <div className="flex flex-col gap-10 mt-6">
        {/* ——— ROW 1 ——— */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Image half */}
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero/hero3.jpg"
              alt="About Us"
              fill
              className="object-cover"
              quality={100}
            />
          </div>

          {/* Text half */}
          <div className="flex flex-col w-full md:w-1/2">
            <p className="text-brand text-2xl font-semibold text-center md:text-left">
              _________
            </p>
            <h2 className="mt-2 text-4xl pb-5 font-arimo text-black text-center md:text-left">
              1914 translation by H. Rackham
            </h2>
            <p className="text-lg text-neutral-400 font-arimo text-center md:text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry… Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        {/* ——— ROW 2 (reversed) ——— */}
        <div className="flex flex-col md:flex-row-reverse items-center gap-6">
          {/* Image half */}
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero/hero3.jpg"
              alt="About Us"
              fill
              className="object-cover"
              quality={100}
            />
          </div>

          {/* Text half */}
          <div className="flex flex-col w-full md:w-1/2">
            <p className="text-brand text-2xl font-semibold text-center md:text-right">
              _________
            </p>
            <h2 className="mt-2 pb-5 text-4xl font-arimo text-black text-center md:text-right">
              1914 translation by H. Rackham
            </h2>
            <p className="text-lg text-neutral-400 font-arimo text-center md:text-right">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry… Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        {/* ——— ROW 3 ——— */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Image half */}
          <div className="relative w-full md:w-1/2 h-[200px] md:h-[400px] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="/images/hero/hero3.jpg"
              alt="About Us"
              fill
              className="object-cover"
              quality={100}
            />
          </div>

          {/* Text half */}
          <div className="flex flex-col w-full md:w-1/2">
            <p className="text-brand text-2xl font-semibold text-center md:text-left">
              _________
            </p>
            <h2 className="mt-2 text-4xl pb-5 font-arimo text-black text-center md:text-left">
              1914 translation by H. Rackham
            </h2>
            <p className="text-lg text-neutral-400 font-arimo text-center md:text-left">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry… Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        <ContactBanner />
      </div>
    </div>
  );
}

export default AboutSection;
