// lib/animations.ts

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollSmoother } from 'gsap/ScrollSmoother';
import { TextPlugin } from 'gsap/TextPlugin';

/**
 * Initializes GSAP with default configurations and registers common plugins.
 * Must be called before any other GSAP operations that rely on these plugins or configs.
 * @param {object} [configOptions] - Optional GSAP configuration options to override defaults.
 */
export function initGSAP(configOptions?: object): void {
  const defaultConfig = {
    trialWarn: false,
    nullTargetWarn: false,
    // Add other global GSAP configs if necessary from Transition.astro, e.g.
    // nullTarget: null, // This was in Transition.astro, but nullTargetWarn:false usually covers it.
                       // Re-evaluate if specific nullTarget behavior is needed globally.
  };

  gsap.config({ ...defaultConfig, ...configOptions });

  // Register GSAP plugins
  // Ensure these are installed in your project (e.g., npm install gsap)
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, TextPlugin);

  console.log("GSAP initialized and plugins registered.");
}

/**
 * Initializes and returns a GSAP ScrollSmoother instance.
 * Ensure GSAP and ScrollSmoother are initialized via `initGSAP()` before calling this.
 *
 * @param {object} [smootherOptions] - Optional ScrollSmoother configuration options to override defaults.
 * @param {Element | string} [scrollWrapperSelector='body'] - The scrollable wrapper element. Defaults to 'body'.
 * @param {Element | string} [scrollContentSelector='body > div:first-of-type'] - The content element. Defaults to the first div child of body.
 *                                                                             Adjust these selectors if your page structure is different.
 * @returns {ScrollSmoother | null} The created ScrollSmoother instance, or null if creation fails.
 */
export function initScrollSmoother(
  smootherOptions?: object,
  scrollWrapperSelector: Element | string = 'body', // Common default
  scrollContentSelector: Element | string = '#smooth-content' // Common default, ensure this ID exists on content wrapper
): ScrollSmoother | null {
  try {
    // Ensure the selectors resolve to actual elements, especially if defaults are too generic
    const wrapper = typeof scrollWrapperSelector === 'string' ? document.querySelector(scrollWrapperSelector) : scrollWrapperSelector;
    const content = typeof scrollContentSelector === 'string' ? document.querySelector(scrollContentSelector) : scrollContentSelector;

    if (!wrapper) {
        console.warn(`ScrollSmoother wrapper element ('${scrollWrapperSelector}') not found. ScrollSmoother not initialized.`);
        return null;
    }
    if (!content) {
        console.warn(`ScrollSmoother content element ('${scrollContentSelector}') not found. ScrollSmoother not initialized.`);
        return null;
    }


    const defaultSmootherOptions = {
      smooth: 2,
      speed: 2,
      effects: true,
      normalizeScroll: false, // As seen in Transition.astro for ScrollSmoother
      smoothTouch: 0.1,
      // trialWarn: false, // Already in gsap.config()
      wrapper: wrapper, // Default wrapper
      content: content, // Default content
    };

    const finalOptions = { ...defaultSmootherOptions, ...smootherOptions };

    // The separate ScrollTrigger.create({ preventDefault: true, normalizeScroll: true }) from Transition.astro
    // might be for other independent scroll triggers, or an older pattern.
    // ScrollSmoother's own normalizeScroll should handle the main scrolling body if set.
    // If issues arise with other ScrollTriggers, that line might need to be called separately.
    // For now, we rely on ScrollSmoother's own normalization if `finalOptions.normalizeScroll` is true.

    const smoother = ScrollSmoother.create(finalOptions);

    if (smoother) {
      console.log("ScrollSmoother initialized.", smoother);
    } else {
      console.warn("ScrollSmoother.create() did not return an instance.");
    }
    return smoother;

  } catch (error) {
    console.error("Error initializing ScrollSmoother:", error);
    return null;
  }
}

/**
 * Sets up a page load animation where a "curtain" element fades out.
 * @param {string} curtainSelector - The CSS selector for the curtain element.
 * @param {object} [animationOptions] - Optional GSAP animation options (e.g., duration, delay).
 */
export function setupPageLoadAnimation(
  curtainSelector: string,
  animationOptions?: gsap.TweenVars
): void {
  if (!document.querySelector(curtainSelector)) {
    console.warn(`Page load animation: Curtain element ('${curtainSelector}') not found.`);
    return;
  }

  const defaultOptions: gsap.TweenVars = {
    opacity: 0,
    duration: 0.3,
    delay: 0.1,
  };
  gsap.to(curtainSelector, { ...defaultOptions, ...animationOptions });
  console.log(`Page load animation setup for '${curtainSelector}'.`);
}

/**
 * Sets up link hijacking for page transitions.
 * When a local link is clicked, it animates a "curtain" in, then navigates.
 * @param {string} curtainSelector - The CSS selector for the curtain element.
 * @param {(link: HTMLAnchorElement) => void} [preloaderUpdateCallback] - Optional callback to update preloader content.
 * @param {gsap.TweenVars} [animationOptions] - Optional GSAP animation options for the curtain fade-in.
 */
