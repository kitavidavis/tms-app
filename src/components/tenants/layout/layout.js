import { Header } from './header/header';
import { HEADER_HEIGHT } from './header/header.style';
import { Toaster } from 'react-hot-toast';
import { FooterPage } from './footer/footer';
import { Outlet } from "react-router-dom";

export function TenantLayout({noHeader = false, noFooter=false}) {

  return (
  <>
    
    <main style={{ paddingTop: !noHeader ? HEADER_HEIGHT : 0 }}><Outlet /></main>
    <Toaster />

    </>
  );
}