import { ASSETS } from "@/assets/assets";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="flex flex-col items-center gap-6">

        {/* Logo */}
        <img
          src={ASSETS.LOGO}
          alt="Loading"
          className="w-60 opacity-90 animate-fade-in"
        />

        <div className="relative w-72 h-[2px] overflow-hidden bg-neutral-200">
          <div className="absolute inset-0 bg-black animate-loader-line" />
        </div>

        <p className="text-xs tracking-[0.3em] text-neutral-500 uppercase">
          Loading
        </p>
      </div>
    </div>
  );
}
