import React, { useRef } from 'react';
import type { Locale } from '../../lib/i18n';
import { useMobileMenu } from '../../hooks/useMobileMenu';
import Clock from './Clock';
import { getTranslation } from '../../lib/i18n';
import ArrowIcon from './icons/ArrowIcon';
import LinkedInIcon from './icons/LinkedInIcon';
import InstagramIcon from './icons/InstagramIcon';
import './Navigation.css'; // Import the CSS file

export interface NavLinkItem {
  titleKey: string;
  title?: string;
  path: string;
  target?: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface NavigationProps {
  locale: Locale;
  currentPath: string;
  navLinks: NavLinkItem[];
  socialLinks: NavLinkItem[];
  letsMeetLink: NavLinkItem;
  siteTitle?: string;
  softwareAndDesignTextKey?: string;
  locationTextKey?: string;
  menuTextKey?: string;
  closeTextKey?: string;
}

const Navigation: React.FC<NavigationProps> = ({
  locale,
  currentPath,
  navLinks,
  socialLinks,
  letsMeetLink,
  siteTitle = "Other Dev®",
  softwareAndDesignTextKey = "nav.software-and-design",
  locationTextKey = "nav.location",
  menuTextKey = "nav.menu",
  closeTextKey = "nav.close",
}) => {
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonMenuTextRef = useRef<HTMLSpanElement>(null);
  const menuButtonCloseTextRef = useRef<HTMLSpanElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);

  const { isOpen, toggleMenu } = useMobileMenu({
    menuPanelRef,
    menuButtonRef,
    menuTextRef: menuButtonMenuTextRef,
    closeTextRef: menuButtonCloseTextRef,
    menuContentRef,
  });

  const t = (key: string, defaultValue?: string) => getTranslation(locale, key as any) || defaultValue || key;

  const handleMobileLinkClick = () => {
    if (isOpen) {
      toggleMenu();
    }
  };

  // Determine text color class based on currentPath
  // Original Astro logic: if (['/about/', '/experties/', '/', '/about', '/experties'].includes(Astro.site.pathname)) textColor = '--color-stone-400';
  // Astro.site.pathname for '/' would be '/', for '/de/' it would be '/de/'
  // currentPath prop here would be the path without locale prefix e.g. 'about' or 'work' or '' for homepage
  // Astro's Astro.site.pathname seems to include the base path and locale.
  // For this React component, currentPath is likely relative to locale.
  // We need a robust way to determine if it's a "special color" page.
  // Let's assume currentPath is like 'about', 'expertise', or '' for root of the current locale.
  const isSpecialColorPage = ['about', 'expertise', ''].includes(currentPath) ||
                             [`/${locale}/about`, `/${locale}/expertise`, `/${locale}`].includes(currentPath) ||
                             [`/about/`, `/expertise/`, `/`].includes(currentPath); // Matching original Astro logic more closely

  const navTextColorClass = isSpecialColorPage ? 'nav-text-color-default' : 'nav-text-color-inverted';

