import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Input, Select, Box, List} from '@mantine/core';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useState } from 'react';
import { InfoCircle, Send, X } from 'tabler-icons-react';

function Payments() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Payments', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const theme = useMantineTheme()

  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Payments</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">
            <Group position='apart'>
                <Group position='left'>
                    <InfoCircle color='teal' />
                </Group>
                <Group position='right'>
                    <X />
                </Group>
            </Group>
            <Text mt="md" >This section allows you to manually automate payment reminders</Text>
    </Paper>

    <Switch mt="md" label="All Houses" description="Send reminder to all house units" />
    <Select mt="md"  label="Select House" data={[]} />
    <Switch mt="md"  label="All Units" description="Send to all units in this floor" />
    <Select mt="md"  label="Select Unit" data={[]} />
    <Button mt="md"  leftIcon={<Send />}>Send Reminders</Button>
    </>
  )
}

export default Payments;