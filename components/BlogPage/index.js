// pages/blog/index.js
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import { BlogModal } from "../BlogSection/BlogModal";

export default function BlogPage({ blogs }) {
  const { t } = useTranslation();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);

  // whenever ?slug= appears, find that blog & open the modal
  useEffect(() => {
    const { slug } = router.query;
    if (slug && blogs?.data) {
      const found = blogs.data.find((b) => b.slug === slug);
      if (found) {
        setSelectedBlog(found);
        setIsModalOpen(true);
      }
    }
  }, [router.query.slug, blogs]);

  // close handler: hide modal and clean up the URL
  const handleClose = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    router.push("/blog", undefined, { shallow: true });
  };

  // click handler: shallow-push ?slug=
  const handleViewMore = (blog) => {
    router.push(`/blog?slug=${blog.slug}`, undefined, { shallow: true });
  };

  if (!blogs?.data) {
    return <div>Bloglar mövcud deyil</div>;
  }

  return (
    <div className="bg-[#E6F0E5] p-6 relative">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.data.map((blog) => (
          <div
            key={blog.slug}
            className="bg-white rounded-4xl p-6 shadow-sm flex flex-col md:flex-row gap-6"
          >
            <img
              src={blog.thumb_image}
              alt={blog.title}
              className="w-full md:w-48 h-48 object-cover rounded-lg flex-shrink-0"
            />
            <div className="flex flex-col justify-between">
              <div>
                <h2 className="text-2xl font-bold mb-2 uppercase">
                  {blog.title}
                </h2>
                <p className="text-gray-600 text-sm">
                  {blog.short_description || "Təsvir yoxdur"}
                </p>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleViewMore(blog)}
                  className="relative mb-4 md:mb-0 md:mt-4 whitespace-nowrap cursor-pointer py-2 md:py-3 px-5 md:px-7 font-archivo text-sm md:text-base text-white rounded-4xl backdrop-blur-md bg-black md:mx-0 text-left md:text-center"
                  style={{ alignSelf: "flex-start" }}
                >
                  {t("view_more")}
                  <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-brand rounded-full p-1">
                    <svg
                      width="16"
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

      {/* Modal injected at bottom of page */}
      <BlogModal
        isOpen={isModalOpen}
        onClose={handleClose}
        blog={selectedBlog}
      />
    </div>
  );
}

// If you were already using getStaticProps in this file, keep it as-is.
// It must provide `blogs` with a `data: Blog[]` array.
export async function getStaticProps() {
  const res = await fetch("https://your-api.example.com/blogs");
  const blogs = await res.json();
  return {
    props: { blogs },
    revalidate: 60,
  };
}
