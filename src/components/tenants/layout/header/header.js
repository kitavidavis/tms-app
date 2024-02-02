import { Container, Center, Title, Text, Group, Button} from '@mantine/core';
import {ColorSchemeControl } from '@mantine/ds';
import { UserCircle } from "tabler-icons-react";
import useStyles from './header.style';
import { useViewportSize } from '@mantine/hooks';
import { Link } from 'react-router-dom';

export function Header() {
  const { classes } = useStyles();
  const { height, width} = useViewportSize();
  return (
    <div className={classes.header}>
      <Container size="xl" px="md" className={classes.inner}>
        <Link href="/" style={{textDecoration: "none"}} >
          <Center sx={(theme) => theme.fn.focusStyles()}>
            <Title color="white" weight={300} order={3} >TMS</Title>
          </Center>
        </Link>
        <Group  >
            <Link to="/tenant/" style={{color: 'white', textDecoration: 'none' }}>Tenants</Link>
            <Link to="/staff/" style={{color: 'white', textDecoration: 'none' }}>Staff</Link>
            <Button color="white" component={Link} to='/account/login' leftIcon={<UserCircle />}>Login</Button>
            <Group style={{display: width < 390 ? "none" : "block"}} >
            <Button component={Link}  to="/account/register" leftIcon={<UserCircle />} >Sign Up</Button>
            </Group>
            <Group sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { display: 'none' } })}>
            </Group>
        </Group>
      </Container>
    </div>
  );
}