export function setupLinkHijackTransitions(
  curtainSelector: string,
  preloaderUpdateCallback?: (link: HTMLAnchorElement) => void,
  animationOptions?: gsap.TweenVars
): void {
  if (!document.querySelector(curtainSelector)) {
    console.warn(`Link hijack transitions: Curtain element ('${curtainSelector}') not found.`);
    return;
  }

  document.addEventListener("click", (event: MouseEvent) => {
    const link = (event.target as Element).closest("a");

    if (!link) return;

    const href = link.getAttribute("href");
    const target = link.getAttribute("target");

    // Ignore external links, links opening in a new tab, mailto, tel, and anchor links on the same page
    if (!href || target === "_blank" || href.startsWith("mailto:") || href.startsWith("tel:") || (href.startsWith("#") && link.pathname === window.location.pathname) ) {
      return;
    }

    // Also ignore if the link is to the current page (including query params or hash)
    if (link.href === window.location.href) {
        return;
    }

    event.preventDefault();

    if (preloaderUpdateCallback) {
      try {
        preloaderUpdateCallback(link);
      } catch (e) {
        console.error("Error in preloaderUpdateCallback:", e);
      }
    }

    const defaultAnimationOptions: gsap.TweenVars = {
      opacity: 1,
      duration: 0.3,
      onComplete: () => {
        window.location.href = link.href;
      },
    };

    gsap.to(curtainSelector, { ...defaultAnimationOptions, ...animationOptions });
  });
  console.log(`Link hijack transitions setup for '${curtainSelector}'.`);
}

/**
 * Creates a GSAP animation with a ScrollTrigger.
 *
 * @param {string | Element | Element[]} target - The target element(s) for the animation.
 * @param {gsap.TweenVars} animationVars - GSAP animation variables (e.g., { opacity: 1, x: 100 }).
 *                                        Do not include the 'scrollTrigger' property here.
 * @param {gsap.plugins.ScrollTrigger.Vars} triggerVars - ScrollTrigger configuration object.
 * @returns {ScrollTrigger | null} The created ScrollTrigger instance, or null if target is not found or an error occurs.
 */
export function createScrollTriggerAnimation(
  target: string | Element | Element[] | null,
  animationVars: gsap.TweenVars,
  triggerVars: gsap.plugins.ScrollTrigger.Vars
): ScrollTrigger | null {
  if (!target) {
    console.warn("createScrollTriggerAnimation: Target is null or undefined.");
    return null;
  }

  let targetElements: Element[] = [];

  if (typeof target === 'string') {
    const foundElements = document.querySelectorAll(target);
    if (foundElements.length === 0) {
      console.warn(`createScrollTriggerAnimation: No elements found for selector '${target}'.`);
      return null;
    }
    targetElements = Array.from(foundElements);
  } else if (target instanceof Element) {
    targetElements = [target];
  } else if (Array.isArray(target) && target.every(el => el instanceof Element)) {
    targetElements = target as Element[];
  } else {
    console.warn("createScrollTriggerAnimation: Invalid target type. Must be a selector string, an Element, or an array of Elements.");
    return null;
  }

  if(targetElements.length === 0 && !(typeof target === 'string' && document.querySelectorAll(target).length > 0) ) {
    // This condition might be redundant due to earlier checks, but ensures robustness
    // if target was an empty array initially.
    console.warn("createScrollTriggerAnimation: Target resolved to an empty set of elements.");
    return null;
  }

  try {
    // Check if a trigger element is specified in triggerVars, and if it exists
    if (typeof triggerVars.trigger === 'string') {
      if (!document.querySelector(triggerVars.trigger)) {
        console.warn(`createScrollTriggerAnimation: Trigger element ('${triggerVars.trigger}') not found for target ('${target}'). Animation might not behave as expected.`);
        // Depending on desired strictness, could return null here.
        // For now, allow GSAP to handle it (it might default to viewport).
      }
    } else if (triggerVars.trigger instanceof Element && !document.body.contains(triggerVars.trigger)) {
        console.warn(`createScrollTriggerAnimation: Trigger element provided is not in the DOM.`);
    }


    const animation = gsap.to(targetElements.length === 1 ? targetElements[0] : targetElements, {
      ...animationVars,
      scrollTrigger: triggerVars,
    });

    // Return the ScrollTrigger instance associated with the first target if multiple, or the animation's ST instance
    // GSAP's .to() returns a Tween. The ScrollTrigger instance is typically found on animation.scrollTrigger
    const stInstance = animation.scrollTrigger;

    if (stInstance) {
        console.log("ScrollTrigger animation created for target:", targetElements, "ScrollTrigger instance:", stInstance);
    } else {
        // This case might occur if ScrollTrigger isn't properly registered or if the animation is immediate and ST is disabled/killed.
        console.warn("ScrollTrigger animation was set up for target:", targetElements, "but no ScrollTrigger instance was found on the animation. This might indicate an issue or an animation that doesn't use ScrollTrigger (e.g. duration 0).");
    }
    return stInstance || null;

  } catch (error) {
    console.error("Error creating ScrollTrigger animation:", error);
    return null;
  }
}

// Placeholder for other animation functions
