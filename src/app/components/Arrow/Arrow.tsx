'use client';

import React, { useEffect, useState } from 'react';

export default function Arrow({
  width,
  height,
  fill,
}: {
  width?: number;
  height?: number;
  fill?: string;
}) {
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsMobile(true);
    }
  }, []);

  const arrowSize = isMobile ? 8 : 12;

  return (
    <svg
      width={`${width ? width : arrowSize}`}
      height={`${height ? height : arrowSize}`}
      viewBox="0 0 12 13"
      fill={fill ? fill : 'white'}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.59284 1.72295C2.5928 1.7072 2.77321 1.4061 2.99375 1.05393C3.21432 0.701725 3.40794 0.420523 3.42398 0.428928C3.44002 0.437406 3.66843 0.60654 3.93153 0.804844C4.4599 1.20303 5.1584 1.58635 5.66509 1.75625C7.24428 2.28566 8.88412 2.042 10.2078 1.08123L10.5449 0.836582L11.0106 1.30232L11.4764 1.76809L11.257 2.07595C9.81956 4.09289 9.98495 6.51035 11.7069 8.65362C11.8194 8.79356 11.9062 8.91322 11.8998 8.91954C11.8416 8.9778 10.6438 9.71039 10.6071 9.71021C10.5806 9.71009 10.4721 9.58196 10.3661 9.4255C9.19226 7.69308 8.80954 5.71093 9.35291 4.17874L9.48325 3.8112L4.35487 8.921L1.11199 12.1521L0.16941 11.2095L3.40882 7.9583L8.50651 2.84196L8.033 2.997C6.80462 3.39925 5.34885 3.23449 3.88112 2.52703C3.46296 2.32551 2.59312 1.78257 2.59284 1.72295Z"
        fill={fill ? fill : 'white'}
      />
    </svg>
  );
}
