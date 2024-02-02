import { Header } from './header/header';
import { Toaster } from 'react-hot-toast';
import { Outlet, useLocation } from "react-router-dom";

export function Layout({noHeader = false, noFooter=false}) {
  const location = useLocation();
  return (
  <>
    {!noHeader && !location.pathname.includes("account") ? <Header  /> : null}
    <main style={{ paddingTop: 0 }}><Outlet /></main>
    <Toaster />

    </>
  );
}