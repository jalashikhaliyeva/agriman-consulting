import React, { useState, useEffect, useRef } from "react";
import Container from "../Container";
import Image from "next/image";

function HeroAbout({ slidesData, currentSlide, setCurrentSlide }) {
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [startY, setStartY] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef(null);

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slidesData.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, slidesData.length, setCurrentSlide]);

  const handleTouchStart = (e) => {
    setStartY(e.touches[0].clientY);
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const y = e.touches[0].clientY;
    const diff = startY - y;

    // Visual feedback during drag
    if (Math.abs(diff) > 50) {
      sliderRef.current.style.transform = `translateY(${
        diff > 0 ? -10 : 10
      }px)`;
    }
  };

  const handleTouchEnd = (e) => {
    if (!isDragging) return;
    const y = e.changedTouches[0].clientY;
    const diff = startY - y;

    // Reset position
    sliderRef.current.style.transform = "translateY(0)";

    // Change slide if drag was significant
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swiped up - next slide
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      } else {
        // Swiped down - previous slide
        setCurrentSlide(
          (prev) => (prev - 1 + slidesData.length) % slidesData.length
        );
      }
    }

    setIsDragging(false);
    // Resume auto-play after a delay
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const handleMouseDown = (e) => {
    setStartY(e.clientY);
    setIsDragging(true);
    setIsAutoPlaying(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const y = e.clientY;
    const diff = startY - y;

    if (Math.abs(diff) > 50) {
      sliderRef.current.style.transform = `translateY(${
        diff > 0 ? -10 : 10
      }px)`;
    }
  };

  const handleMouseUp = (e) => {
    if (!isDragging) return;
    const y = e.clientY;
    const diff = startY - y;

    sliderRef.current.style.transform = "translateY(0)";

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        setCurrentSlide((prev) => (prev + 1) % slidesData.length);
      } else {
        setCurrentSlide(
          (prev) => (prev - 1 + slidesData.length) % slidesData.length
        );
      }
    }

    setIsDragging(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  return (
    <Container>
      <div className="w-full mt-20 flex flex-col lg:flex-row justify-between items-center h-[380px] md:h-[600px] py-10 lg:py-0">
        <div className="flex max-w-[700px] flex-col text-white mb-10 lg:mb-0 w-full lg:w-auto text-center lg:text-left">
          <button className="relative py-3 px-7 mb-6 w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-white/30 mx-auto lg:mx-0">
            Contact Us
            <span className="absolute left-[120px] top-1/2 -translate-y-1/2 bg-white rounded-full px-2 py-1">
              <svg
                width="8"
                height="15"
                viewBox="0 0 8 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7.14214 7.07107L0.0710678 14.1421L2.74019 6.97325L0.0710678 0L7.14214 7.07107Z"
                  fill="black"
                />
              </svg>
            </span>
          </button>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-arimo font-medium leading-snug pb-4 sm:pb-6 lg:pb-6">
            Aqıllı Kənd Təsərrüfatı İlə Gələcəyə Doğru
          </h1>
          <p className="text-base sm:text-lg font-archivo font-normal tracking-wide pb-6 sm:pb-8 lg:pb-9">
            Əsas məqsədimiz kənd təsərrüfatı müəssisələrini, sahibkarları və
            fermerləri dəstəkləməkdir – ekspert səviyyəsində becərmə üzrə
            konsaltinq xidməti göstərərək, yüksək keyfiyyətli və bol
            məhsuldarlığı təmin etməkdir.
          </p>
        </div>

        <div
          className="relative hidden  w-full max-w-[300px]"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={() => {
            if (isDragging) {
              sliderRef.current.style.transform = "translateY(0)";
              setIsDragging(false);
              setTimeout(() => setIsAutoPlaying(true), 10000);
            }
          }}
        >
          <div
            ref={sliderRef}
            className="bg-white w-full py-4 px-6 rounded-3xl relative transition-all duration-300 ease-out"
          >
            <Image
              alt="Slide Image"
              width={300}
              height={200}
              className="w-full h-[240px] object-cover rounded-3xl mb-4"
              src={"/images/hero/hero.jpg"}
            />
            <div className="flex justify-between items-center my-3">
              <p className="text-2xl font-archivo text-neutral-950">
                Portfolio
              </p>
              <button
                className="relative py-3 px-5 font-archivo text-base text-white rounded-4xl bg-black hover:bg-gray-800 transition-colors duration-300"
                aria-label="View all portfolio items"
              >
                View All
                <span className="absolute left-[110px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
                  <svg
                    width="9"
                    height="18"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      d="M1.03955 8.25839L8.03955 1.25839M8.03955 1.25839L1.97288 1.25839M8.03955 1.25839L8.03955 7.32506"
                      stroke="white"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>
            </div>

            <div className="flex justify-between items-center font-archivo my-4">
              <div className="flex flex-col gap-1 text-black">
                <p className="text-4xl sm:text-5xl font-archivo font-semibold">
                  {slidesData[currentSlide]?.stats?.projects || "150+"}
                </p>
                <p className="text-center">Projects</p>
              </div>
              <div className="flex flex-col gap-1 text-black">
                <p className="text-4xl sm:text-5xl font-archivo font-semibold">
                  {slidesData[currentSlide]?.stats?.satisfaction || "99%"}
                </p>
                <p className="text-center">Satisfaction</p>
              </div>
            </div>

            <p className="text-neutral-400 text-sm mb-4 font-archivo">
              {slidesData[currentSlide]?.description ||
                "We provide innovative solutions for irrigation systems, soil analysis, fertilization and technical advice."}
            </p>
          </div>

          <div className="hidden lg:flex absolute right-[-40px] top-1/2 transform -translate-y-1/2 flex-col items-center gap-3">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

          <div className="lg:hidden flex justify-center mt-6 gap-3">
            {slidesData.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                  setIsAutoPlaying(false);
                  setTimeout(() => setIsAutoPlaying(true), 10000);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? "bg-white scale-125"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HeroAbout;
