import { Fragment, useEffect, useState } from "react";
import { createPortal } from "react-dom";

interface MoviePosterProps {
  src: string;
  alt: string;
  imageClassName?: string;
}

export default function MoviePoster(props: MoviePosterProps) {
  const { src, alt, imageClassName } = props;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  if (!src || src === "N/A") {
    return (
      <div className="w-full h-64 bg-gray-700 rounded flex items-center justify-center text-sm text-gray-400">
        No Image
      </div>
    );
  }

  return (
    <Fragment>
      <img
        src={src}
        alt={alt}
        className={`w-full h-52 object-cover rounded-t-xl cursor-zoom-in ${imageClassName}`}
        onClick={() => setOpen(true)}
      />

      {open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
            onClick={() => setOpen(false)}
          >
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                className="absolute -top-3 -right-3 bg-white text-black rounded-full w-8 h-8 font-bold"
                onClick={() => setOpen(false)}
              >
                ✕
              </button>
              <img
                src={src}
                alt={alt}
                className="h-[70vh] object-contain rounded-xl"
              />
            </div>
          </div>,
          document.body
        )}
    </Fragment>
  );
}
