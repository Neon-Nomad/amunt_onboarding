import React from 'react';

// Fix: Add explicit type React.SVGProps<SVGSVGElement> to iconProps to fix type errors with SVG attributes.
const iconProps: React.SVGProps<SVGSVGElement> = {
  className: "w-6 h-6",
  strokeWidth: "2",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round"
};

const logoBase64 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAADECAMAAACY/a/EAAAAXVBMVEVHcEz///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////9/f38wKyTaAAAAB3RSTlMAIEAwYJ/P5+s/AAAACXBIWXMAACxLAAAsSwGlPZapAAAF1ElEQVR4nO2di3ajMAxFEzcFcaO4A0Sj3P+VXdJJQ0pIuAncQz+f1LRTzplLshxzHBERERERERERERERERERERERERERERERERERERERERERERERERERERGp4gdoW8v44dpr39Z356P7h8M4i5s5DeEl3Y5zT1/A/uT+w+Gg/vR6vSiVSoVCYRCRwgnxDCkKPAU2nQ7v57P5jLwniN8gTqdxGvYIu5k4TYw4w1+gTqf5vM4n8fJ5nU/nFTxBHkGf00U+n1/gL2gKPYvOk2h5+oJeoE6n+byuX+Llq2s0gZ/DLehgxG10Pj2gTqf5vK7n8vJ2fUGf0FVoIeJpNB89oE6n+byu6by8rWpAn9BV6CDiaTSPX6B+oPAi6jTq5+PltQb0BV2FDkacRvP4BboE6gT69/P7h2sL6Au6Co2MOI3m8Qv0CdR59Pfz2qfXF9A3dBUaGHEazfcXaB+o4ujfz2sfX15A39BV6CDEaTS/X6B9oE6gv5/X715fQN/QVWgYcRrN7xdYJ1Dn0d/P6x5fX0Df0FVoIsRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr9A+8J28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fYJ1AnUF/P697fH0BfUNXoQEiTqP5/QLrBOo8+vt5/QYtIXwDd9B1iNtofr/A+sJ28d2k+wja1HkE/f28fiPFt6/P69P57fPa5VbU69PpPOkX8DqdV36fX0Df0FVoIMRpNL9fEAPqDPr7efX2+QI+oavQAIjTaH6/IAaoM+jv5/Xb5wu4D12FxiJuo/n9gjigzqC/n9dvny/gPnQVGou4jeb3C+KAOoP+fl6/fb6A+9BVqDkRpy3tqVvQdOgc4v3lA31BV6HmRJy2jCdoGnQO8f7ygb6gq1BzkrO2hCdoGnQO8f7ygb6gq1DzkjM2YQtOg65R3g/0CV2FmpOcswlag65R3g/0CV2FmpOcsQhag65R3g/0CV2FmpOcswlag65R3g/0CV2FmpOcsQhag65R3g/0CV2FmpOcsQlaA6hT3g8K1AVag65JzliELQGUKf8HBKqBWlA1yRnbMkWgM4U/l6AqUAvKpjljU7QEUKe8HySoCtSCsmkaswlag6hT3g8SVAWqQVkkzdiELQHUKe+HACqBWlBGSRM3YQu0BlCnvB8KqAVqQRk1zdiFLQHUKe+HACqBWlA2SRO3YAu0BlCnvB8GqAVqQdkkzdyELdDq1B+7j4AiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIiIlLgP3o/eY1U/o1iAAAAAElFTkSuQmCC";

export const AmunetLogo: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`flex items-center space-x-2 ${className}`}>
    <img src={logoBase64} alt="Amunet AI Logo" className="h-10 w-auto" />
  </div>
);

export const CalendarIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);

export const SocialIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

export const NewsletterIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

export const MoneyIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <line x1="12" y1="1" x2="12" y2="23"></line>
    <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path>
  </svg>
);

export const TimeIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <circle cx="12" cy="12" r="10"></circle>
    <polyline points="12 6 12 12 16 14"></polyline>
  </svg>
);

export const BotIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
    </svg>
);

export const UserIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

export const CheckIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M20 6 9 17l-5-5"></path>
  </svg>
);

export const MessageSquareIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
    </svg>
);

export const XIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const BriefcaseIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
    </svg>
);

export const ServerIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect>
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect>
        <line x1="6" y1="6" x2="6.01" y2="6"></line>
        <line x1="6" y1="18" x2="6.01" y2="18"></line>
    </svg>
);

