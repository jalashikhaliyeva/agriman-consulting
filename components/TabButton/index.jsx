import React from "react";

function TabButton({ children, onClick }) {
  return (
    <button
      className="inline-flex items-center px-8 py-1 font-archivo bg-transparent border border-neutral-300 rounded-full"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default TabButton;
