import { Container, Center, Title, Group, Button} from '@mantine/core';
import { UserCircle } from "tabler-icons-react";
import useStyles from './header.style';
import { useViewportSize } from '@mantine/hooks';
import { Link } from 'react-router-dom';

export function Header() {
  const { classes } = useStyles();
  const { width } = useViewportSize();
  return (
    <div className={classes.header}>
      <Container size="xl" px="md" className={classes.inner}>
          <Center sx={(theme) => theme.fn.focusStyles()}>
            <Title order={3} >TMS®</Title>
          </Center>
        <Group  >
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