// import { Icons } from "@/assets/icons";
// import "./loader.css";

// export default function FullScreenLoader() {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#F7F7F7] backdrop-blur-sm">
//       <div className="relative w-44 h-44">
//         <div className="absolute inset-0 flex items-center justify-center animate-spin-slow">
//           <svg className="w-full h-full" viewBox="0 0 100 100">
//             <defs>
//               <path
//                 id="circle"
//                 d="M50,50 m-35,0 a35,35 0 1,1 70,0 a35,35 0 1,1 -70,0"
//               />
//             </defs>
//             <text
//               fontSize="6"
//               fill="black"
//               textLength="220"
//               lengthAdjust="spacingAndGlyphs"
//             >
//               <textPath href="#circle" startOffset="0%">
//                 Skin • Hair • Body • Glow •
//               </textPath>
//             </text>
//           </svg>
//         </div>

//         <div className="absolute inset-0 flex items-center justify-center">
//            <Icons.Logo className="w-14 h-14 text-white" /> 
          
//         </div>
//       </div>
//     </div>
//   );
// }


import { ASSETS } from "@/assets/assets";

export default function FullScreenLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center  backdrop-blur-md">
      <div className="relative flex items-center justify-center">
        
        <div className="absolute w-40 h-40 rounded-full border border-black/10 animate-spin-slow" />

        <div className="absolute w-28 h-28 rounded-full border border-black/20 animate-pulse-soft" />

        <div className="relative z-10 flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-lg">
          <img
            src={ASSETS.LOGO}
            alt="Loading"
            className="w-12 h-12 object-contain animate-fade-in"
          />
        </div>
      </div>
    </div>
  );
}

