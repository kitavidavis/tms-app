import { useState, useContext, useCallback, useEffect } from 'react';
import {
    Navbar,
    UnstyledButton,
    Group,
    Tooltip,
    NavLink,
    useMantineColorScheme,
    ScrollArea,
  } from '@mantine/core';
  import {
    IconUser,
    IconCheckbox,
    IconClock,
    IconCoin,
    IconDeviceDesktopAnalytics,
    IconHelp,
    IconHome,
    IconMail,
    IconReport,
    IconSettings,
    IconTools,
    IconWorld,
    IconUsers,
    IconLogout,
    IconFileInvoice,
    IconChecklist,
    IconDoor
  } from '@tabler/icons';
import useStyles from "./navbar.style";
import { SidebarContext } from '../context/sidebar/sidebar.context';
import { CompanyLogo } from "../companyLogo";
import { useLocation, Link, Outlet } from 'react-router-dom';
import { AdjustmentsHorizontal, BuildingBank, Clock, Layout, Logout, Plus, Settings, Table, UserPlus } from 'tabler-icons-react';
import { ACCOUNT_DATA } from '../../../../constants';

  const links = [
    { icon: IconHome, label: 'Dashboard', href: '/employee/', notifications: 3 },
    { icon: IconDoor, label: 'Assigned Houses', href: '/employee/houses', },
    { icon: IconCheckbox, label: "Complains", href: "/employee/complains"},
    { icon: IconChecklist, label: "Tasks", href: "/employee/tasks"},
    { icon: IconSettings, label: "Settings", href: "/employee/settings"}
  ];
  
  export function NavbarSmall({img}) {
    const { classes } = useStyles();
    const { state, dispatch } = useContext(SidebarContext);
    const [opened, setOpened] = useState({
      link: "",
      opened: false
    });
    const theme = useMantineColorScheme();
    const location = useLocation();
  

    const itemLinks = links.map((link, idx) => {
      const hasLinks = Array.isArray(link.links);
      return(
        hasLinks ? (
          <NavLink  component={Link} to={link.href} key={idx} label={link.label} icon={<link.icon size={16} stroke={1.5} />}>
            {link.links.map((itm) => {
              return (
                <NavLink
                component={Link}
                active={location.pathname === itm.href ? true : false}
                to={itm.href}
                key={itm.label}
                label={itm.label}
                />
              )
            })}
          </NavLink>
        ) : (
          <NavLink
          component={Link}
          active={location.pathname === link.href ? true : false}
          to={link.href}
          label={link.label}
          icon={<link.icon size={16} stroke={1.5} />}
          key={link.label}
          />
        )
      )
    })

    const minifiedLinks = links.map((link, idx) => {

      return (
        <Tooltip.Floating mt={20} position='right' offset={20} label={link.label}>
        <NavLink
        component={Link}
        key={link.label}
        active={location.pathname === link.href ? true : false}
        to={link.href}
          icon={<link.icon size={16} stroke={1.5} />}
        />
        </Tooltip.Floating>
      )
    });
  
    const logout = () => {
      localStorage.removeItem(ACCOUNT_DATA);
      dispatch({type: 'SIGN_OUT'});
   }
  
    return (
      <Navbar hiddenBreakpoint="sm" hidden={state.opened} width={{ sm: state.width }} sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { display: 'none' }, })} p="md" className={classes.navbar}>
        <Navbar.Section className={classes.section}>
          <Group position='center' sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { display: 'none' }, })} >
          <CompanyLogo img={img} />
          </Group>

        </Navbar.Section>
        <Navbar.Section grow component={ScrollArea} sx={(theme) => ({ [theme.fn.smallerThan('md')]: { display: 'none' } })} className={classes.section}>
          <div className={classes.mainLinks}>
            {state.width === 250 ? itemLinks : minifiedLinks}
            </div>
        </Navbar.Section>
  
      </Navbar>
    );
  }