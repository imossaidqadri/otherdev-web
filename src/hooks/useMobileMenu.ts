import { useState, useEffect, useCallback, RefObject } from 'react';
import { gsap } from 'gsap';

interface UseMobileMenuProps {
  menuPanelRef: RefObject<HTMLDivElement>;
  menuButtonRef: RefObject<HTMLButtonElement>; // For ARIA attributes
  menuTextRef: RefObject<HTMLSpanElement>;
  closeTextRef: RefObject<HTMLSpanElement>;
  menuContentRef: RefObject<HTMLDivElement>; // Content wrapper inside the panel
}

interface UseMobileMenuReturn {
  isOpen: boolean;
  toggleMenu: () => void;
}

export function useMobileMenu({
  menuPanelRef,
  menuButtonRef,
  menuTextRef,
  closeTextRef,
  menuContentRef,
}: UseMobileMenuProps): UseMobileMenuReturn {
  const [isOpen, setIsOpen] = useState(false);

  // Set initial animation states when component mounts and refs are available
  useEffect(() => {
    if (menuPanelRef.current && closeTextRef.current && menuContentRef.current && menuTextRef.current) {
      gsap.set(menuPanelRef.current, { y: '100%' }); // Start off-screen (bottom)
      gsap.set(closeTextRef.current, { y: 24 });    // Close text initially moved down (hidden)
      gsap.set(menuTextRef.current, {y: 0});        // Menu text initially visible
      gsap.set(menuContentRef.current, { opacity: 0 }); // Content initially transparent
    }
  }, [menuPanelRef, closeTextRef, menuContentRef, menuTextRef]); // Rerun if refs change (should not happen often)

  const toggleMenu = useCallback(() => {
    const currentlyOpen = !isOpen; // State will update after this, so use inverted value for animations

    if (menuPanelRef.current && menuButtonRef.current && menuTextRef.current && closeTextRef.current && menuContentRef.current) {
      // Toggle menu panel visibility
      gsap.to(menuPanelRef.current, {
        y: currentlyOpen ? '0%' : '100%', // Target 0% if opening, 100% if closing
        duration: 0.5,
        ease: "power3.inOut",
      });

      // Animate menu/close text swap
      gsap.to(menuTextRef.current, {
        y: currentlyOpen ? -24 : 0, // Menu text moves up if opening
        duration: 0.3,
        ease: "power2.inOut",
      });
      gsap.to(closeTextRef.current, {
        y: currentlyOpen ? 0 : 24, // Close text moves to visible if opening
        duration: 0.3,
        ease: "power2.inOut",
      });

      // Toggle content fade
      gsap.to(menuContentRef.current, {
        opacity: currentlyOpen ? 1 : 0,
        duration: 0.2,
        delay: currentlyOpen ? 0.3 : 0, // Delay fade-in until panel is mostly open
      });

      // Update accessibility attributes
      menuButtonRef.current.setAttribute('aria-expanded', String(currentlyOpen));
      menuPanelRef.current.setAttribute('aria-hidden', String(!currentlyOpen));

      setIsOpen(currentlyOpen);
    }
  }, [isOpen, menuPanelRef, menuButtonRef, menuTextRef, closeTextRef, menuContentRef]);

  return { isOpen, toggleMenu };
}
