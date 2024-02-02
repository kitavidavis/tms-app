import { createStyles, Card, Group, Switch, Text, Button } from '@mantine/core';
import { useContext } from 'react';
import { AuthContext } from '../../App';
import { ACCOUNT_DATA } from '../../constants';
import { useLocalStorage } from '@mantine/hooks';

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
  },

  item: {
    '& + &': {
      paddingTop: theme.spacing.sm,
      marginTop: theme.spacing.sm,
      borderTop: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[4] : theme.colors.gray[2]
      }`,
    },
  },

  switch: {
    '& *': {
      cursor: 'pointer',
    },
  },

  title: {
    lineHeight: 1,
  },
}));

const THEME_KEY = 'tms-color-scheme';

export default function Settings() {
  const { classes } = useStyles();
  const { state, dispatch } = useContext(AuthContext);

  const logout = () => {
    localStorage.removeItem(ACCOUNT_DATA);
     dispatch({type: "SIGN_OUT"});
  }

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  return (
    <Card withBorder radius="md" p="xl" className={classes.card}>
      <Text size="lg" className={classes.title} weight={500}>
        Configurations
      </Text>
      <Text size="xs" color="dimmed" mt={3} mb="xl">
        Choose which configurations you need to make.
      </Text>
      <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>Dark Theme</Text>
        <Text size="xs" color="dimmed">
            Turn dark theme.
        </Text>
      </div>
      <Switch checked={colorScheme === "dark" ? true : false} onClick={(e) => {setColorScheme(colorScheme === "light" ? "dark" : "light")}} onLabel="ON" offLabel="OFF" className={classes.switch} size="lg" />
    </Group>
      <Group position="apart" className={classes.item} noWrap spacing="xl">
      <div>
        <Text>Logout</Text>
        <Text size="xs" color="dimmed">
            Destroy all your sessions. 
        </Text>
      </div>
      <Button color="red" variant='subtle' onClick={() => {logout()}}  >Logout</Button>
        </Group>

    </Card>
  );
}