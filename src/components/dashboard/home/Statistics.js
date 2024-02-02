import { createStyles, Group, Paper, SimpleGrid, Text } from '@mantine/core';
import {
  IconUserPlus,
  IconDiscount2,
  IconReceipt2,
  IconCoin,
  IconArrowUpRight,
  IconArrowDownRight,
  IconTool,
  IconDoor
} from '@tabler/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../App';
import axios from '../../../utils/axios';

const useStyles = createStyles((theme) => ({
  root: {
    padding: 0,
    marginBottom: 20,
  },

  value: {
    fontSize: 24,
    fontWeight: 700,
    lineHeight: 1,
  },

  diff: {
    lineHeight: 1,
    display: 'flex',
    alignItems: 'center',
  },

  icon: {
    color: theme.colorScheme === 'dark' ? theme.colors.dark[3] : theme.colors.gray[4],
  },

  title: {
    fontWeight: 700,
    textTransform: 'uppercase',
  },
}));


export default function Statistics({complains, tenants}) {
  const { classes } = useStyles();
  const { state, dispatch } = useContext(AuthContext);
  const [houses, setHouses] = useState([]);

  useEffect(() => {
    try {
      const body = {
          username: state.userData._id
      };

      axios.post("/properties/getproperties", body).then(function(res){
          setHouses(res.data.data);
      }).catch(function(error){
        // do something
      })
  } catch(error){
    // do something
  }
  }, []);
  const data = [
    {
      "title": "Houses",
      "icon": IconDoor,
      "value": houses.length,
      "diff": houses.length
    },
    {
      "title": "Complains",
      "icon": IconTool,
      "value": complains,
      "diff": complains
    },
    {
      "title": "New Tenants",
      "icon": IconUserPlus,
      "value": tenants,
      "diff": tenants
    }
  ]

  const stats = data.map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group position="apart">
          <Text size="xs" color="dimmed" className={classes.title}>
            {stat.title}
          </Text>
          <stat.icon className={classes.icon} size={22} stroke={1.5} />
        </Group>

        <Group align="flex-end" spacing="xs" mt={25}>
          <Text className={classes.value}>{stat.value}</Text>
          <Text
            color={stat.diff > 0 ? 'teal' : 'red'}
            size="sm"
            weight={500}
            className={classes.diff}
          >
            <span>{stat.diff}%</span>
            <DiffIcon size={16} stroke={1.5} />
          </Text>
        </Group>

        <Text size="xs" color="dimmed" mt={7}>
          Compared to previous month
        </Text>
      </Paper>
    );
  });
  return (
    <div className={classes.root}>
      <SimpleGrid
        cols={3}
        breakpoints={[
          { maxWidth: 'md', cols: 2 },
          { maxWidth: 'xs', cols: 1 },
        ]}
      >
        {stats}
      </SimpleGrid>
    </div>
  );
}