import type { ReactNode } from 'react';

/* The About page's content: the tech-stack rows (one per kind of tool)
   and the testimonials. Rendered by components/pages/AboutClient.tsx. */

export interface Tool { name: string; icon: ReactNode }
export interface Orbit { key: string; name: string; blurb: string; c: string; tools: Tool[] }

export const ORBITS: Orbit[] = [
  {
    key: 'design', name: 'Designing', c: '#bc6fff',
    blurb: 'From research and wireframes to motion and 3D.',
    tools: [
      { name: 'Figma', icon: (
        <svg viewBox="0 0 24 24" fill="none">
        <rect x="8" y="2" width="8" height="6" rx="3" fill="#F24E1E" />
        <rect x="8" y="9" width="8" height="6" rx="3" fill="#A259FF" />
        <rect x="8" y="16" width="8" height="6" rx="3" fill="#0ACF83" />
        <rect x="2" y="2" width="8" height="6" rx="3" fill="#FF7262" />
        <circle cx="18" cy="12" r="3" fill="#1ABCFE" />
        </svg>
      ) },
      { name: 'Photoshop', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="4" fill="#001E36" /><text x="4.5" y="20"
        fontFamily="Arial" fontSize="13" fontWeight="800" fill="#31A8FF">Ps</text>
        </svg>
      ) },
      { name: 'Illustrator', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="4" fill="#330000" /><text x="4" y="20"
        fontFamily="Arial" fontSize="13" fontWeight="800" fill="#FF9A00">Ai</text>
        </svg>
      ) },
      { name: 'After Effects', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="4" fill="#00005B" /><text x="3.5" y="20"
        fontFamily="Arial" fontSize="13" fontWeight="800" fill="#9999FF">Ae</text>
        </svg>
      ) },
      { name: 'Spline', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="10" stroke="rgba(90,200,250,0.4)" strokeWidth="1.2" />
        <path d="M9 16c0-2.8 2.2-5 5-5s5 2.2 5 5" stroke="#5ac8fa" strokeWidth="1.8"
        strokeLinecap="round" />
        <circle cx="14" cy="10" r="2" fill="#5ac8fa" />
        </svg>
      ) },
      { name: 'Framer', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <path d="M7 4h14v7H14L7 4z" fill="#0055FF" opacity="0.9" />
        <path d="M7 11h7l7 7H7v-7z" fill="#0055FF" opacity="0.6" />
        <path d="M7 18h7l-7 7v-7z" fill="#0055FF" opacity="0.35" />
        </svg>
      ) },
    ],
  },
  {
    key: 'code', name: 'Programming', c: '#5ce0ff',
    blurb: 'Front ends, games and the servers behind them.',
    tools: [
      { name: 'TypeScript', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="3" fill="#3178C6" /><text x="10" y="22"
        fontFamily="Arial" fontSize="11" fontWeight="800" fill="#fff">TS</text>
        </svg>
      ) },
      { name: 'Next.js', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <circle cx="14" cy="14" r="12" fill="#000" stroke="rgba(255,255,255,0.55)" strokeWidth="1" />
        <path d="M10 19V9l9 11.5" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M18 9v6" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      ) },
      { name: 'Three.js', icon: (
        <svg viewBox="0 0 28 28" fill="none" stroke="#fff" strokeWidth="1.3" strokeLinejoin="round">
        <path d="M4 24L9 4l15 15z" />
        <path d="M6.5 14L16.5 11.5 14 21.5z" />
        <path d="M9 4l7.5 7.5M4 24l2.5-10M24 19l-10 2.5" />
        </svg>
      ) },
      { name: 'Unity', icon: (
        <svg viewBox="0 0 28 28" fill="none" stroke="#fff" strokeWidth="1.6" strokeLinejoin="round">
        <path d="M14 3l9.5 5.5v11L14 25l-9.5-5.5v-11z" />
        <path d="M14 14l9.5-5.5M14 14v11M14 14L4.5 8.5" />
        </svg>
      ) },
      { name: 'C#', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <path d="M14 2l10.4 6v12L14 26 3.6 20V8z" fill="#68217A" />
        <text x="6.6" y="18.5" fontFamily="Arial" fontSize="10" fontWeight="800" fill="#fff">C#</text>
        </svg>
      ) },
      { name: 'Node.js', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <path d="M14 2l10.4 6v12L14 26 3.6 20V8z" fill="#339933" />
        <text x="9.6" y="18.5" fontFamily="Arial" fontSize="11" fontWeight="800" fill="#fff">N</text>
        </svg>
      ) },
    ],
  },
  {
    key: 'ai', name: 'AI Tools', c: '#6dff8a',
    blurb: 'The co-pilots I plan, write and render with.',
    tools: [
      { name: 'Claude', icon: (
        <svg viewBox="0 0 512 509.64" xmlns="http://www.w3.org/2000/svg">
        <path fill="#D77655"
        d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.612-115.613 115.612H115.612C52.026 509.639 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z" />
        <path fill="#FCF2EE" fillRule="nonzero"
        d="M142.27 316.619l73.655-41.326 1.238-3.589-1.238-1.996-3.589-.001-12.31-.759-42.084-1.138-36.498-1.516-35.361-1.896-8.897-1.895-8.34-10.995.859-5.484 7.482-5.03 10.717.935 23.683 1.617 35.537 2.452 25.782 1.517 38.193 3.968h6.064l.86-2.451-2.073-1.517-1.618-1.517-36.776-24.922-39.81-26.338-20.852-15.166-11.273-7.683-5.687-7.204-2.451-15.721 10.237-11.273 13.75.935 3.513.936 13.928 10.716 29.749 23.027 38.848 28.612 5.687 4.727 2.275-1.617.278-1.138-2.553-4.271-21.13-38.193-22.546-38.848-10.035-16.101-2.654-9.655c-.935-3.968-1.617-7.304-1.617-11.374l11.652-15.823 6.445-2.073 15.545 2.073 6.547 5.687 9.655 22.092 15.646 34.78 24.265 47.291 7.103 14.028 3.791 12.992 1.416 3.968 2.449-.001v-2.275l1.997-26.641 3.69-32.707 3.589-42.084 1.239-11.854 5.863-14.206 11.652-7.683 9.099 4.348 7.482 10.716-1.036 6.926-4.449 28.915-8.72 45.294-5.687 30.331h3.313l3.792-3.791 15.342-20.372 25.782-32.227 11.374-12.789 13.27-14.129 8.517-6.724 16.1-.001 11.854 17.617-5.307 18.199-16.581 21.029-13.75 17.819-19.716 26.54-12.309 21.231 1.138 1.694 2.932-.278 44.536-9.479 24.062-4.347 28.714-4.928 12.992 6.066 1.416 6.167-5.106 12.613-30.71 7.583-36.018 7.204-53.636 12.689-.657.48.758.935 24.164 2.275 10.337.556h25.301l47.114 3.514 12.309 8.139 7.381 9.959-1.238 7.583-18.957 9.655-25.579-6.066-59.702-14.205-20.474-5.106-2.83-.001v1.694l17.061 16.682 31.266 28.233 39.152 36.397 1.997 8.999-5.03 7.102-5.307-.758-34.401-25.883-13.27-11.651-30.053-25.302-1.996-.001v2.654l6.926 10.136 36.574 54.975 1.895 16.859-2.653 5.485-9.479 3.311-10.414-1.895-21.408-30.054-22.092-33.844-17.819-30.331-2.173 1.238-10.515 113.261-4.929 5.788-11.374 4.348-9.478-7.204-5.03-11.652 5.03-23.027 6.066-30.052 4.928-23.886 4.449-29.674 2.654-9.858-.177-.657-2.173.278-22.37 30.71-34.021 45.977-26.919 28.815-6.445 2.553-11.173-5.789 1.037-10.337 6.243-9.2 37.257-47.392 22.47-29.371 14.508-16.961-.101-2.451h-.859l-98.954 64.251-17.618 2.275-7.583-7.103.936-11.652 3.589-3.791 29.749-20.474-.101.102.024.101z" />
        </svg>
      ) },
      { name: 'ChatGPT', icon: (
        <svg viewBox="0 0 512 509.639" xmlns="http://www.w3.org/2000/svg">
        <path fill="#10A37F"
        d="M115.612 0h280.775C459.974 0 512 52.026 512 115.612v278.415c0 63.587-52.026 115.613-115.613 115.613H115.612C52.026 509.64 0 457.614 0 394.027V115.612C0 52.026 52.026 0 115.612 0z" />
        <path fill="#fff" fillRule="nonzero"
        d="M412.037 221.764a90.834 90.834 0 004.648-28.67 90.79 90.79 0 00-12.443-45.87c-16.37-28.496-46.738-46.089-79.605-46.089-6.466 0-12.943.683-19.264 2.04a90.765 90.765 0 00-67.881-30.515h-.576c-.059.002-.149.002-.216.002-39.807 0-75.108 25.686-87.346 63.554-25.626 5.239-47.748 21.31-60.682 44.03a91.873 91.873 0 00-12.407 46.077 91.833 91.833 0 0023.694 61.553 90.802 90.802 0 00-4.649 28.67 90.804 90.804 0 0012.442 45.87c16.369 28.504 46.74 46.087 79.61 46.087a91.81 91.81 0 0019.253-2.04 90.783 90.783 0 0067.887 30.516h.576l.234-.001c39.829 0 75.119-25.686 87.357-63.588 25.626-5.242 47.748-21.312 60.682-44.033a91.718 91.718 0 0012.383-46.035 91.83 91.83 0 00-23.693-61.553l-.004-.005z" />
        </svg>
      ) },
      { name: 'Gemini', icon: (
        <svg fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 65 65">
        <mask id="maskme_g4" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="65"
        height="65">
        <path
        d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
        fill="#000" />
        <path
        d="M32.447 0c.68 0 1.273.465 1.439 1.125a38.904 38.904 0 001.999 5.905c2.152 5 5.105 9.376 8.854 13.125 3.751 3.75 8.126 6.703 13.125 8.855a38.98 38.98 0 005.906 1.999c.66.166 1.124.758 1.124 1.438 0 .68-.464 1.273-1.125 1.439a38.902 38.902 0 00-5.905 1.999c-5 2.152-9.375 5.105-13.125 8.854-3.749 3.751-6.702 8.126-8.854 13.125a38.973 38.973 0 00-2 5.906 1.485 1.485 0 01-1.438 1.124c-.68 0-1.272-.464-1.438-1.125a38.913 38.913 0 00-2-5.905c-2.151-5-5.103-9.375-8.854-13.125-3.75-3.749-8.125-6.702-13.125-8.854a38.973 38.973 0 00-5.905-2A1.485 1.485 0 010 32.448c0-.68.465-1.272 1.125-1.438a38.903 38.903 0 005.905-2c5-2.151 9.376-5.104 13.125-8.854 3.75-3.749 6.703-8.125 8.855-13.125a38.972 38.972 0 001.999-5.905A1.485 1.485 0 0132.447 0z"
        fill="url(#gem_grad4)" />
        </mask>
        <g mask="url(#maskme_g4)">
        <g filter="url(#gf0d)">
        <path
        d="M-5.859 50.734c7.498 2.663 16.116-2.33 19.249-11.152 3.133-8.821-.406-18.131-7.904-20.794-7.498-2.663-16.116 2.33-19.25 11.151-3.132 8.822.407 18.132 7.905 20.795z"
        fill="#FFE432" />
        </g>
        <g filter="url(#gf1d)">
        <path
        d="M27.433 21.649c10.3 0 18.651-8.535 18.651-19.062 0-10.528-8.35-19.062-18.651-19.062S8.78-7.94 8.78 2.587c0 10.527 8.35 19.062 18.652 19.062z"
        fill="#FC413D" />
        </g>
        <g filter="url(#gf2d)">
        <path
        d="M20.184 82.608c10.753-.525 18.918-12.244 18.237-26.174-.68-13.93-9.95-24.797-20.703-24.271C6.965 32.689-1.2 44.407-.519 58.337c.681 13.93 9.95 24.797 20.703 24.271z"
        fill="#00B95C" />
        </g>
        <g filter="url(#gf3d)">
        <path
        d="M30.954 74.181c9.014-5.485 11.427-17.976 5.389-27.9-6.038-9.925-18.241-13.524-27.256-8.04-9.015 5.486-11.428 17.977-5.39 27.902 6.04 9.924 18.242 13.523 27.257 8.038z"
        fill="#00B95C" />
        </g>
        <g filter="url(#gf4d)">
        <path
        d="M67.391 42.993c10.132 0 18.346-7.91 18.346-17.666 0-9.757-8.214-17.667-18.346-17.667s-18.346 7.91-18.346 17.667c0 9.757 8.214 17.666 18.346 17.666z"
        fill="#3186FF" />
        </g>
        <g filter="url(#gf5d)">
        <path
        d="M34.74 51.43c11.135 7.656 25.896 5.524 32.968-4.764 7.073-10.287 3.779-24.832-7.357-32.488C49.215 6.52 34.455 8.654 27.382 18.94c-7.072 10.288-3.779 24.833 7.357 32.49z"
        fill="#3186FF" />
        </g>
        </g>
        <defs>
        <filter id="gf0d" x="-19.824" y="13.152" width="39.274" height="43.217" filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="2.46" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter id="gf1d" x="-15.001" y="-40.257" width="84.868" height="85.688"
        filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="11.891" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter id="gf2d" x="-20.776" y="11.927" width="79.454" height="90.916" filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter id="gf3d" x="-19.845" y="15.459" width="79.731" height="81.505" filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="10.109" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter id="gf4d" x="29.832" y="-11.552" width="75.117" height="73.758" filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="9.606" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <filter id="gf5d" x="8.107" y="-5.966" width="78.877" height="77.539" filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB">
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feBlend in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
        <feGaussianBlur stdDeviation="7.775" result="effect1_foregroundBlur_2001_67" />
        </filter>
        <linearGradient id="gem_grad4" x1="18.447" y1="43.42" x2="52.153" y2="15.004"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#4893FC" />
        <stop offset=".27" stopColor="#4893FC" />
        <stop offset=".777" stopColor="#969DFF" />
        <stop offset="1" stopColor="#BD99FE" />
        </linearGradient>
        </defs>
        </svg>
      ) },
      { name: 'Midjourney', icon: (
        <svg viewBox="0 0 512 428.862" xmlns="http://www.w3.org/2000/svg">
        <g fillRule="nonzero">
        <path fill="#fff"
        d="M355.945 299.241c-16.573-64.745-45.269-126.858-86.582-177.533-17.764-21.785-36.98-39.849-57.646-54.189-5.193-3.599-2.291-12.434 4.054-12.406 1.622 0 3.386.432 5.293 1.295C314.418 98.519 381.71 178.899 420.32 272.851a349.638 349.638 0 0111.311 31.81c2.034 6.701-4.212 12.776-10.457 8.806-16.076-10.2-37.487-10.954-57.589-8.422-3.756.47-6.758-2.332-7.64-5.804zm12.193 110.668c8.82 6.616 17.015 5.976 25.394-.156 9.437-6.915 19.158-14.018 29.164-21.312 8.607-6.274 18.865-8.493 29.307-5.662 4.088 1.119 8.821 3.671 14.198 7.654a2169.868 2169.868 0 0028.296 20.671c3.064 2.191 6.35 3.31 9.859 3.358 4.486.066 7.019 2.323 7.598 6.771a4.672 4.672 0 01-.285 2.391c-1.29 3.319-3.713 4.983-7.27 4.993-6.373.029-12.183-1.783-17.427-5.434a955.133 955.133 0 01-30.047-21.838c-7.867-5.933-16.517-7.981-24.854-1.949a12234.402 12234.402 0 00-31.326 22.706c-8.859 6.439-18.476 8.265-28.852 5.476-4.39-1.185-9.238-3.77-14.539-7.753-9.74-7.312-18.955-14.027-27.643-20.144-7.511-5.302-15.094-5.269-22.747.099-8.394 5.89-17.2 12.306-26.419 19.248-5.994 4.515-11.173 7.365-15.536 8.55-10.309 2.817-19.955.996-28.936-5.463a2286.243 2286.243 0 01-28.696-20.969c-9.858-7.313-17.512-6.972-27.215.085a18230.827 18230.827 0 00-29.065 21.197c-8.469 6.185-17.973 7.887-28.509 5.108-4.382-1.157-9.219-3.732-14.512-7.726-9.152-6.904-18.954-14.022-29.406-21.353-5.932-4.169-14.853-3.159-20.472.939a3834.273 3834.273 0 01-32.735 23.602c-5.444 3.879-11.798 5.728-19.064 5.548-2.93-.066-4.993-1.888-6.188-5.463a4.026 4.026 0 01-.185-1.75c.446-4.401 2.878-6.701 7.298-6.9 4.126-.18 7.607-1.304 10.443-3.371 10.66-7.768 21.074-15.332 31.241-22.692.256-.19.308-.427.156-.711a2580.357 2580.357 0 00-13.97-24.555c-3.016-5.208-.355-10.955 5.833-11.353a812261.421 812261.421 0 00428.289-26.931 45.868 45.868 0 015.578-.028c4.353.242 6.942 5.164 5.732 9.119-.397 1.319-1.583 2.864-3.556 4.638-31.81 28.61-69.298 51.23-108.819 70.151-.693.341-.73.745-.113 1.209zm-52.411-95.631c-34.675-13.59-71.246-20.273-109.715-20.045-45.411.271-89.115 13.359-126.204 37.771-7.383 4.852-15.279-4.41-9.688-10.456 3.158-3.423 5.989-6.924 8.493-10.499 22.421-32.048 35.685-68.188 39.792-108.42 6.957-68.245-14.952-133.303-48.527-192.599-1.38-2.433-.043-7.014 2.433-8.636C74.9-.303 77.542-.451 80.235.954 132.75 28.42 179.636 62.378 220.893 102.83c57.162 56.038 99.358 124.895 109.245 204.947.589 4.733-1.261 7.607-5.547 8.621-2.761.655-6.019-1.01-8.864-2.12z" />
        <path fill="#fff"
        d="M122.061 95.346c20.301 70.066 15.18 144.727-21.354 207.936a.213.213 0 00.285.298c33.394-15.488 68.638-23.346 105.731-23.573 36.648-.228 72.347 5.842 107.098 18.21a.428.428 0 00.569-.471c-13.942-87.804-72.186-161.698-139.207-216.84-24.83-20.438-51.458-38.938-79.882-55.497-.92-.541-1.133-.333-.64.626 11.116 21.539 20.249 44.642 27.4 69.311z" />
        <path fill="#760987"
        d="M182.56 281.26a262.32 262.32 0 0124.163-1.253c9.349-.058 18.637.294 27.862 1.056l62.574-44.117a309.283 309.283 0 00-12.875-27.409L182.56 281.26z" />
        <path fill="#E50304"
        d="M131.958 144.231a282.22 282.22 0 011.9 33.335l82.893-58.628A505.511 505.511 0 00196.079 99l-64.121 45.231z" />
        <path fill="#FF8E00"
        d="M133.858 177.524a266.664 266.664 0 01-2.593 36.528l104.809-74.126a460.913 460.913 0 00-19.258-20.921l-82.958 58.519z" />
        <path fill="#FFEC00"
        d="M131.302 213.792c-1.962 13.996-5.066 27.819-9.36 41.343l131.862-93.26a417.826 417.826 0 00-17.752-21.974l-104.75 73.891z" />
        <path fill="#008025"
        d="M122.01 254.921a243.15 243.15 0 01-21.303 48.361.213.213 0 00.285.298c.731-.339 1.462-.673 2.194-1.004l166.741-117.56a377.93 377.93 0 00-16.085-23.091L122.01 254.921z" />
        <path fill="#004DFF"
        d="M102.781 302.759c25.517-11.603 52.109-18.77 79.777-21.499l101.727-71.722a345.49 345.49 0 00-14.354-24.53l-167.15 117.751z" />
        <path fill="#fff"
        d="M53.319 365.636a.17.17 0 00-.1.241l8.934 15.608a1.198 1.198 0 001.238.582c8.953-1.508 17 .214 24.142 5.165 9.456 6.545 19.457 13.795 30.004 21.752 7.924 5.976 16.233 8.081 24.655 2.12 8.242-5.833 18.02-12.941 29.335-21.325 10.214-7.569 20.373-10.272 32.636-6.601 3.518 1.052 8.369 3.897 14.553 8.535a1359.088 1359.088 0 0025.295 18.467c9.162 6.529 17.072 5.562 25.892-1.095a957.364 957.364 0 0129.99-21.782c12.662-8.835 28.04-7.042 40.261 2.148a537.008 537.008 0 0013.145 9.603c.419.304.983.363 1.47.146 35.174-16.069 67.429-35.299 96.764-57.692 1.243-.949 1.086-1.37-.469-1.266-132.354 8.337-263.751 16.602-394.189 24.797a17.896 17.896 0 00-3.556.597zM369.005 290.236c14.369-1.423 29.492-.484 43.448 3.627a.4.4 0 00.483-.513c-27.841-75.556-75.386-144.213-140.7-191.19-1.185-.844-1.299-.715-.341.385 46.407 53.321 78.032 118.536 96.228 187.079.123.456.417.659.882.612z" />
        </g>
        </svg>
      ) },
      { name: 'Cursor', icon: (
        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="512" height="512" rx="122" fill="#000" />
        <path d="M255.428 423l148.991-83.5L255.428 256l-148.99 83.5 148.99 83.5z" fill="url(#cG1d)" />
        <path d="M404.419 339.5v-167L255.428 89v167l148.991 83.5z" fill="url(#cG2d)" />
        <path d="M255.428 89l-148.99 83.5v167l148.99-83.5V89z" fill="url(#cG3d)" />
        <path d="M404.419 172.5L255.428 423V256l148.991-83.5z" fill="#E4E4E4" />
        <path d="M404.419 172.5L255.428 256l-148.99-83.5h297.981z" fill="#fff" />
        <defs>
        <linearGradient id="cG1d" x1="255.428" y1="256" x2="255.428" y2="423"
        gradientUnits="userSpaceOnUse">
        <stop offset=".16" stopColor="#fff" stopOpacity=".39" />
        <stop offset=".658" stopColor="#fff" stopOpacity=".8" />
        </linearGradient>
        <linearGradient id="cG2d" x1="404.419" y1="173.015" x2="257.482" y2="261.497"
        gradientUnits="userSpaceOnUse">
        <stop offset=".182" stopColor="#fff" stopOpacity=".31" />
        <stop offset=".715" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="cG3d" x1="255.428" y1="89" x2="112.292" y2="342.802"
        gradientUnits="userSpaceOnUse">
        <stop stopColor="#fff" stopOpacity=".6" />
        <stop offset=".667" stopColor="#fff" stopOpacity=".22" />
        </linearGradient>
        </defs>
        </svg>
      ) },
      { name: 'Higgsfield', icon: (
        <svg viewBox="0 0 28 28" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="6" fill="#0B0B0B" stroke="rgba(209,254,23,0.55)" strokeWidth="1" />
        <path d="M9 8v12M19 8v12M9 14h10" stroke="#D1FE17" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      ) },
    ],
  },
];

