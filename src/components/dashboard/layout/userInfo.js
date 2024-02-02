import {
    UnstyledButton,
    Group,
    Avatar,
    Text,
    createStyles,
  } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
  import { IconChevronRight } from '@tabler/icons';
import { useContext } from 'react';
  import { Link } from "react-router-dom";
  import { AuthContext } from '../../../App';

  const useStyles = createStyles((theme) => ({
    user: {
      display: 'block',
      width: '100%',
      height: '80%',
      padding: theme.spacing.md,
      color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.black,
  
      '&:hover': {
        backgroundColor: "transparent"
      },
    },
  }));
  
  
  export function UserInfo({ image, name, email, icon, ...others }) {
    const { classes } = useStyles();
    const { state, dispatch } = useContext(AuthContext);
    return (
      <UnstyledButton component={Link} to="/app/settings" className={classes.user} {...others} >
        <Group>
          <Avatar src={state.userData.avatar} radius="xl" />
  
          <div style={{ flex: 1 }}>
            <Text size="sm" weight={500}>
              Welcome,
            </Text>
  
            <Text color="dimmed" size="xs">
              {state.userData.username}
            </Text>
          </div>
  
          {icon || <IconChevronRight size={14} stroke={1.5} />}
        </Group>
      </UnstyledButton>
    );
  }