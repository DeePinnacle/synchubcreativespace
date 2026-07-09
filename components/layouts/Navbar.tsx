"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";

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
    text: "About/1Million Creatives",
    to: "/about",
  },
  {
    id: 2,
    text: "Events",
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
];

export function Navbar() {
  const scrolled = useScrolled(50);

  return (
    <motion.nav
      className={cn(
        "right-0 z-50 transition-colors duration-300 bg-[#0C121C]",
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
        {/* left hand */}
        <div className="md:hidden">
          <div className="flex flex-row items-center gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"ghost"}>
                  <Menu className="w-10! h-10!" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <NavLinks />
                <SheetFooter>
                  <Link
                    href="/events"
                    className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Get Tickets
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>
        {/* large screen */}
        <div className="hidden md:block">
          <NavLinks />
        </div>
        <Link
          href="/events"
          className="hidden group items-center gap-2 rounded-full bg-linear-to-r from-primary to-secondary px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99] md:inline-flex"
        >
          Get Tickets
        </Link>
      </div>
    </motion.nav>
  );
}
const NavLinks = () => {
  return (
    <ul
      className={cn(
        `w-162.5 h-14 md:flex md:flex-row md:items-center md:justify-between`,
      )}
    >
      {navLinks.map((item) => (
        <li
          key={item.id}
          className="text-md text-white font-light my-5 px-2 py-2 hover:bg-primary-gold hover:transition hover:duration-500 hover:delay-100 hover:ease-in-out lg:my-2"
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
  return <Link href="/">
    <Image src="/logo.png" alt="Logo" width={100} height={100} />
  </Link>
};
