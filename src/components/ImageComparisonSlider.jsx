"use client";

import { useRef, useState, useEffect, useCallback } from "react";

export default function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeLabel = "Sebelum",
  afterLabel = "Sesudah",
}) {
  const containerRef = useRef(null);
  const [sliderPosition, setSliderPosition] = useState(50);
  const isDraggingRef = useRef(false);

  const updatePosition = useCallback((clientX) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(Math.max(2, Math.min(98, percentage)));
  }, []);

  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    e.preventDefault();
  };

  const handleMouseMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      updatePosition(e.clientX);
    },
    [updatePosition]
  );

  const handleMouseUp = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleTouchStart = (e) => {
    isDraggingRef.current = true;
  };

  const handleTouchMove = useCallback(
    (e) => {
      if (!isDraggingRef.current) return;
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition]
  );

  const handleTouchEnd = useCallback(() => {
    isDraggingRef.current = false;
  }, []);

  const handleContainerClick = (e) => {
    updatePosition(e.clientX);
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
    };
  }, [handleMouseMove, handleMouseUp, handleTouchMove, handleTouchEnd]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden rounded-t-xl select-none cursor-col-resize"
      onClick={handleContainerClick}
    >
      {/* After image (background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt="Sesudah"
          className="w-full h-full object-cover"
          draggable={false}
        />
        <div className="absolute bottom-2 right-2 bg-emerald-500/90 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {afterLabel}
        </div>
      </div>

      {/* Before image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%` }}
      >
        <img
          src={beforeImage}
          alt="Sebelum"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ minWidth: containerRef.current?.offsetWidth || 300 }}
          draggable={false}
        />
        <div className="absolute bottom-2 left-2 bg-gray-800/80 text-white text-xs font-semibold px-2 py-0.5 rounded-full">
          {beforeLabel}
        </div>
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
        style={{ left: `${sliderPosition}%` }}
      />

      {/* Drag handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ left: `${sliderPosition}%` }}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        onClick={(e) => e.stopPropagation()}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M5 4L2 8L5 12M11 4L14 8L11 12"
            stroke="#374151"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </div>
  );
}
