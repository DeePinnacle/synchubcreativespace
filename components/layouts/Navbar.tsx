"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CartSheet } from "@/components/shared/Cart-sheet";

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

// navlinks
const navLinks = [
  {
    id: 0,
    text: "Home",
    to: "/",
  },
  {
    id: 1,
    text: "About",
    to: "/about",
  },
  {
    id: 2,
    text: "Creative-week",
    to: "/events",
  },
  {
    id: 3,
    text: "Sponsorship",
    to: "/sponsorship",
  },
  {
    id: 4,
    text: "Gallery",
    to: "/gallery",
  },
  {
    id: 5,
    text: "Contact",
    to: "/contact",
  },
  {
    id: 6,
    text: "Our Community",
    to: "/community"
  }
];

export function Navbar() {
  const scrolled = useScrolled(50);

  return (
    <motion.nav
      className={cn(
        "right-0 z-50 transition-colors duration-300 bg-primary-dark",
        scrolled &&
          "fixed top-0 left-0 border border-border bg-black backdrop-blur-md shadow-lg",
      )}
      animate={{
        margin: scrolled ? "16px" : "0px",
        borderRadius: scrolled ? "360px" : "0px",
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between p-2">
        <Logo />

        {/* Mobile screen drawer */}
        <div className="md:hidden">
          <div className="flex flex-row items-center gap-1">
            <CartSheet />
            <Sheet>
              <SheetTrigger asChild>
                <Menu className="w-10! h-10! bg-linear-to-r from-primary to-secondary mr-8" />
              </SheetTrigger>
              <SheetContent side="right" className="bg-primary-dark">
                <NavLinks />
                <SheetFooter className="flex flex-col gap-3 mt-6">
                  {/* Become a Vendor Link (Mobile) */}
                  <Link
                    href="/vendor"
                    className="group relative inline-flex items-center justify-center rounded-full p-[2px] text-sm font-semibold transition-transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    <span className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-secondary" />
                    <span className="relative w-full rounded-full bg-primary-dark px-6 py-2.5 text-center bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Become a Vendor
                    </span>
                  </Link>

                  {/* Get Tickets Link (Mobile) */}
                  <Link
                    href="/event-registration"
                    className="group inline-flex items-center justify-center rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Register
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* Large screen navigation */}
        <div className="hidden md:block">
          <NavLinks />
        </div>

        {/* Action Buttons (Desktop) */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <CartSheet />

          {/* Gradient Border & Gradient Text Button */}
          <Link
            href="/vendor"
            className="group relative inline-flex items-center justify-center rounded-full p-[2px] text-sm font-semibold transition-transform border border-solid border-off-white hover:scale-[1.02] active:scale-[0.99]"
          >
            {/* Gradient border layer */}
            {/* <span className="absolute inset-0 rounded-full bg-linear-to-r from-primary to-secondary" /> */}

            {/* Inner transparent layer matching background */}
            <span className="relative rounded-full bg-[#0C121C] px-6 py-2.5 bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Become a Vendor
            </span>
          </Link>

          {/* Solid Gradient Button */}
          <Link
            href="/event-registration"
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Register
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

const NavLinks = () => {
  return (
    <ul
      className={cn(
        `w-162.5 mt-20 md:flex md:flex-row md:items-center md:justify-between md:mt-0`,
      )}
    >
      {navLinks.map((item) => (
        <li
          key={item.id}
          className="text-md text-off-white font-light my-5 px-2 py-2 hover:bg-primary-gold hover:transition hover:duration-500 hover:delay-100 hover:ease-in-out lg:my-2"
        >
          <Link href={`${item.to}`} className="block">
            {item.text}
          </Link>
        </li>
      ))}
    </ul>
  );
};

const Logo = () => {
  return (
    <Link href="/">
      <Image src="/logo.png" alt="Logo" width={100} height={100} />
    </Link>
  );
};