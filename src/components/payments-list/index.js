import { ColorSwatch, Text, Avatar, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Menu, Drawer, Stack, Title} from '@mantine/core';
import { useLocalStorage, useViewportSize } from '@mantine/hooks';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Dots, X } from 'tabler-icons-react';
import { IconFileExport, IconPlus } from '@tabler/icons';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../../utils/axios';

function PaymentsList() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Payments List', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const [payments, setPayments] = useState([]);

  const [paybill, setPaybill] = useState("");
  const [consumer_key, setConsumerKey] = useState("");
  const [consumer_secret, setConsumerSecret] = useState("");

  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);

  useEffect(() => {
    axios.post("/payments/all-payments").then(function(res){
        if(res.status === 200){
            setPayments(res.data.data);
        }
    }).catch(function(err){
        console.log(err);
    })
  }, []);

  const createPaybill = () => {
    setLoading(true);

    axios.post("/paybills/create", {
        short_code: paybill,
        consumer_key: consumer_key,
        consumer_secret: consumer_secret,
        owner: state.userData.username
    }).then(function(res){
        if(res.status === 200){
            toast.success("Paybill created!")
            setLoading(false);
        }
    }).catch(function(err){
        console.log(err);
        toast.error('Could not configure the paybill');
        setLoading(false);
    })
  }

  const { height } = useViewportSize();

  const theme = useMantineTheme()
  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Payments List</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">
        <Group spacing="lg" position='right'>
            <Button radius={28} onClick={() => {setOpened(true)}}>Configure Paybill</Button>
            <Tooltip label="Export data as CSV">
            <ActionIcon>
                <IconFileExport />
            </ActionIcon>
            </Tooltip>
            <Tooltip label="Add new Payment" >
            <ActionIcon component={Link} to="#" >
                <IconPlus />
            </ActionIcon>
            </Tooltip>
        </Group>
    <Group position='apart'>
        <Group position='left'>
            <TextInput placeholder='Search' size='xs' radius={28} />
        </Group>
    </Group>

    <div style={{overflowX: 'auto'}} >
    <Table fontSize='xs' >
        <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    Image
                </th>
                <th>
                    Name
                </th>
                <th>
                   Amount
                </th>
                <th>
                    For
                </th>
                <th>
                    Paid At
                </th>
                <th>
                    Transaction Status
                </th>
            </tr>
        </thead>
        <tbody>
            {payments.length === 0 ? (
                            <tr>
                            <td colSpan={7}>
                                <Center>
                                    <Text size="xs">No data is available</Text>
                                </Center>
                            </td>
                        </tr>
            ) : (
                payments.map((item, index) => {
                    return (
                        <tr>
                            <td>
                                {index+1}
                            </td>
                            <td>
                                <Avatar radius="xl" >H</Avatar>
                            </td>
                            <td>
                                {item.name}
                            </td>
                            <td>
                                {item.rooms}
                            </td>
                            <td>
                                {item.rooms}
                            </td>
                            <td>
                                0
                            </td>
                            <td>
                                <Menu>
                                    <Menu.Target>
                                        <ActionIcon>
                                            <Dots size={14} />
                                        </ActionIcon>
                                    </Menu.Target>
                                    <Menu.Dropdown>
                                        <Menu.Item>Edit</Menu.Item>
                                        <Menu.Item >Delete</Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>
                            </td>
                        </tr>
                    )
                })
            )}
        </tbody>
    </Table>
    </div>

    <Drawer padding={"md"} position='right' withCloseButton={false} opened={opened} onClose={() => {setOpened(false)}} withOverlay={false} title="">
            <Stack style={{height: height * 0.9}} justify="space-between">
                <div>
                    <Title mb="md" order={6}>Configure Paybill</Title>
                    <Text mb="md">Configure your account's paybill to be able to receive payment notifications.</Text>
                    <TextInput label="Paybill" value={paybill} onChange={(e) => {setPaybill(e.currentTarget.value)}} mb="md" />

                    <TextInput label="Consumer Key" value={consumer_key} onChange={(e) => {setConsumerKey(e.currentTarget.value)}} mb="md" />

                    <TextInput label="Consumer Secret" value={consumer_secret} onChange={(e) => {setConsumerSecret(e.currentTarget.value)}} mb="md" />
                </div>

                <Group position='right'>
                    <Button loading={loading} radius={28} onClick={() => {createPaybill()}}>Add Paybill</Button>
                </Group>
            </Stack>
    </Drawer>
    </Paper>
    </>
  )
}

export default PaymentsList;