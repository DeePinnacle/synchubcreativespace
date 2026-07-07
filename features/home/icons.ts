import {
  Calendar,
  MapPin,
  ArrowRight,
  Menu,
  X,
  Handshake,
  type LucideIcon,
} from "lucide-react";
import type { IconType } from "react-icons";

// Unifies lucide-react (general icons) and react-icons (brand/social icons)
// behind one type so components can accept either without caring which
// library a given icon came from.
export type AnyIcon = LucideIcon | IconType;

// Static, module-level map — required so icon components can be referenced
// safely across the server/client boundary without serialization errors.
export const ICON_MAP = {
  calendar: Calendar,
  mapPin: MapPin,
  arrowRight: ArrowRight,
  menu: Menu,
  close: X,
  handshake: Handshake,
} as const satisfies Record<string, AnyIcon>;

export type IconName = keyof typeof ICON_MAP;