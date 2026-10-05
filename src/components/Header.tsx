"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/insights", label: "Insights" },
  { href: "/contact", label: "Contact" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 backdrop-blur-md bg-[var(--header-bg)] border-b border-[var(--header-border)] ${
        scrolled ? "shadow-sm" : ""
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Left: Brand Logo & Wordmark Lockup */}
        <div className="flex items-center text-heading">
          <Logo size="md" />
        </div>

        {/* Center / Desktop Navigation */}
        <nav
          className="hidden md:flex items-center space-x-1 lg:space-x-1.5"
          aria-label="Main Navigation"
        >
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`tap-target inline-flex items-center px-3.5 py-2 rounded-lg text-sm transition-all ${
                  isActive
                    ? "bg-subtle text-brand font-semibold border border-line-highlight"
                    : "text-fg-secondary hover:text-heading hover:bg-subtle/60 font-medium"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Right Desktop Actions */}
        <div className="hidden md:flex items-center space-x-3">
          <ThemeToggle />
          <Link
            href="/contact"
            className="btn-primary text-sm"
          >
            Book a Free Consultation
          </Link>
        </div>

        {/* Mobile Hamburger & Theme Toggle */}
        <div className="flex items-center space-x-2 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            type="button"
            className="tap-target p-2.5 rounded-lg text-heading hover:bg-subtle transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? (
              // Close Icon
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              // Menu Icon
              <svg
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-line bg-[var(--header-bg)] backdrop-blur-md px-4 pt-2 pb-6 space-y-2">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                  isActive
                    ? "bg-subtle text-brand font-semibold"
                    : "text-fg-secondary hover:bg-subtle hover:text-heading"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="pt-3">
            <Link
              href="/contact"
              className="btn-primary w-full text-center text-base"
            >
              Book a Free Consultation
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
