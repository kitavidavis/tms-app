import { useState, useContext, useCallback, useEffect } from 'react';
import {
    Navbar,
    Group,
    ActionIcon,
    NavLink,
    useMantineColorScheme,
    ScrollArea
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
    IconFileInvoice,
  } from '@tabler/icons';
import useStyles from "./navbar.style";
import { SidebarContext } from '../context/sidebar/sidebar.context';
import { CompanyLogo } from '../companyLogo';
import { Plus, Table, X } from 'tabler-icons-react';
import { UserInfo } from '../userInfo';
import { Link, useLocation } from "react-router-dom";
import { ColorSchemeControl } from '@mantine/ds';

const links = [
  { icon: IconHome, label: 'Dashboard', href: '/app/', notifications: 3 },
  { icon: IconReport, label: 'Reports',href: '/app/reports', },
  { icon: IconUsers, label: 'Properties', href: '#', links: [
    {label: 'Add Property', icon: Plus, href: '/app/properties/add-property'},
    {label: "Add Units", icon: Plus, href: '/app/properties/add-units'},
    {label: 'Property List', icon: Table, href: "/app/properties/list"},
  ] },
  { icon: IconCoin, label: 'Payments', href: '#', links: [
    {label: 'Payment Reminder', icon: IconClock, href: '/app/payments'},
    {label: 'Payments', icon: Table, href: "/app/payments/list"},
  ] },
  { icon: IconUser, label: 'Staff', href: '#', links: [
    {label: "Add Staff", icon: Plus, href: "/app/staff/add-staff"},
    {label: "Staff List", icon: Table, href: "/app/staff/staff-list"}
  ]},
  { icon: IconCheckbox, label: 'Complains', href: '/app/complains', },
  { icon: IconMail, label: 'SMS/Email', href: '/app/sms', },
  { icon: IconFileInvoice, label: 'Accounting & Reconciliation', href: '/app/accountings', },
  { icon: IconSettings, label: "Settings", href: "/app/settings"}
];
  
  export function DrawerNavbar({img}) {
    const { classes } = useStyles();
    const { state, dispatch } = useContext(SidebarContext);
    const theme = useMantineColorScheme();
    const location = useLocation();
    const toggleHandler = useCallback(() => {
      dispatch({
        type: 'TOGGLE',
      });
    }, [dispatch]);

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
  
    return (
      <Navbar hiddenBreakpoint="sm" hidden={state.opened} width={{ sm: state.width }} p="md" className={classes.navbar}>

        <Navbar.Section mb={20} className={classes.section}>
        <Group>
                <UserInfo />
            </Group>
        </Navbar.Section>

        <Navbar.Section grow component={ScrollArea} sx={(theme) => ({ [theme.fn.largerThan('sm')]: { display: 'none' } })} className={classes.section}>
          <div className={classes.mainLinks}>{ itemLinks}</div>
        </Navbar.Section>

        <Navbar.Section mb={20} style={{position: 'relative', bottom: 0}} className={classes.section}>
              <Group p="xl" position='apart'>
                Toggle Theme
                <ColorSchemeControl />
            </Group>
        </Navbar.Section>

      </Navbar>
    );
  }