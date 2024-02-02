import { useContext, useState } from 'react';
import AppShellLayoutLayout from './appshell';
import { HEADER_HEIGHT } from './header/header.style';
import { SidebarProvider } from './context/sidebar/sidebar.provider';
import { Outlet } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import { AuthContext } from '../../../App';

export default function AppTenantLayout() {
  const { state, dispatch } = useContext(AuthContext);
  return (
      <SidebarProvider>
        <AppShellLayoutLayout img={state.userData.avatar} >
        <main style={{ paddingTop: HEADER_HEIGHT, }}><Outlet /></main>
        </AppShellLayoutLayout>
        <Toaster />
        </SidebarProvider>
  );
}