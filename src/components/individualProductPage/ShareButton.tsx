import { useState } from "react";
import {
  FaWhatsapp,
  FaFacebookMessenger,
  FaRegClipboard,
  FaClipboardCheck,
  FaInstagram,
  FaSnapchatGhost,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import { Button } from "../ui/button";

interface Props {
  url: string;
}
const ShareButton = ({url }: Props) => {
        const text = "Check out this amazing product!";
  const message = encodeURIComponent(`${text} ${url}`);

  const handleWhatsAppShare = () => {
    window.open(`https://wa.me/?text=${url}`, "_blank");
  };

  const handleMessengerShare = () => {
    window.open(
      `fb-messenger://share/?link=${encodeURIComponent(
        url
      )}&app_id=YOUR_APP_ID`,
      "_blank"
    );
  };

  const handleTwitterShare = () => {
    window.open(`https://twitter.com/intent/tweet?text=${message}`, "_blank");
  };

  const handleInstagramShare = () => {
    const text = "Check out this amazing product!";
    navigator.clipboard.writeText(`${text} ${url}`);
    window.open("https://www.instagram.com", "_blank");
  };

  const handleSnapchatShare = () => {
    const text = "Check out this amazing product!";

    navigator.clipboard.writeText(`${text} ${url}`);

    window.open("https://web.snapchat.com", "_blank");
  };
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    });
  };

  return (
    <section className="my-2">
      <div className="flex flex-col items-center justify-center bg-gray-100 py-2 ">
        <h1 className="md:text-2xl font-bold mb-4">Share this Product</h1>
        <div className="flex space-x-4 py-3">
          <button
            onClick={handleWhatsAppShare}
            className="flex items-center cursor-pointer justify-center w-10 h-10 bg-green-500 text-white rounded-full hover:bg-green-600 transition"
          >
            <FaWhatsapp size={20} />
          </button>

          <button
            onClick={handleMessengerShare}
            className="flex items-center cursor-pointer justify-center w-10 h-10 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
          >
            <FaFacebookMessenger size={20} />
          </button>

          <button
            onClick={handleTwitterShare}
            className="flex items-center cursor-pointer justify-center w-10 h-10 bg-black text-white rounded-full hover:opacity-90 transition"
          >
            <FaXTwitter size={20} />
          </button>

          <button
            onClick={handleInstagramShare}
            className="flex items-center cursor-pointer justify-center w-10 h-10 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 text-white rounded-full hover:opacity-90 transition"
          >
            <FaInstagram size={20} />
          </button>

          <button
            onClick={handleSnapchatShare}
            className="flex items-center cursor-pointer justify-center w-10 h-10 bg-yellow-300 text-black rounded-full hover:bg-yellow-400 transition"
          >
            <FaSnapchatGhost size={20} />
          </button>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center bg-gray-100 mb-2 py-2">
        <h1 className="text-sm md:text-xl font-bold mb-4">Copy this URL</h1>
        <div className="flex items-center justify-center">
          <Button
            onClick={handleCopy}
            className={`flex items-center justify-center p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200 ${
              copied ? "bg-green-600 hover:bg-green-700" : ""
            }`}
          >
            {copied ? (
              <FaClipboardCheck size={24} />
            ) : (
              <FaRegClipboard size={16} />
            )}
            <span className="ml-2">{copied ? "Copied!" : "Copy URL"}</span>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ShareButton;
