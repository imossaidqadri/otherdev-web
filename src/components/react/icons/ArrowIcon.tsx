// src/components/react/icons/ArrowIcon.tsx
import React from 'react';

const ArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
 <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
   <g clipPath="url(#clip0_659_90_desktop_arrow)"> {/* Unique ID */}
     <path d="M27.9487 0L28 23.6922H23.8898V6.97433L2.87707 28L0 25.1281L21.0128 4.10256H4.31559V0H27.9487Z" fill="currentColor" />
   </g>
   <defs>
     <clipPath id="clip0_659_90_desktop_arrow"> {/* Unique ID */}
       <rect width="28" height="28" fill="currentColor" />
     </clipPath>
   </defs>
 </svg>
);

export default ArrowIcon;
