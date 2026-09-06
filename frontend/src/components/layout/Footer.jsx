import { Link } from "react-router-dom";
import { Container } from "../ui";

const Footer = () => {
  return (
    <footer className="mt-20 bg-slate-950 text-slate-300">
      <Container>
        {/* Main Footer */}
        <div className="grid grid-cols-1 gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <Link
              to="/"
              className="inline-block text-2xl font-extrabold tracking-tight text-white"
            >
              Market<span className="text-blue-400">place</span>
            </Link>

            <p className="mt-4 max-w-sm text-sm leading-6 text-slate-400">
              A modern marketplace built to make online shopping simple, secure,
              and convenient.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <div className="rounded-lg bg-slate-900 px-4 py-3">
                <p className="text-xs text-slate-500">Built with</p>
                <p className="mt-1 text-sm font-semibold text-white">
                  React + Spring Boot
                </p>
              </div>
            </div>
          </div>

          {/* Marketplace */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Marketplace
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/products" className="transition hover:text-blue-400">
                  Products
                </Link>
              </li>

              <li>
                <Link
                  to="/categories"
                  className="transition hover:text-blue-400"
                >
                  Categories
                </Link>
              </li>

              <li>
                <Link to="/cart" className="transition hover:text-blue-400">
                  Shopping Cart
                </Link>
              </li>

              <li>
                <Link to="/orders" className="transition hover:text-blue-400">
                  My Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Account
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <Link to="/login" className="transition hover:text-blue-400">
                  Login
                </Link>
              </li>

              <li>
                <Link to="/register" className="transition hover:text-blue-400">
                  Create Account
                </Link>
              </li>

              <li>
                <Link to="/profile" className="transition hover:text-blue-400">
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/seller/register"
                  className="transition hover:text-blue-400"
                >
                  Become a Seller
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Support
            </h3>

            <div className="mt-5">
              <p className="text-sm leading-6 text-slate-400">
                Need help with your account, products, or orders?
              </p>

              {/* These are currently display-only until support pages are created */}
              <div className="mt-5 space-y-3">
                <ul className="mt-5 space-y-3 text-sm">
                  <li>
                    <Link
                      to="/help-center"
                      className="transition hover:text-blue-400"
                    >
                      Help Center
                    </Link>
                  </li>

                  <li>
                    <Link
                      to="/contact-support"
                      className="transition hover:text-blue-400"
                    >
                      Contact Support
                    </Link>
                  </li>

                  <li>
                    <Link to="/faqs" className="transition hover:text-blue-400">
                      FAQs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Section */}
        <div className="border-t border-slate-800 py-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Secure Shopping
                </p>
                <p className="text-xs text-slate-500">
                  Safe & reliable experience
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Quality Products
                </p>
                <p className="text-xs text-slate-500">
                  Products from trusted sellers
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
                ✓
              </div>

              <div>
                <p className="text-sm font-semibold text-white">
                  Easy Ordering
                </p>
                <p className="text-xs text-slate-500">
                  Simple checkout experience
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col gap-3 border-t border-slate-800 py-6 text-center text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:text-left">
          <p>© {new Date().getFullYear()} Marketplace. All rights reserved.</p>

          <p>Built with React & Spring Boot</p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
