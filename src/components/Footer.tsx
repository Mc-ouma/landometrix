import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-inverse text-slate-300 border-t border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Brand & Positioning (2 cols on large) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="text-white">
              <Logo size="lg" />
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed mt-3">
              Landometrix IT Solutions turns messy data into clear decisions and
              builds the web products to deliver them. Based in Nairobi, Kenya,
              serving growth-minded businesses globally.
            </p>
            <div className="pt-2 flex items-center space-x-4 text-slate-400">
              {/* WhatsApp direct chat link */}
              <a
                href="https://wa.me/254700000000?text=Hi%20Landometrix,%20I'd%20like%20to%20request%20a%20quote"
                target="_blank"
                rel="noopener noreferrer"
                className="tap-target inline-flex items-center text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
                aria-label="Chat on WhatsApp"
              >
                <svg
                  className="w-5 h-5 mr-1.5 fill-current"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.976.533 2.011.815 3.149.815 3.18 0 5.767-2.587 5.768-5.766.001-3.181-2.585-5.767-5.768-5.767zm7.653 5.766c-.002 4.22-3.433 7.651-7.653 7.651-1.341 0-2.6-.35-3.699-.96l-4.103 1.077 1.097-4.004c-.694-1.155-1.062-2.489-1.062-3.764.002-4.22 3.434-7.651 7.654-7.651 4.22 0 7.653 3.431 7.653 7.651z" />
                </svg>
                WhatsApp Chat
              </a>
              <span className="text-slate-600">•</span>
              <span className="text-xs text-slate-400 font-mono">
                Nairobi, Kenya
              </span>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Navigation
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/work"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Work & Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Insights & Articles
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Core Services */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Services
            </h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  href="/services#analytics"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Data Analytics
                </Link>
              </li>
              <li>
                <Link
                  href="/services#visualization"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Data Visualization
                </Link>
              </li>
              <li>
                <Link
                  href="/services#web-development"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Custom Web Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services#bi-reporting"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Interactive Dashboards
                </Link>
              </li>
              <li>
                <Link
                  href="/services#consulting"
                  className="hover:text-sky-400 transition-colors py-1 inline-block"
                >
                  Data Strategy Advisory
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Consultations */}
          <div>
            <h3 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Get in Touch
            </h3>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li>
                <a
                  href="mailto:hello@landometrix.com"
                  className="hover:text-white transition-colors"
                >
                  hello@landometrix.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+254700000000"
                  className="hover:text-white transition-colors"
                >
                  +254 700 000 000
                </a>
              </li>
              <li className="pt-2">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-semibold px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                >
                  Book Free Consultation →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>
            © {currentYear} Landometrix IT Solutions. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link
              href="/privacy"
              className="hover:text-slate-400 transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="hover:text-slate-400 transition-colors"
            >
              Terms of Service
            </Link>
            <Link
              href="/sitemap.xml"
              className="hover:text-slate-400 transition-colors"
            >
              Sitemap
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
