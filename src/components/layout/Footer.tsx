import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaTwitter,
  FaFacebookF,
  FaPinterestP,
} from "react-icons/fa";
import { FaYoutube } from "react-icons/fa6";
import { ASSETS } from "@/assets/assets";
export default function Footer() {
  return (
    <footer className="bg-[#232323] text-white py-12 lato">
      <div className="container mx-auto flex flex-col lg:flex-row flex-wrap gap-8 justify-between">
        <div className="w-full lg:w-[23%] space-y-4">
          <img src={ASSETS.LOGO} alt="Logo" className="w-40  object-cover " />
          {/* <Icons.Footet_Logo /> */}
          <p className="text-sm leading-relaxed text-justify text-white/70">
            Welcome to <b>BWT-store</b>, where nature meets innovation. We
            are a proudly organic and nature-based cosmetics company dedicated
            to crafting high-quality, sustainable beauty products that respect
            both your skin and the planet.
          </p>

          <p className="text-white roundica text-xs">
             BWT-store – Rejoice with Nature's 💕{" "}
          </p>
          <div className="flex space-x-4 pt-2">
            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <FaInstagram />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <FaTwitter />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="https://www.youtube.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <FaYoutube />
            </a>
            <a
              href="https://www.pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/60 hover:text-white transition"
            >
              <FaPinterestP />
            </a>
          </div>
        </div>
        <div className="space-y-7">
          <div className="w-full sm:w-1/2 lg:w-full space-y-3">
            <h4 className="text-lg font-semibold">My Account</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/login" className="text-white/50">
                  Login
                </Link>
              </li>
              <li>
                <Link to="/sign-up" className="text-white/50">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full sm:w-1/2 lg:w-[13%] space-y-3">
          <h4 className="text-lg font-semibold">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/terms-and-conditions" className="text-white/50">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link to="/privacy-policy" className="text-white/50">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/returns-and-refunds" className="text-white/50">
                Return & Refund
              </Link>
            </li>
            <li>
              <Link to="/shipping-policy" className="text-white/50">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link to="/products/all" className="text-white/50">
                Browse All Products
              </Link>
            </li>
            <li>
              <Link to="/categories" className="text-white/50">
                Browse All Categories
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 lg:w-[13%] space-y-3">
          <h4 className="text-lg font-semibold">Pages</h4>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="text-white/50">
                Home
              </Link>
            </li>

            <li>
              <Link to="/products/categories" className="text-white/50">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/blogs" className="text-white/50">
                Blog
              </Link>
            </li>
            <li>
              <Link to={"/contact-us"} className="text-white/50">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 lg:w-[20%] space-y-3">
          <h4 className="text-lg font-semibold">Contact Us</h4>
           <p className="text-sm text-white/50">
            BWT-store  Private Limited
          </p>
          <ul className="space-y-2 text-sm text-white/50">
            <li>Door No - 14/169/7,</li>
            <li>2nd Floor, Shree Narayana Towers</li>
            <li>No 1 Tollgate,</li>
            <li>Bikshandarkoil, Tiruchirappalli,</li>
            <li>Tamil Nadu 621216</li>
          </ul>
          <p className="text-sm text-white/50">
            <a href="mailto:cs@nllpl.in">
contactus@blackwinstech.com</a>
          </p>
           <p className="text-sm text-white/50">
            <a href="tel:+919655033533"> +91 72043 35937</a>
          </p>
          {/* <p className="text-sm text-white/50">
            <a href="tel:+919655233533">+91 96552 33533</a>
          </p> */}
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/40">
        ©  BWT-store. All rights reserved.
      </div>
    </footer>
  );
}
