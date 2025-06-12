// components/BlogModal.tsx
import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { createPortal } from "react-dom";

export function BlogModal({ isOpen, onClose, blog }) {
  const [mounted, setMounted] = useState(false);

  // wait for client‐side so document.body exists
  useEffect(() => {
    setMounted(true);
  }, []);

  // Prevent body scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    // Cleanup function to restore scrolling when modal closes
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!mounted || !isOpen || !blog) return null;

  return createPortal(
    <div className="fixed inset-0 z-[9999] flex items-center justify-center">
      {/* backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      />

      {/* modal container */}
      <div className="relative bg-white rounded-3xl max-w-[90%] w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* close button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 z-10 p-2 rounded-full bg-neutral-100 text-neutral-400 hover:bg-neutral-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* content */}
        <div className="pt-20 p-8">
          <div className="flex justify-between items-start mb-8">
            <h1 className="text-2xl font-medium leading-tight">
              {blog.title}
            </h1>
            <div className="text-xl font-bold">Parle Agro</div>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-2 mb-8 text-sm">
            <div>
              <div className="font-medium">
                Client: <span className="font-normal">{blog.client}</span>
              </div>
              <div className="font-medium">
                Date: <span className="font-normal">{blog.date}</span>
              </div>
            </div>
            <div>
              <div className="font-medium">
                Service: <span className="font-normal">{blog.service}</span>
              </div>
              <div className="font-medium">
                Location: <span className="font-normal">{blog.location}</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4 text-sm leading-relaxed">
            <div className="w-1/2 flex flex-col gap-4">
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-80 object-cover rounded-3xl"
              />
            </div>
            <div className="w-1/2 font-arimo text-neutral-800 space-y-4">
              <p
                dangerouslySetInnerHTML={{ __html: blog.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
