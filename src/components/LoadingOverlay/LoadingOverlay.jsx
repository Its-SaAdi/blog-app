import React from "react";

function LoadingOverlay({ message = "Loading..." }) {
  return (
    <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center">
      <div className="w-12 h-12 border-4 border-zinc-50 border-t-transparent rounded-full animate-spin mb-6" />
      <p className="text-zinc-50 font-semibold">{message}</p>
    </div>
  );
}

export default LoadingOverlay;
