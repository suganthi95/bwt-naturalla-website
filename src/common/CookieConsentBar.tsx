import { setCookie, getCookie } from "@/utils/cookies";
import { useState } from "react";
export default function CookieConsentBar() {
  const [showBanner, setShowBanner] = useState(
    !getCookie("naturalla-cookie-consent")
  );

  const onAccept = () => {
    setCookie("naturalla-cookie-consent", "true", { expires: 365 });
    setShowBanner(false);
  };
  const onDecline = () => {
    setCookie("naturalla-cookie-consent", "false", { expires: 365 });
    setShowBanner(false);
  };
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 w-[95%]  z-50 rounded-lg border-2 shadow-lg p-6 bg-white border-green-700">
      <div className="text-black  text-base leading-relaxed mb-4">
        We use cookies to personalize and improve your experience. By clicking{" "}
        <span className="font-semibold">"Accept"</span>, you consent to our use
        of cookies. 
        {/* Read our{" "} */}
        {/* <a
          href="/"
          className="text-green-700 font-medium underline"
        >
          cookie policy
        </a> */}
        .
      </div>
      <div className="flex justify-end space-x-3">
        <button
          onClick={onDecline}
          className="px-4 py-2 rounded-md bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition"
        >
          Reject
        </button>
        <button
          onClick={onAccept}
          className="px-4 py-2 rounded-md bg-green-700 text-white font-bold shadow-sm hover:bg-green-800 transition"
        >
          Accept
        </button>
      </div>
    </div>
  );
}
