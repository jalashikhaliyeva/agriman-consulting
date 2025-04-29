import { useEffect, useState, useRef } from "react";

export default function LogoMarquee() {
  // Sample logo data - replace with your actual logos
  const logos = [
    {
      id: 1,
      name: "Roots4Mission",
      url: "https://rootsmission.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 2,
      name: "CC Delman",
      url: "https://ccdelman.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 3,
      name: "Sunday Jack",
      url: "https://sundayjack.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 4,
      name: "Bintrayan",
      url: "https://bintrayan.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 5,
      name: "Abot Tanaw",
      url: "https://abottanaw.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 6,
      name: "Full Cycle",
      url: "https://fullcycle.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 7,
      name: "Inex",
      url: "https://inex.com",
      image: "/images/partners/google.webp",
    },
    {
      id: 8,
      name: "Circle",
      url: "https://circle.com",
      image: "/images/partners/google.webp",
    },
  ];

  const [isVisible, setIsVisible] = useState(false);
  const marqueeRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);

    // Optional: Add intersection observer for performance optimization
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      },
      { threshold: 0.1 }
    );

    if (marqueeRef.current) {
      observer.observe(marqueeRef.current);
    }

    return () => {
      if (marqueeRef.current) {
        observer.unobserve(marqueeRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full py-16 " ref={marqueeRef}>
      <div className="container mx-auto ">
        <div className="flex flex-col md:flex-row items-center font-arimo gap-10">
          <h2 className="text-4xl font-medium text-neutral-900">
            Uğurlu Layihələrimiz
          </h2>
          <p className="text-neutral-400 mt-2">
            Onlarla yerli və beynəlxalq müştəriyə xidmət göstərmişik. Bəzi
            layihələrə nəzər salın.
          </p>
        </div>

        <div className="relative flex flex-col">
          <div className="flex items-center mt-8 mb-2">
            <button className="relative py-3 px-6  flex items-center justify-center whitespace-nowrap font-archivo text-base text-white rounded-full backdrop-blur-md bg-black mx-auto lg:mx-0">
              <span className="mr-6 text-center">View more</span>
              <span className="bg-brand rounded-full px-2 py-1 inline-flex items-center justify-center">
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

            <div className="rounded-lg p-4 overflow-hidden flex-grow ml-4">
              <div
                className={`flex space-x-12 ${
                  isVisible ? "animate-marquee" : ""
                }`}
              >
                {[...logos, ...logos].map((logo, index) => (
                  <a
                    key={`${logo.id}-${index}`}
                    href={logo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center min-w-[120px] h-16 hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={logo.image}
                      alt={logo.name}
                      className="max-h-10 max-w-full object-contain"
                    />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }

        .animate-marquee {
          animation: marquee 16s linear infinite;
        }
      `}</style>
    </div>
  );
}
