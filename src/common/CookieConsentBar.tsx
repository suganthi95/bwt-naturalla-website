import { Button } from "@/components/ui/button";
import { setCookie, getCookie } from "@/utils/cookies";
import { useState } from "react";
export default function CookieConsentBar() {
  const [showBanner, setShowBanner] = useState(
    !getCookie("bwt_store-cookie-consent")
  );

  const onAccept = () => {
    setCookie("bwt_store-cookie-consent", "true", { expires: 365 });
    setShowBanner(false);
  };
  const onDecline = () => {
    setCookie("bwt_store-cookie-consent", "false", { expires: 365 });
    setShowBanner(false);
  };
  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full  z-50  p-6 bg-white border-green-700">
      <div className="text-black text-sm  md:text-base leading-relaxed mb-4">
       <span className="font-bold">Cookie Policy :</span>  Our Websites may use "cookies" to enhance your user experience. Your web
        browser places cookies on your hard drive for record-keeping purposes
        and sometimes to track information about you. You may choose to set your
        web browser to refuse cookies or to alert you when cookies are being
        sent. If you do so, note that some parts of the Websites may not
        function properly. This is a standard operating procedure that is used
        across the internet. For further details, please review our Privacy
        Policy.
      </div>
      <div className="flex justify-end space-x-3">
        <Button
          onClick={onDecline}
          className=" p-2 px-4 md:px-6 md:py-4 text-sm md:text-base rounded-full bg-gray-200 text-gray-900 font-medium hover:bg-gray-300 transition"
        >
          Reject Cookies
        </Button>
        <Button
          onClick={onAccept}
          className="p-2 px-4 md:px-6 md:py-4 text-sm md:text-base rounded-full bg-primary text-white font-bold shadow-sm  transition"
        >
          Accept All Cookies
        </Button>
      </div>
    </div>
  );
}
