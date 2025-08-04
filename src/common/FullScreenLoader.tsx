import { Icons } from "@/assets/icons";
import "./loader.css";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F7F7] backdrop-blur-sm">
      <div className="relative w-44 h-44">
        <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <defs>
              <path
                id="circle"
                d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
              />
            </defs>
            <text
              fontSize="6"
              fill="black"
              textLength="220"
              lengthAdjust="spacingAndGlyphs"
            >
              <textPath href="#circle" startOffset="0%">
                Naturalla • Naturalla • Naturalla • Naturalla •
              </textPath>
            </text>
          </svg>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <Icons.Logo className="w-14 h-14 text-white" />
        </div>
      </div>
    </div>
  );
}
