import { ROUTES } from "./constants";

export interface NavigationItem {
  href: string;
  label: string;
}

export interface FooterSection {
  title: string;
  links: NavigationItem[];
}

export interface SocialLink {
  label: string;
  href: string;
}

export const MAIN_NAV: NavigationItem[] = [
  { href: ROUTES.HOME, label: "Trang chủ" },
  { href: ROUTES.COURSES, label: "Khóa học" },
  { href: ROUTES.DASHBOARD, label: "Bảng điều khiển" },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: "Nền tảng",
    links: [
      { href: ROUTES.COURSES, label: "Khóa học" },
      { href: ROUTES.DASHBOARD, label: "Bảng điều khiển" },
      { href: ROUTES.PROFILE, label: "Hồ sơ" },
    ],
  },
  {
    title: "Tài khoản",
    links: [
      { href: ROUTES.LOGIN, label: "Đăng nhập" },
      { href: ROUTES.REGISTER, label: "Đăng ký" },
    ],
  },
  {
    title: "Hỗ trợ",
    links: [
      { href: "/help", label: "Trợ giúp" },
      { href: "/contact", label: "Liên hệ" },
      { href: "/faq", label: "FAQ" },
    ],
  },
];

export const FOOTER_LEGAL_LINKS: NavigationItem[] = [
  { href: "/privacy", label: "Bảo mật" },
  { href: "/terms", label: "Điều khoản" },
  { href: "/cookies", label: "Cookies" },
];

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Facebook", href: "#" },
  { label: "Twitter", href: "#" },
  { label: "LinkedIn", href: "#" },
  { label: "GitHub", href: "#" },
];