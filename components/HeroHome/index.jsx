// components/HeroHome.jsx
import React, { useEffect, useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import styles from "./style.module.css";
import Container from "../Container";
import Image from "next/image";

function HeroHome({ landingInfo, currentSlide, setCurrentSlide }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    speed: 10,
    align: "start",
    containScroll: "trimSnaps",
    axis: "y", // Vertical scrolling
  });

  const slides = landingInfo.map((info) => ({
    title: info.title,
    description: info.desc.replace(/<[^>]+>/g, ""),
    buttonText: info.button_text,
    backgroundImage: info.image,
  }));

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentSlide(emblaApi.selectedScrollSnap());
  }, [emblaApi, setCurrentSlide]);

  useEffect(() => {
    if (!emblaApi) return;
    emblaApi.on("select", onSelect);

    const autoplay = () => emblaApi && emblaApi.scrollNext();
    const autoplayInterval = setInterval(autoplay, 4000);
    return () => clearInterval(autoplayInterval);
  }, [emblaApi, onSelect]);

  const handleDotClick = (index) => {
    if (emblaApi) emblaApi.scrollTo(index);
  };

  return (
    <Container>
      <div className="relative flex flex-col lg:flex-row w-full">
        <div className="w-full mt-8 lg:mt-0 lg:w-1/3 lg:pr-8">
          <div className="bg-white w-full sm:w-[320px] py-4 px-6 rounded-3xl relative mx-auto lg:mx-0">
            <Image
              src={landingInfo[0].image} // Using first slide image or you can use a specific one
              alt="hero"
              width={500}
              height={500}
              priority
              className="rounded-3xl w-full h-auto object-cover"
            />

            <div className="flex justify-between items-center my-3">
              <p className="text-2xl font-archivo text-neutral-950">
                Portfolio
              </p>
              <button className="relative py-3 px-5 font-archivo text-base text-white rounded-4xl bg-black">
                {landingInfo[0].button_text}
                <span className="absolute left-[110px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
                  <svg
                    width="9"
                    height="18"
                    viewBox="0 0 9 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
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
                <p className="text-5xl font-archivo font-semibold">150+</p>
                <p className="text-center">Layihə</p>
              </div>
              <div className="flex flex-col gap-1 text-black">
                <p className="text-5xl font-archivo font-semibold">99%</p>
                <p className="text-center">Məmnunluq</p>
              </div>
            </div>

            <p className="text-neutral-400 text-sm mb-4 font-archivo">
              Biz irriqasiya sistemləri, torpaq analizi, gübrələmə və texniki
              məsləhətlər üzrə innovativ həllər təqdim edirik.
            </p>
          </div>
        </div>

        <div className={`${styles.heroSlider} w-full lg:w-2/3`} ref={emblaRef}>
          <div className={styles.embla__container}>
            {slides.map((slide, idx) => (
              <div className={styles.embla__slide} key={idx}>
                <div className="flex mt-16 flex-col w-full px-4 sm:px-6 lg:px-0">
                  {/* Text block only in slider */}
                  <div
                    className={`
                      mt-10 sm:mt-16 lg:mt-40
                      ${styles.textContainer}
                      w-full
                      text-center lg:text-left
                    `}
                  >
                    <button className="relative py-3 px-7 mb-6 w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-white/30 mx-auto lg:mx-0">
                      {slide.buttonText}
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
                      {slide.title}
                    </h1>
                    <p className="text-base sm:text-lg font-archivo font-normal tracking-wide pb-6 sm:pb-8 lg:pb-9">
                      {slide.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* Dots navigation */}
          <div
            className={`${styles.dotContainer} ${styles.dotContainerResponsive}`}
          >
            {slides.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${
                  currentSlide === i ? styles.active : ""
                }`}
                onClick={() => handleDotClick(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}

export default HeroHome;
