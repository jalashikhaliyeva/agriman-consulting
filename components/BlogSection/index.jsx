import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from "react-i18next";

const BlogSection = ({ blogs }) => {
  const { t } = useTranslation();
  const sliderRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoScrollPaused, setAutoScrollPaused] = useState(false);

  // Get main blog and the rest for the slider
  const mainBlog = blogs.data[0]
    ? {
        id: blogs.data[0].id,
        title: blogs.data[0].title,
        description: blogs.data[0].short_description,
        image: blogs.data[0].image,
        link: `/blog/${blogs.data[0].slug}`,
      }
    : null;

  // Get all blogs except the first one for the slider
  const sliderBlogs = blogs.data.slice(1).map((blog) => ({
    id: blog.id,
    title: blog.title,
    description: blog.short_description,
    image: blog.image,
    link: `/blog/${blog.slug}`,
  }));

  // Auto scroll functionality
  useEffect(() => {
    let interval;

    // Only enable auto scroll for desktop (md and above)
    if (!autoScrollPaused && sliderBlogs.length > 1 && window.innerWidth >= 768) {
      interval = setInterval(() => {
        if (sliderRef.current) {
          const maxScroll =
            sliderRef.current.scrollWidth - sliderRef.current.clientWidth;
          const newPosition =
            currentSlide < sliderBlogs.length - 1 ? currentSlide + 1 : 0;

          setCurrentSlide(newPosition);

          sliderRef.current.scrollTo({
            left: newPosition * sliderRef.current.clientWidth,
            behavior: "smooth",
          });
        }
      }, 5000); 
    }

    return () => clearInterval(interval);
  }, [currentSlide, sliderBlogs.length, autoScrollPaused]);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - sliderRef.current.offsetLeft);
    setScrollLeft(sliderRef.current.scrollLeft);
    setAutoScrollPaused(true);
    sliderRef.current.style.cursor = "grabbing";
    sliderRef.current.style.userSelect = "none";
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setTimeout(() => setAutoScrollPaused(false), 8000);
    if (sliderRef.current) {
      sliderRef.current.style.cursor = "grab";
      sliderRef.current.style.userSelect = "auto";
    }
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - sliderRef.current.offsetLeft;
    const walk = (x - startX) * 1.2;

    requestAnimationFrame(() => {
      if (sliderRef.current) {
        sliderRef.current.scrollLeft = scrollLeft - walk;

        const slideWidth = sliderRef.current.clientWidth;
        const newSlide = Math.round(sliderRef.current.scrollLeft / slideWidth);
        if (newSlide !== currentSlide) {
          setCurrentSlide(newSlide);
        }
      }
    });
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      if (sliderRef.current) {
        sliderRef.current.style.cursor = "grab";
        sliderRef.current.style.userSelect = "auto";
      }
    }
    setTimeout(() => setAutoScrollPaused(false), 5000);
  };

  return (
    <section data-aos="fade-up" className=" w-full p-6 pb-12 bg-white rounded-t-4xl">
      <div  className="mx-auto">
        {/* Header */}
        <button className="inline-flex items-center px-8 py-1 font-archivo bg-transparent border border-neutral-300 rounded-full">
          {t("news_blog")}
        </button>
        <div className="w-[118px] mx-auto text-center mb-6 flex items-center justify-center h-1 rounded-2xl bg-brand mt-2"></div>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div >
            <h2 className="text-3xl md:text-4xl font-medium font-archivo mb-4">
              {t("latest_updates")}
            </h2>
            <p className="max-w-2xl text-neutral-400 font-archivo">
              {t("agri_updates_intro")}
            </p>
          </div>

          <div className="flex items-center mt-6 md:mt-0">
            <Link
              href="/blog"
              className="relative py-3 px-7 w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0"
            >
              {t("view_more")}
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
            </Link>
            <span className="ml-4 text-neutral-400 hidden md:block">
              {t("follow_blog")}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <div className="md:col-span-6 relative rounded-3xl overflow-hidden">
            <div className="relative h-80 sm:h-96 md:h-[350px] w-full bg-olive-600 group">
              {mainBlog && (
                <>
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                    <Image
                      src={mainBlog.image}
                      alt={mainBlog.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/70 to-transparent">
                    <div className="transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                      <h3 className="text-xl md:text-2xl font-bold mb-2">
                        {mainBlog.title}
                      </h3>
                      <p className="text-sm mb-4 opacity-90 line-clamp-3">
                        {mainBlog.description}
                      </p>
                      <Link
                        href={mainBlog.link}
                        className="relative py-2 px-7 w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black hover:bg-black/80 transition-colors duration-300"
                      >
                        {t("view_more")}
                        <span className="absolute left-[110px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
                          <svg
                            width="5"
                            height="10"
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
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          <div className="md:col-span-6 relative">
            {sliderBlogs.length > 1 && (
              <div className="absolute flex md:hidden -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-1 z-10">
                {Array.from({ length: sliderBlogs.length }).map((_, index) => (
                  <button
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide ? "bg-black w-4" : "bg-gray-300"
                    }`}
                    onClick={() => {
                      setCurrentSlide(index);
                      sliderRef.current.scrollTo({
                        left: index * sliderRef.current.clientWidth,
                        behavior: "smooth",
                      });
                      setAutoScrollPaused(true);
                      setTimeout(() => setAutoScrollPaused(false), 8000);
                    }}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            )}

            <div
              ref={sliderRef}
              className="flex overflow-x-auto scrollbar-hide snap-x snap-mandatory"
              style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
                cursor: "grab",
              }}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              onTouchStart={(e) => {
                setIsDragging(true);
                setStartX(e.touches[0].pageX - sliderRef.current.offsetLeft);
                setScrollLeft(sliderRef.current.scrollLeft);
                setAutoScrollPaused(true);
              }}
              onTouchEnd={() => {
                setIsDragging(false);
                setTimeout(() => setAutoScrollPaused(false), 8000);
              }}
              onTouchMove={(e) => {
                if (!isDragging) return;
                e.preventDefault();
                const x = e.touches[0].pageX - sliderRef.current.offsetLeft;
                const walk = (x - startX) * 1.2;

                requestAnimationFrame(() => {
                  if (sliderRef.current) {
                    sliderRef.current.scrollLeft = scrollLeft - walk;
                  }
                });
              }}
            >
              {sliderBlogs.map((post) => (
                <div
                  key={post.id}
                  className="min-w-[100%] md:min-w-[33.333%] px-2 snap-start transition-transform duration-300"
                >
                  <div className="relative h-80 sm:h-96 md:h-[350px] rounded-3xl overflow-hidden group">
                    <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-105">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="relative h-full flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/70 to-transparent">
                      <div className="transform transition-transform duration-300 group-hover:translate-y-[-5px]">
                        <h3 className="text-lg font-bold mb-2 line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-xs mb-3 opacity-90 line-clamp-2">
                          {post.description}
                        </p>
                        <Link
                          href={post.link}
                          className="relative py-2 px-5 w-[120px] font-archivo text-sm text-white rounded-4xl backdrop-blur-md bg-black hover:bg-black/80 transition-colors duration-300"
                        >
                          {t("view_more")}
                          <span className="absolute left-[100px] top-1/2 -translate-y-1/2 bg-brand rounded-full px-2 py-1">
                            <svg
                              width="6"
                              height="12"
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
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default BlogSection;