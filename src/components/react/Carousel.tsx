// src/components/react/Carousel.tsx
import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap'; // For cursor interaction
import './Carousel.css'; // Import component-specific styles
import { cursorStyles } from '../../lib/styles/cursor'; // Import cursor style classes

interface CarouselProps {
  images: string[];
  carouselId: string;
  imageClasses?: string;
  imageAltText?: string;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  carouselId,
  imageClasses = '',
  imageAltText = 'Gallery image',
}) => {
  const trackRef = useRef<HTMLDivElement>(null);

  const leftButtonDataAttrKey = `data-carousel-left-${carouselId}`;
  const rightButtonDataAttrKey = `data-carousel-right-${carouselId}`;

  useEffect(() => {
    const carouselTrack = trackRef.current;
    const leftButton = document.querySelector(`[${leftButtonDataAttrKey}]`) as HTMLButtonElement | null;
    const rightButton = document.querySelector(`[${rightButtonDataAttrKey}]`) as HTMLButtonElement | null;
    const cursorExample = document.querySelector(".cursor-example") as HTMLElement | null;

    if (!cursorExample) {
        console.warn("Carousel: .cursor-example element not found. Custom cursor interactions will be disabled for this carousel instance.");
    }

    // Store initial scale using a more robust method if possible, or assume default is 1 / no explicit scale
    // let initialCursorScale = cursorExample ? getComputedStyle(cursorExample).transform : '';


    const handleButtonMouseOver = () => {
      if (cursorExample) {
        // initialCursorScale = cursorExample.style.transform; // Reading style.transform can be unreliable if not set inline
        gsap.to(cursorExample, { scale: 2, duration: 0.2 });
      }
    };

    const handleButtonMouseOut = () => {
      if (cursorExample) {
        gsap.to(cursorExample, { scale: 1, duration: 0.2 }); // Assuming default scale is 1
      }
    };

    if (!carouselTrack || !leftButton || !rightButton) {
      console.warn(`Carousel elements not found for ID: ${carouselId}. Navigation will not work.`);
      return;
    }

    const scrollAmount = () => carouselTrack.clientWidth * 0.8;

    const handleLeftClick = () => {
      carouselTrack.scrollBy({ left: -scrollAmount(), behavior: 'smooth' });
    };

    const handleRightClick = () => {
      carouselTrack.scrollBy({ left: scrollAmount(), behavior: 'smooth' });
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        handleLeftClick();
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        handleRightClick();
      }
    };

    leftButton.addEventListener('click', handleLeftClick);
    rightButton.addEventListener('click', handleRightClick);
    carouselTrack.addEventListener('keydown', handleKeyDown as EventListener);

    if (cursorExample) {
      leftButton.addEventListener('mouseover', handleButtonMouseOver);
      leftButton.addEventListener('mouseout', handleButtonMouseOut);
      rightButton.addEventListener('mouseover', handleButtonMouseOver);
      rightButton.addEventListener('mouseout', handleButtonMouseOut);
    }

    return () => {
      leftButton.removeEventListener('click', handleLeftClick);
      rightButton.removeEventListener('click', handleRightClick);
      carouselTrack.removeEventListener('keydown', handleKeyDown as EventListener);
      if (cursorExample) {
        leftButton.removeEventListener('mouseover', handleButtonMouseOver);
        leftButton.removeEventListener('mouseout', handleButtonMouseOut);
        rightButton.removeEventListener('mouseover', handleButtonMouseOver);
        rightButton.removeEventListener('mouseout', handleButtonMouseOut);
      }
    };
  }, [carouselId, leftButtonDataAttrKey, rightButtonDataAttrKey]);

  return (
    <div className="relative w-full">
      <div
        data-carousel-track={carouselId}
        ref={trackRef}
        className="group h-full whitespace-nowrap overflow-x-scroll scrollbar-hide snap-x snap-mandatory" // scrollbar-hide applied
        style={{ scrollBehavior: 'smooth' }}
        tabIndex={0}
      >
        <div className="flex gap-2 h-full items-center">
          {images.map((image, index) =>
            image && (
              <img
                key={`${carouselId}-image-${index}`}
                src={image}
                alt={`${imageAltText} ${index + 1}`}
                className={`snap-always snap-center ${imageClasses}`}
                style={{ maxHeight: '80vh', maxWidth: '80vw' }}
              />
            )
          )}
        </div>
      </div>

      <div className="absolute inset-y-0 w-full lg:flex justify-between pointer-events-none hidden">
        <button
          {...{[leftButtonDataAttrKey]: ''}}
          className={`absolute left-0 top-0 bottom-0 w-1/2 text-white transition-opacity pointer-events-auto cursor-pointer ${cursorStyles.arrowLeft}`} // Applied cursorStyles.arrowLeft
          aria-label="Previous image"
        ></button>
        <button
          {...{[rightButtonDataAttrKey]: ''}}
          className={`absolute right-0 top-0 bottom-0 w-1/2 text-white transition-opacity pointer-events-auto cursor-pointer ${cursorStyles.arrowRight}`} // Applied cursorStyles.arrowRight
          aria-label="Next image"
        ></button>
      </div>
    </div>
  );
};

export default Carousel;
