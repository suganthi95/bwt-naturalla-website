import Nav from "./Nav";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import CookieConsentBar from "@/common/CookieConsentBar";

export default function Layout() {
  return (
    <>
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
      <CookieConsentBar/>
    </>
  );
}
