import Link from "next/link";
import { ICON_MAP } from "../icons";

export function HeroCta() {
  const ArrowRightIcon = ICON_MAP.arrowRight;
  const HandshakeIcon = ICON_MAP.handshake;

  return (
    <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
      <Link
        href="/tickets"
        className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#4caf50] to-[#1e88e5] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
      >
        Get tickets
        <ArrowRightIcon
          size={16}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </Link>
      <Link
        href="/sponsorship"
        className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/30 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-black/50"
      >
        <HandshakeIcon size={16} className="text-[#1e88e5]" />
        Become a sponsor
      </Link>
    </div>
  );
}