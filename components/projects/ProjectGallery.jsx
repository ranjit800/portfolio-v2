"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { A11y, Autoplay, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export default function ProjectGallery({ project, sizes = "(max-width: 1023px) 100vw, 65vw" }) {
  const reduceMotion = useReducedMotion();
  const galleryRef = useRef(null);
  const swiperRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const hasGallery = project.images.length > 1;

  useEffect(() => {
    if (!hasGallery || !galleryRef.current) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );

    observer.observe(galleryRef.current);
    return () => observer.disconnect();
  }, [hasGallery]);

  useEffect(() => {
    const autoplay = swiperRef.current?.autoplay;
    if (!autoplay) return;

    if (isVisible && !reduceMotion) autoplay.start();
    else autoplay.stop();
  }, [isVisible, reduceMotion]);

  const stopAutoplay = () => swiperRef.current?.autoplay?.stop();
  const resumeAutoplay = () => {
    if (isVisible && !reduceMotion) swiperRef.current?.autoplay?.start();
  };

  if (!hasGallery) {
    return (
      <div className="relative aspect-[2.08/1] w-full overflow-hidden">
        <Image
          src={project.images[0]}
          alt={`${project.title} interface screenshot`}
          fill
          sizes={sizes}
          className="object-cover object-top"
        />
      </div>
    );
  }

  return (
    <div
      ref={galleryRef}
      onFocusCapture={stopAutoplay}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) resumeAutoplay();
      }}
      className="project-gallery relative aspect-[2.08/1] w-full overflow-hidden"
    >
      <Swiper
        modules={[A11y, Autoplay, Keyboard, Navigation, Pagination]}
        slidesPerView={1}
        loop
        speed={650}
        keyboard={{ enabled: true, onlyInViewport: true }}
        navigation
        pagination={{ clickable: true }}
        autoplay={reduceMotion ? false : { delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
          if (reduceMotion || !isVisible) swiper.autoplay.stop();
        }}
        aria-label={`${project.title} screenshot gallery`}
        className="h-full w-full"
      >
        {project.images.map((image, index) => (
          <SwiperSlide key={image}>
            <div className="relative h-full w-full">
              <Image
                src={image}
                alt={`${project.title} interface screenshot ${index + 1} of ${project.images.length}`}
                fill
                sizes={sizes}
                className="object-cover object-top"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <span className="pointer-events-none absolute top-3 right-3 z-10 rounded-full border border-white/15 bg-black/55 px-2.5 py-1 font-mono text-[0.58rem] tracking-[0.12em] text-slate-200 backdrop-blur-sm">
        {project.images.length} VIEWS
      </span>
    </div>
  );
}
