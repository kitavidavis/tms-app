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
    IconFileInvoice
  } from '@tabler/icons';
import useStyles from "./navbar.style";
import { SidebarContext } from '../context/sidebar/sidebar.context';
import { CompanyLogo } from "../companyLogo";
import { useLocation, Link, Outlet } from 'react-router-dom';
import { AdjustmentsHorizontal, BuildingBank, Clock, Layout, Logout, Plus, Settings, Table, UserPlus } from 'tabler-icons-react';
import { ACCOUNT_DATA } from '../../../../constants';

  const links = [
    { icon: IconHome, label: 'Dashboard', href: '/app/', notifications: 3 },
    { icon: IconReport, label: 'Reports',href: '/app/reports', },
    { icon: IconUsers, label: 'Properties', href: '#', links: [
      {label: 'Add Property', icon: Plus, href: '/app/properties/add-property'},
      {label: "Add Units", icon: Plus, href: '/app/properties/add-units'},
      {label: 'Property List', icon: Table, href: "/app/properties/list"},
    ] },
    { icon: IconCoin, label: 'Payments', href: '#', links: [
      {label: 'Payment Reminder', icon: Clock, href: '/app/payments'},
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
  
  export function NavbarSmall({img}) {
    const { classes } = useStyles();
    const { state, dispatch } = useContext(SidebarContext);
    const [opened, setOpened] = useState({
      link: "",
      opened: false
    });
    const theme = useMantineColorScheme();
    const location = useLocation();
    
    useEffect(() => {
      if(location.pathname === "/app/customers/customers-list"){
        
        setOpened({
          link: location.pathname,
          opened: true
        });
      } else if (location.pathname === "/app/customers/create-customer") {
        setOpened({
          link: location.pathname,
          opened: true
        });
      } else if (location.pathname === "/app/configure/tarrifs"){
        setOpened({
          link: location.pathname,
          opened: true
        });
      } else {
        setOpened({
          link: location.pathname,
          opened: false
        });
      }
    }, [location]);

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