export interface Testimonial { quote: string; name: string; role: string; img: string }
export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Thaanu Perera", role: "Software Engineer - Eyepax", img: '/Images/testimonials/thaanu.webp',
    quote: "I had the pleasure of working with Ruchira on several projects, and I can confidently say he’s one of the most talented and dedicated UI/UX designers I’ve encountered. His expertise in both UI/UX design and engineering is truly remarkable, allowing him to craft visually compelling interfaces that are not only user-friendly but also highly functional.",
  },
  {
    name: "Suraji Ekanayake", role: "UI/UX Designer - Freelance", img: '/Images/testimonials/suraji.webp',
    quote: "Working with Ruchira on UI/UX design projects has been an incredible experience. He has a great talent for blending the latest trends with user-friendly designs. Whenever we team up, we always create solutions that go above and beyond expectations. His creative vision combined with my design skills results in experiences that truly connect with users. I highly recommend Ruchira for any UI/UX work and his dedication and passion make him a fantastic addition to any team.",
  },
  {
    name: "Sandakelum Senevirathna", role: "Tech Lead - ZUSE Technologies", img: '/Images/testimonials/sandakelum.webp',
    quote: "To express my recommendation for this talented man joining the team of employers at Zuse Technologies, I am happy to write this recommendation for Mr. Ruchira Edirisinghe. Throughout the period of cooperation, Ruchira has shown himself as a skilled specialist who has excellent experience in developing effective user-oriented designs that often have even higher performance indicators than stated by the client. This has made him the most vital figure in the design team by balancing creativity with technical competence coupled with his understanding of user’s behavior.",
  },
  {
    name: "Janith Perera", role: "Software Engineer - Racedata", img: '/Images/testimonials/janith.webp',
    quote: "I had the pleasure of working with Ruchira at Zuse Technologies, where he handled UI/UX for our LMS projects. His work made a real difference in how students interacted with the platform from intuitive course navigation to features like progress tracking and badge systems for course completion. He has a strong eye for clean, user-friendly design and always delivers with quality and attention to detail. On top of that, he’s incredibly easy to collaborate with, making the whole development process smooth and efficient.",
  },
  {
    name: "Wenupa Mandinu", role: "Cyber Security Engineer - Freelance", img: '/Images/testimonials/wenupa.webp',
    quote: "Embarking on projects with Ruchira has been nothing short of a creative adventure in the world of UI/UX design. His ability to seamlessly merge cutting-edge trends with user-centric functionality is truly commendable. With Ruchira's expertise steering the ship, our collaborations have consistently delivered solutions that not only meet but exceed expectations. Together, we harmonize his innovative vision with my UI designing talents, crafting experiences that resonate with audiences on a profound level.",
  },
  {
    name: "Avishka Sooriyapperuma", role: "Senior DevOps Engineer - LSEG", img: '/Images/testimonials/avishka.webp',
    quote: "Having collaborated with Ruchira across multiple initiatives, I’ve seen firsthand his exceptional ability to bridge the gap between high-end design and functional engineering. He consistently delivers interfaces that are not only visually striking but also technically robust and intuitive. His deep understanding of user behavior and meticulous attention to detail make him a rare talent in UI/UX engineering and an invaluable asset to any team.",
  },
  {
    name: "Sandev Dulleva", role: "Software Engineer - ZUSE Technologies", img: '/Images/testimonials/sandev-dullewa.webp',
    quote: "I had the pleasure of working with Ruchira on a recent web development project, and I was truly impressed by his exceptional UI/UX design skills. Ruchira's ability to create visually appealing and user-friendly interfaces is unparalleled. He has a keen eye for detail, a deep understanding of user behavior, and a knack for turning complex concepts into intuitive designs. Ruchira's collaborative nature and dedication to delivering top-notch designs make him an invaluable asset to any team.",
  },
  {
    name: "Atheeque Hasan", role: "Senior Data Analyst - AiSCOUT", img: '/Images/testimonials/atheeque.webp',
    quote: "I had the pleasure of managing Ruchira directly during his time as a developer at TAKG, and I can confidently say that he is one of the most talented and dedicated professionals I have worked with. Ruchira consistently demonstrated exceptional technical skills, creativity, and a strong work ethic. His ability to tackle complex problems and deliver high-quality solutions was truly impressive. He played a pivotal role in UI/UX Development, where his contributions were instrumental in achieving our goals.",
  },
  {
    name: "Ramuthu Senanayake", role: "Associate Project Manager - Sysco LABS Sri Lanka", img: '/Images/testimonials/ramuthu.webp',
    quote: "I am pleased to recommend Ruchira for any role pertaining to UI/UX engineering. During our collaboration on website development projects, where I served as the project manager, he consistently demonstrated exceptional skills in crafting user-friendly interfaces. Ruchira possesses a remarkable talent for designing aesthetically pleasing and functional websites. His meticulous attention to detail ensures that every aspect of the user experience is carefully considered.",
  },
];
