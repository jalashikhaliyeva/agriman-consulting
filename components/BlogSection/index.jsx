import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      title: "2025-ci il üçün Əkin Planlaşdırması",
      description:
        "əkin mövsümünə hazırlıq və yüksək məhsuldarlıq üçün praktiki addımlar.",
      image: "/images/services/img1.jpg",
      link: "/blog/farming-plan-2025",
    },
    {
      id: 2,
      title: "Damlama və Pivot Suvarma Sistemlərinin Müqayisəsi",
      description:
        "əkin mövsümünə hazırlıq və yüksək məhsuldarlıq üçün praktiki addımlar.",
      image: "/images/services/img1.jpg",
      link: "/blog/irrigation-systems-comparison",
    },
    {
      id: 3,
      title: "Torpaq Analizinin Əhəmiyyəti",
      description:
        "Məhsuldarlığa təsir edən əsas faktorları necə müəyyən etməli?",
      image: "/images/services/img1.jpg",
      link: "/blog/importance-of-soil-analysis",
    },
    {
      id: 4,
      title: "İstixanaların İqlimə Uyğun Dizaynı",
      description: "Daha az enerji xərci, daha yüksək nəticə.",
      image: "/images/services/img1.jpg",
      link: "/blog/climate-appropriate-greenhouse-design",
    },
  ];

  return (
    <section className="w-full py-6 md:py-12 bg-white rounded-4xl">
      <div className="max-w-7xl p-5 mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div className="">
            <button className="mb-5 inline-flex items-center px-8 py-1 font-archivo bg-transparent border border-neutral-300 rounded-full">
              News / Blog
            </button>
            <h2 className="text-3xl md:text-4xl font-medium font-archivo mb-4">
              Son Yeniliklər və Tövsiyələr
            </h2>
            <p className="max-w-2xl text-neutral-400 font-archivo">
              Sizi kənd təsərrüfatı sahəsində baş verən ən son yeniliklərlə
              tanış edirik. Effektiv məhsuldarlıq, suvarma texnologiyaları və
              torpaq analizi sahəsində mütəxəssis tövsiyələri burada!
            </p>
          </div>

          <div className="flex items-center mt-6 md:mt-0">
            <button className="relative py-3 px-7  w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
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
            <span className="ml-4 text-neutral-400 hidden md:block">
              Bloqu izləyin və yeniliklərdən xəbərdar olun!
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 lg:gap-6">
          <div className="md:col-span-6 relative rounded-3xl overflow-hidden">
            <div className="relative h-96 md:h-96 w-full bg-olive-600 ">
              {/* Add actual image */}
              <div className="absolute inset-0">
                <Image
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="relative h-full flex flex-col justify-end p-6 text-white bg-gradient-to-t from-black/60 to-transparent">
                <h3 className="text-xl font-bold mb-2">{blogPosts[0].title}</h3>
                <p className="text-sm mb-4 opacity-90">
                  {blogPosts[0].description}
                </p>
                <button className="relative py-3 px-7  w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
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
          </div>

          {/* Container for 3 smaller posts in a row */}
          <div className="md:col-span-6 grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            {/* Map through the 3 smaller posts */}
            {blogPosts.slice(1).map((post) => (
              <div
                key={post.id}
                className="relative rounded-3xl overflow-hidden"
              >
                <div className="relative h-64 md:h-96 w-full bg-olive-600">
                  {/* Add actual image */}
                  <div className="absolute inset-0">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="relative h-full flex flex-col justify-end p-4 text-white bg-gradient-to-t from-black/60 to-transparent">
                    <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                    <p className="text-xs mb-3 opacity-90">
                      {post.description}
                    </p>
                    <button className="relative py-3 px-7  w-[140px] font-archivo text-base text-white rounded-4xl backdrop-blur-md bg-black mx-auto lg:mx-0">
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
