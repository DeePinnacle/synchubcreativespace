import { X, ChevronLeft, ChevronRight, Maximize2, CheckCircle2, Info, Mail, MapPin, Phone, ArrowRight, Users, TrendingUp, Target, Award } from "lucide-react";
import type { ComponentType, SVGProps } from "react";
import { FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

export type AnyIcon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Static, module-level icon map — never build this inline or inside a
 * component body, or you'll hit serialization errors across the
 * server/client boundary (AGENT.md Rule 4).
 */
export const ICON_MAP: Record<string, AnyIcon> = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin,
  arrowRight: ArrowRight,
  checkCircle: CheckCircle2,
  info: Info,
  instagram: FaInstagram,
  xTwitter: FaXTwitter,
  whatsapp: FaWhatsapp,
  close: X,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  expand: Maximize2,
    users: Users,
  "trending-up": TrendingUp,
  target: Target,
  award: Award,
};

// lib/icons.ts (add these keys if not already present)
// import { Users, TrendingUp, Target, Award, type LucideIcon } from "lucide-react";

// export const ICON_MAP: Record<string, LucideIcon> = {
//   users: Users,
//   "trending-up": TrendingUp,
//   target: Target,
//   award: Award,
//   // ...existing keys
// };