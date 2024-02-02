import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Input, Select, Box, List} from '@mantine/core';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useState } from 'react';
import { Download, InfoCircle, X } from 'tabler-icons-react';
import { DatePicker, DateRangePicker } from '@mantine/dates';

function Reports() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Reports', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const theme = useMantineTheme()
  const [annual, setAnnual] = useState(false);
  const [all, setAll] = useState(false);

  const [month, setMonth] = useState("");
  const [tenant, setTenant] = useState("");

  const [value, setValue] = useState([
    new Date(2021, 11, 1),
    new Date(2021, 11, 5),
  ]);

  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Reports</MantineTitle>
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
            <Text mt="md" >This section allows you to download reports for various sections.</Text>
    </Paper>

    <Input.Wrapper mt="md" label="Format" description="Select the format to download reports in" required>
        <Select data={[

            {label: "Excel", value: "excel"},
            {label: "PDF", value: "pdf"}
        ]} />
    </Input.Wrapper>
    <Switch checked={annual} onChange={(e) => {setAnnual(e.currentTarget.checked)}} mt="md" label="Annual Report" />
    {!annual ? (
        <DateRangePicker
        mt="md"
        label="Date Range"
        placeholder="Pick dates range"
        value={value}
        onChange={setValue}
        required
      />
    ) : null}
    <Switch checked={all} onChange={(e) => {setAll(e.currentTarget.checked)}} mt="md" label="All tenants" />
    {!all ? <Select label="Select tenant" mt="md" data={[]} required /> : null}

    <Button mt={50} leftIcon={<Download />} >Download Report</Button>

    </>
  )
}

export default Reports;