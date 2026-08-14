import {
  X,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Info,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Users,
  TrendingUp,
  Target,
  Award,
  AlertCircle,
  Palette,
  Briefcase,
  Clapperboard,
  Cpu,
  HeartPulse,
  Trophy,
} from "lucide-react";
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
  alertCircle: AlertCircle,
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
  // Event Highlights / Event Detail page category icons (Event-Highlight.tsx)
  cultural: Palette,
  business: Briefcase,
  film: Clapperboard,
  tech: Cpu,
  wellness: HeartPulse,
  awards: Trophy,
};

/** Keys of the event-day category icons above — used to type `EventDayHighlight.icon` in lib/data/events.ts. */
export type EventIconKey =
  | "cultural"
  | "business"
  | "film"
  | "tech"
  | "wellness"
  | "awards";