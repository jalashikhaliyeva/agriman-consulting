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
    }, 8000);

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
        <div className="flex max-w-[700px] flex-col-reverse md:flex-col pt-10 md:pt-2 text-white mb-10 lg:mb-0 w-full lg:w-auto text-center lg:text-left">
          <button className="relative py-3 px-7 mb-6 w-[140px] font-archivo text-base text-white rounded-4xl bg-[#5E7740] mx-auto lg:mx-0">
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
                 className="relative hidden lg:flex w-full max-w-[300px]"
                 style={{ transform: "translateX(-100px) translateY(70px)" }} 
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
                  <div className="absolute top-0 right-[-6px] bottom-0 left-[-6px]  bg-white/5 backdrop-blur-[10px] rounded-4xl transform scale-110 -z-10"></div>
       
                 <div
                        
                   ref={sliderRef}
                   className="bg-white w-full py-4 px-4  rounded-3xl relative transition-all duration-300 ease-out z-10 shadow-lg"
                 >
                   <Image
                     alt="Slide Image"
                     width={300}
                     height={200}
                     className="w-full h-[240px] object-cover rounded-3xl mb-4"
                     src={
                       breadcrumbData?.thumb_image ||
                       breadcrumbData?.image ||
                       "/images/hero/hero.jpg"
                     }
                   />
                   <div className="flex justify-around items-center my-3">
                     <p className="text-2xl font-archivo text-neutral-950">
                       {breadcrumbData?.title || "Portfolio"}
                     </p>
                    
                     <button
                       className="relative cursor-pointer py-3 px-8 font-archivo text-base text-white rounded-4xl bg-black hover:bg-gray-800 transition-colors duration-300"
                       aria-label="View all portfolio items"
                       onClick={() => router.push("/about")}
       
                     >
                       {t("view_more")}
                       <span className="absolute p-2 right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-brand rounded-full">
                         <svg
                           width="14"
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
       
                   <div className="flex justify-around items-center font-archivo my-4">
                     <div className="flex flex-col gap-1 text-black">
                       <p className="text-4xl sm:text-5xl font-archivo font-semibold">
                         {breadcrumbData?.number_1 ||
                           slidesData[currentSlide]?.stats?.projects ||
                           "150+"}
                       </p>
                       <p className="text-center">
                         {breadcrumbData?.text_1 || "Projects"}
                       </p>
                     </div>
                     <div className="flex flex-col gap-1 text-black">
                       <p className="text-4xl sm:text-5xl font-archivo font-semibold">
                         {breadcrumbData?.number_2 ||
                           slidesData[currentSlide]?.stats?.satisfaction ||
                           "99%"}
                       </p>
                       <p className="text-center">
                         {breadcrumbData?.text_2 || "Satisfaction"}
                       </p>
                     </div>
                   </div>
       
                   <p className="text-neutral-400 text-sm mb-4 px-5 font-archivo">
                     {breadcrumbData?.description ||
                       slidesData[currentSlide]?.description ||
                       "We provide innovative solutions for irrigation systems, soil analysis, fertilization and technical advice."}
                   </p>
                 </div>
       
                 <div className="hidden lg:flex absolute right-[-40px] top-1/2 transform -translate-y-1/2 flex-col items-center gap-3">
                   {Array.from({ length: heroData?.length || slidesData.length }).map(
                     (_, index) => (
                       <button
                         key={index}
                         onClick={() => {
                           setCurrentSlide(index);
                           setIsAutoPlaying(false);
                           setTimeout(() => setIsAutoPlaying(true), 10000);
                         }}
                         className={`w-1 h-1 rounded-full transition-all duration-300 ${
                           index === currentSlide
                             ? "bg-white scale-125"
                             : "bg-white/50 hover:bg-white/70"
                         }`}
                         aria-label={`Go to slide ${index + 1}`}
                       />
                     )
                   )}
                 </div>
       
                 <div className="lg:hidden flex justify-center mt-6 gap-3">
                   {Array.from({ length: heroData?.length || slidesData.length }).map(
                     (_, index) => (
                       <button
                         key={index}
                         onClick={() => {
                           setCurrentSlide(index);
                           setIsAutoPlaying(false);
                           setTimeout(() => setIsAutoPlaying(true), 10000);
                         }}
                         className={`w-1 h-1 rounded-full transition-all duration-300 ${
                           index === currentSlide
                             ? "bg-white scale-125"
                             : "bg-white/50 hover:bg-white/70"
                         }`}
                         aria-label={`Go to slide ${index + 1}`}
                       />
                     )
                   )}
                 </div>
               </div>
      </div>
    </Container>
  );
}

export default HeroAbout;