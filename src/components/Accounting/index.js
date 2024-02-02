import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Input, Select, Box, List} from '@mantine/core';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import { IconFileExport, IconPlus } from "@tabler/icons"

function Accounts() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'accounts', href: '#' },
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
      <MantineTitle order={4} weight={300}>Accounts & Reconciliation</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    </>
  )
}

export default Accounts;