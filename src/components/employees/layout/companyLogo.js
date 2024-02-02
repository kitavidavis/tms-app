import { useContext } from 'react';
import { createStyles, Avatar, Text, Group, Badge } from '@mantine/core';
import { SidebarContext } from './context/sidebar/sidebar.context';
import Logo from "./logo.jpeg";

const useStyles = createStyles((theme) => ({
  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[5],
  },

  name: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
  },
}));

const data = 
  {
    "avatar": "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=250&q=80",
    "title": "Staff",
    "name": "TMS"
  }

export function CompanyLogo({img}) {
  const { classes } = useStyles();
  const { state, dispatch } = useContext(SidebarContext);
  return (
    state.width === 250 ? (
      <div>
      <Group noWrap>
        <Avatar src={img} size={72} radius="xl" />
        <div>
          <Badge>
            {data.title}
          </Badge>
          <Text size="lg" align='center' weight={500} className={classes.name}>
            {data.name}
          </Text>
        </div>
      </Group>
    </div>
    ) : (
      <Text size="lg" align='center' weight={500} className={classes.name}>
      {data.name}
    </Text>
    )
  );
}