export const ZapIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
    </svg>
);

export const GoogleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.99,35.508,44,30.028,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);

export const AppleIcon: React.FC<{className?: string}> = ({className}) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "w-5 h-5"} viewBox="0 0 24 24">
        <path fill="currentColor" d="M19.3,4.31a5.6,5.6,0,0,0-4.2,2.15A5.83,5.83,0,0,0,12.4,4a6.23,6.23,0,0,0-5.8,3.25c-2.8,4.52-1,11.52,2,15.24a6.3,6.3,0,0,0,4.8,2.21,5.88,5.88,0,0,0,5-2.61,1.44,1.44,0,0,0-.2-2,1.35,1.35,0,0,0-1.6-.68,3.31,3.31,0,0,1-3.1.53,3.88,3.88,0,0,1-2.2-3.23c.2-.1.4-.2.6-.2a4.43,4.43,0,0,1,3.3,1.4,4.24,4.24,0,0,1,1.3,3,1.4,1.4,0,0,0,1.4,1.21,1.38,1.38,0,0,0,1.4-1.35c.1-4.71-2.5-7.82-2.6-8a5.54,5.54,0,0,1,3.8-5.32A.45.45,0,0,1,19.3,4.31Zm-2.6,1a3.64,3.64,0,0,0-2.6,3.46c0,2.29,1.8,3.37,3.6,3.37s2.5-1.55,2.5-2.81A4.27,4.27,0,0,0,16.7,5.33Z" />
    </svg>
);

export const MenuIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

export const QuoteIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className} stroke="none" fill="currentColor">
        <path d="M13 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.6-4.33 4.512l.001.023L20 22h-6.983c-1.353 0-2.54-1.096-2.565-2.449l-.002-.275zM0 14.725c0-5.141 3.892-10.519 10-11.725l.984 2.126c-2.215.835-4.163 3.6-4.33 4.512l.001.023L13 22H6.017c-1.353 0-2.54-1.096-2.565-2.449l-.002-.275z"/>
    </svg>
);

export const ChevronLeftIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <polyline points="15 18 9 12 15 6"></polyline>
    </svg>
);

export const ChevronRightIcon: React.FC<{className?: string}> = ({className}) => (
    <svg {...iconProps} className={className || iconProps.className}>
        <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
);

export const BrainIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v0A2.5 2.5 0 0 1 9.5 7h-3A2.5 2.5 0 0 1 4 4.5v0A2.5 2.5 0 0 1 6.5 2Z" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v0A2.5 2.5 0 0 0 14.5 7h3A2.5 2.5 0 0 0 20 4.5v0A2.5 2.5 0 0 0 17.5 2Z" />
    <path d="M5 8.5A2.5 2.5 0 0 1 7.5 11v0a2.5 2.5 0 0 1-2.5 2.5h-1A2.5 2.5 0 0 1 1.5 11v0A2.5 2.5 0 0 1 4 8.5Z" />
    <path d="M19 8.5a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0 2.5 2.5h1A2.5 2.5 0 0 0 22.5 11v0a2.5 2.5 0 0 0-2.5-2.5Z" />
    <path d="M9.5 15A2.5 2.5 0 0 1 12 17.5v0a2.5 2.5 0 0 1-2.5 2.5h-3A2.5 2.5 0 0 1 4 17.5v0A2.5 2.5 0 0 1 6.5 15Z" />
    <path d="M14.5 15a2.5 2.5 0 0 0-2.5 2.5v0a2.5 2.5 0 0 0 2.5 2.5h3A2.5 2.5 0 0 0 20 17.5v0a2.5 2.5 0 0 0-2.5-2.5Z" />
    <path d="M12 7.5a2.5 2.5 0 0 1 2.5 2.5v0a2.5 2.5 0 0 1-2.5 2.5h-0A2.5 2.5 0 0 1 9.5 10v0A2.5 2.5 0 0 1 12 7.5Z" />
  </svg>
);

export const LinkIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path>
    <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path>
  </svg>
);

export const BarChartIcon: React.FC<{className?: string}> = ({className}) => (
  <svg {...iconProps} className={className || iconProps.className}>
    <line x1="12" y1="20" x2="12" y2="10"></line>
    <line x1="18" y1="20" x2="18" y2="4"></line>
    <line x1="6" y1="20" x2="6" y2="16"></line>
  </svg>
);