import { useContext, useCallback } from 'react';
import {
    AppShell,
    Drawer,
    MediaQuery,
    useMantineTheme,
  } from '@mantine/core';
  import { Header } from './header/header';
  import { NavbarSmall } from './nav/navbar';
  import Footer from './footer/footer';
import { SidebarContext } from './context/sidebar/sidebar.context';
import { DrawerNavbar } from './nav/drawernav';
  export default function AppShellLayoutLayout({children, img}) {
    const { state, dispatch } = useContext(SidebarContext);
    const toggleHandler = useCallback(() => {
      dispatch({
        type: 'TOGGLE',
      });
    }, [dispatch]);

    const theme = useMantineTheme();
    return (
      <AppShell
        styles={{
          main: {
            background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
            marginBottom: 50,
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <MediaQuery smallerThan="md" styles={{display: 'none'}}>
            <NavbarSmall img={img} />
          </MediaQuery>
        }
        header={
          <Header />
        }
      >
        <Drawer onClose={toggleHandler} opened={!state.opened}>
          <DrawerNavbar img={img} />
        </Drawer>
        {children}
      </AppShell>
    );
  }