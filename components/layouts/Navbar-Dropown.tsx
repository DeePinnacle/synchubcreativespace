"use client";
import * as React from "react";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/utils";
import { Menu, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";

function useScrolled(threshold = 50) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return scrolled;
}

// ── nav data ────────────────────────────────────────────
type NavChild = {
  text: string;
  href: string;
  description?: string;
};

type NavItem = {
  id: number;
  text: string;
  href?: string;
  children?: NavChild[];
};

const navItems: NavItem[] = [
  { id: 0, text: "About", href: "/about" },
  {
    id: 1,
    text: "Experience",
    children: [
      {
        text: "Event Schedule",
        href: "/schedule",
        description: "The full six-day lineup, day by day.",
      },
      {
        text: "Meet the Creatives",
        href: "/creatives",
        description: "The voices and talent shaping the week.",
      },
      {
        text: "Gallery",
        href: "/gallery",
        description: "Moments from Synchub, past and present.",
      },
      {
        text: "News & Updates",
        href: "/news",
        description: "Announcements, press, and what's next.",
      },
    ],
  },
  {
    id: 2,
    text: "Attend",
    children: [
      {
        text: "Tickets & Registration",
        href: "/tickets",
        description: "Single day, full week, or VIP access.",
      },
      {
        text: "FAQ",
        href: "/faq",
        description: "Everything you need to know before you go.",
      },
      {
        text: "Terms, Privacy & Refund Policy",
        href: "/terms-privacy-refund",
      },
    ],
  },
  {
    id: 3,
    text: "Community",
    children: [
      {
        text: "Partners Wall",
        href: "/partners",
        description: "The brands and sponsors powering the week.",
      },
      {
        text: "1M Creatives / Support Us",
        href: "/support-us",
        description: "Join the mission beyond the event itself.",
      },
      {
        text: "About / Our Story",
        href: "/about",
        description: "How Synchub Creative Centre came to be.",
      },
    ],
  },
  { id: 4, text: "Contact", href: "/contact" },
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

        {/* mobile trigger */}
        <div className="md:hidden">
          <div className="flex flex-row items-center gap-1">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant={"ghost"}>
                  <Menu className="w-10! h-10!" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="bg-[#0a0a0a] border-white/10">
                <MobileNav />
                <SheetFooter className="gap-3">
                  <Link
                    href="/sponsorship"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
                  >
                    Become a Sponsor
                  </Link>
                  <Link
                    href="/tickets"
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-linear-to-r from-[#4caf50] to-[#1e88e5] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
                  >
                    Get Tickets
                  </Link>
                </SheetFooter>
              </SheetContent>
            </Sheet>
          </div>
        </div>

        {/* desktop links */}
        <div className="hidden md:block">
          <DesktopNav />
        </div>

        {/* desktop CTAs */}
        <div className="hidden md:flex md:items-center md:gap-3">
          <Link
            href="/sponsorship"
            className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/5"
          >
            Become a Sponsor
          </Link>
          <Link
            href="/tickets"
            className="group inline-flex items-center gap-2 rounded-full bg-linear-to-r from-[#4caf50] to-[#1e88e5] px-6 py-3 text-sm font-semibold text-white shadow-[0_0_24px_-6px_rgba(76,175,80,0.5)] transition-transform hover:scale-[1.02] active:scale-[0.99]"
          >
            Get Tickets
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

// ── desktop nav (navigation-menu based) ────────────────
const DesktopNav = () => {
  return (
    <NavigationMenu viewport={false}>
      <NavigationMenuList className="gap-1">
        {navItems.map((item) =>
          item.children ? (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuTrigger className="bg-transparent text-white font-light text-md hover:bg-white/5 data-[state=open]:bg-white/5 data-[state=open]:text-white">
                {item.text}
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[320px] gap-1 p-3 bg-[#0f0f10] border border-white/10 rounded-xl">
                  {item.children.map((child) => (
                    <ListItem
                      key={child.href}
                      href={child.href}
                      title={child.text}
                    >
                      {child.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          ) : (
            <NavigationMenuItem key={item.id}>
              <NavigationMenuLink asChild>
                <Link
                  href={item.href!}
                  className="inline-flex items-center px-4 py-2 rounded-md text-md text-white font-light hover:bg-white/5 transition-colors"
                >
                  {item.text}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ),
        )}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

const ListItem = ({
  className,
  title,
  children,
  href,
}: {
  className?: string;
  title: string;
  children?: React.ReactNode;
  href: string;
}) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors hover:bg-white/5 focus:bg-white/5",
            className,
          )}
        >
          <div className="text-sm font-medium leading-none text-white">
            {title}
          </div>
          {children && (
            <p className="line-clamp-2 text-sm leading-snug text-[#9e9e9e]">
              {children}
            </p>
          )}
        </Link>
      </NavigationMenuLink>
    </li>
  );
};

// ── mobile nav ──────────────────────────────────────────
const MobileNav = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggle = (text: string) =>
    setOpenSection((prev) => (prev === text ? null : text));

  return (
    <ul className="flex flex-col gap-1 px-4 pt-10">
      {navItems.map((item) =>
        item.children ? (
          <li key={item.id} className="border-b border-white/10">
            <button
              onClick={() => toggle(item.text)}
              className="flex w-full items-center justify-between py-4 text-md text-white font-light"
            >
              {item.text}
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform duration-300",
                  openSection === item.text && "rotate-180",
                )}
              />
            </button>
            <AnimatePresence initial={false}>
              {openSection === item.text && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden pl-2 pb-2"
                >
                  {item.children.map((child) => (
                    <li key={child.href}>
                      <Link
                        href={child.href}
                        className="block py-2 text-sm text-[#e0e0e0] font-light hover:text-white"
                      >
                        {child.text}
                      </Link>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </li>
        ) : (
          <li key={item.id} className="border-b border-white/10">
            <Link
              href={item.href!}
              className="block py-4 text-md text-white font-light"
            >
              {item.text}
            </Link>
          </li>
        ),
      )}
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