  return (
    <>
      {/* Mobile Navigation Bar */}
      <nav
        aria-label={t("nav.mobileAriaLabel", "Mobile Navigation")}
        className={`lg:hidden flex justify-between items-center w-full px-4 pt-4 text-sm fixed top-0 z-50 header-blend-mode ${navTextColorClass}`}
      >
        <div>
          <a href={t('nav.homeLink', `/${locale}/`)} onClick={handleMobileLinkClick} className="w-full flex-1/2" aria-label={`${siteTitle} Home`}>
            {siteTitle}
          </a>
        </div>
        <button
          id="mobile-nav-toggle"
          ref={menuButtonRef}
          onClick={toggleMenu}
          aria-expanded={isOpen}
          aria-controls="mobile-menu-panel"
          className="mobile-navigation-trigger flex-1/2 p-2 -mr-2 w-full text-right"
        >
          <span className="sr-only">{t(menuTextKey, "Menu")}</span>
          <div className="relative h-6 overflow-hidden">
            <span ref={menuButtonMenuTextRef} className="menu-text block">
              {t(menuTextKey, "Menu")}
            </span>
            <span ref={menuButtonCloseTextRef} className="close-text absolute top-0 right-0">
              {t(closeTextKey, "Close")}
            </span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu Panel */}
      <div
        id="mobile-menu-panel"
        ref={menuPanelRef}
        className="fixed inset-0 z-40 bg-stone-300 text-black lg:hidden will-change-transform" // text-black for content
        aria-hidden={!isOpen}
      >
        <div ref={menuContentRef} className="pt-24 h-full overflow-y-auto">
          <ul className="pb-20" aria-label={t("nav.mobileAriaLabelLinks", "Mobile Navigation Links")}>
            {navLinks.map((item) => (
              <li className="border-b border-black" key={item.path}>
                <a
                  href={item.path}
                  className="block py-4 px-4 text-lg hover:bg-stone-600/10 transition-colors duration-200"
                  onClick={handleMobileLinkClick}
                >
                  {item.titleKey ? t(item.titleKey) : item.title}
                </a>
              </li>
            ))}
            <li className="border-b border-black border-dashed">
              <a
                href={letsMeetLink.path}
                target="_blank"
                rel="noopener noreferrer"
                className="block py-4 px-4 text-lg hover:bg-stone-600/10 transition-colors duration-200"
                onClick={handleMobileLinkClick}
              >
                {letsMeetLink.titleKey ? t(letsMeetLink.titleKey) : letsMeetLink.title}
                {letsMeetLink.icon && <letsMeetLink.icon className="inline-block w-4 h-4 ml-2" />}
              </a>
            </li>
            <li className="border-b border-black border-dashed">
              <div className="block py-4 px-4 text-lg">
                <span>{t(softwareAndDesignTextKey, "Software + Design")}</span>
              </div>
            </li>
            <li className="border-b border-black border-dashed">
              <div className="flex items-center gap-2 py-4 px-4 text-lg">
                <Clock />
                <span>{t(locationTextKey, "Karachi, Pakistan")}</span>
              </div>
            </li>
          </ul>
          <div className="fixed px-4 bottom-0 left-0 w-full bg-stone-400/90 backdrop-blur-sm flex justify-between items-center py-4 border-t border-black">
            {socialLinks.map(link => (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                aria-label={`${link.titleKey ? t(link.titleKey) : link.title} (${t('nav.opensNewTab', 'opens in a new tab')})`}
              >
                {link.icon && <link.icon className="w-4 h-4 inline-block" />}
                <span>{link.titleKey ? t(link.titleKey) : link.title}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav
        aria-label={t("nav.desktopAriaLabel", "Primary Navigation")}
        className={`hidden lg:block w-full pt-4 px-4 text-lg header-blend-mode fixed top-0 z-50 ${navTextColorClass}`}
      >
        <div className="flex justify-between items-center lg:container mx-auto">
          <div className="font-bold">
            <a
              href={t('nav.homeLink', `/${locale}/`)}
              className={`dynamic-underline dynamic-underline-left ${navTextColorClass}`}
              aria-label={`${siteTitle} Home`}
            >
              {siteTitle}
            </a>
          </div>
          <div>
            <p>{t(softwareAndDesignTextKey, "Software + Design")}</p>
          </div>
          <div className="flex items-center gap-2">
            <Clock />
            <span>{t(locationTextKey, "Karachi, Pakistan")}</span>
          </div>
          <ul className="flex gap-6">
            {navLinks.map((item) => (
              <li key={item.path}>
                <a
                  href={item.path}
                  className={`dynamic-underline dynamic-underline-left hover:opacity-75 transition-all ${navTextColorClass}`}
                >
                  {item.titleKey ? t(item.titleKey) : item.title}
                </a>
              </li>
            ))}
          </ul>
          <ul className="flex gap-4 items-center">
            {[letsMeetLink, ...socialLinks].map(link => (
              <li key={link.path}>
                <a
                  href={link.path}
                  target={link.target || "_blank"}
                  rel={link.target === '_blank' || !link.target ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-2 text-sm hover:opacity-80 transition-opacity"
                  aria-label={`${link.titleKey ? t(link.titleKey) : link.title}${ (link.target === '_blank' || !link.target) ? ` (${t('nav.opensNewTab', 'opens in a new tab')})` : ''}`}
                >
                  {link.icon && <link.icon className={link.titleKey === letsMeetLink.titleKey ? '' : 'w-4 h-4 inline-block'} />}
                  <span className="font-medium">{link.titleKey ? t(link.titleKey) : link.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
