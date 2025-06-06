import { ASSETS } from "@/assets/assets";
import { Link } from "react-router-dom";
      import { FaInstagram, FaTwitter, FaFacebookF, FaSnapchatGhost, FaPinterestP } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#232323] text-white py-12 lato">
      <div className="container mx-auto flex flex-col lg:flex-row flex-wrap gap-8 justify-between">
        <div className="w-full lg:w-[23%] space-y-4">
          <img src={ASSETS.LOGO_FOOTER} alt="Logo" className="h-10 w-auto" />
          <p className="text-sm leading-relaxed text-justify text-white/70">
            Welcome to <b>Naturalla.store</b>, where nature meets innovation. We
            are a proudly organic and nature-based cosmetics company dedicated to
            crafting high-quality, sustainable beauty products that respect both
            your skin and the planet.
          </p>

<p className="text-white roundica text-xs">Naturalla {'–'} Naturally You, Naturally Beautiful.</p>
<div className="flex space-x-4 pt-2">
  <a href="#" className="text-white/60 hover:text-white transition">
    <FaInstagram />
  </a>
  <a href="#" className="text-white/60 hover:text-white transition">
    <FaTwitter /> {/* X (Twitter) icon */}
  </a>
  <a href="#" className="text-white/60 hover:text-white transition">
    <FaFacebookF />
  </a>
  <a href="#" className="text-white/60 hover:text-white transition">
    <FaSnapchatGhost />
  </a>
  <a href="#" className="text-white/60 hover:text-white transition">
    <FaPinterestP />
  </a>
</div>

        </div>
        <div className="space-y-7">

        <div className="w-full sm:w-1/2 lg:w-full space-y-3">
          <h4 className="text-lg font-semibold">Seller Options</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-white/50">Login as Seller</Link></li>
            <li><Link to="/partner-login" className="text-white/50">Signup as Seller</Link></li>
          </ul>
        </div>

        <div className="w-full sm:w-1/2 lg:w-full space-y-3">
          <h4 className="text-lg font-semibold">My Account</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-white/50">Login</Link></li>
            <li><Link to="/partner-login" className="text-white/50">Create Account</Link></li>
          </ul>
        </div>
        </div>


        <div className="w-full sm:w-1/2 lg:w-[13%] space-y-3">
          <h4 className="text-lg font-semibold">Useful Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-white/50">Terms & Conditions</Link></li>
            <li><Link to="/" className="text-white/50">Privacy Policy</Link></li>
            <li><Link to="/" className="text-white/50">Return & Refund</Link></li>
            <li><Link to="/" className="text-white/50">Shipping Policy</Link></li>
            <li><Link to="/" className="text-white/50">Browse All Products</Link></li>
            <li><Link to="/" className="text-white/50">Browse All Category</Link></li>
          </ul>
        </div>

       <div className="w-full sm:w-1/2 lg:w-[13%] space-y-3">
          <h4 className="text-lg font-semibold">Pages</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="text-white/50">Home</Link></li>
            <li><Link to="/" className="text-white/50">All Categories</Link></li>
            <li><Link to="/" className="text-white/50">All Products</Link></li>
            <li><Link to="/blog" className="text-white/50">Blog</Link></li>
            <li><Link to="/" className="text-white/50">Campaigns</Link></li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="w-full sm:w-1/2 lg:w-[20%] space-y-3">
          <h4 className="text-lg font-semibold">Contact Us</h4>
          <ul className="space-y-2 text-sm text-white/50">
            <li>Door No 29 B3,</li>
            <li>SRK COMPLEX, GROUND FLOOR,</li>
            <li>GANDHI STREET, KUMARAN NAGAR,</li>
            <li>Vilankurichi Road, Coimbatore,</li>
          </ul>
          <p className="text-sm text-white/50">
            <a href="mailto:reachnaturalla@gmail.com">reachnaturalla@gmail.com</a>
          </p>
          <p className="text-sm text-white/50">
            <a href="tel:+919655233533">+91-96552 33533</a>
          </p>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-4 text-center text-sm text-white/40">
        ©  Naturalla.store. All rights reserved.
      </div>
    </footer>
  );
}
