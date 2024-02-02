import { ActionIcon, Anchor, Button, Center, Group, Modal, Paper, Select, Table, Text, TextInput, Title, Tooltip, useMantineTheme } from "@mantine/core";
import { IconPlus } from "@tabler/icons";
import { useContext, useEffect, useState } from "react"
import { Plus } from "tabler-icons-react";
import { AuthContext } from "../../App"
import axios from "../../utils/axios";
import { BreadcrumbsSlash } from "../BreadCrumbs";
import toast from "react-hot-toast";

export default function TenantDashboard(){
    const { state, dispatch } = useContext(AuthContext);
    const [opened, setOpened] = useState(false);
    const [properties, setProperties] = useState([]);

    const items = [
        {title: 'app', href: '/tenant/'},
        { title: 'Dashboard', href: '#'},
    ].map((item, index) => (
        <Anchor size="xs" href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));

    console.log(state.userData);

    const theme = useMantineTheme();
    const makePayments = () => {
        axios.post("/simulate/pay", {
            partyA: 254741582811,
            phone: 254741582811
        }).then(function(res){
            console.log(res);
        })
    }

    useEffect(() => {
        try {
            const body = {
                username: state.userData._id
            };
    
            axios.post("/properties/getall", body).then(function(res){
              let arr = []; 
              for(let i=0; i<res.data.data.length; i++){
                let item = res.data.data[i];
                arr.push({label: item.name, value: item.name})
               }
    
              setProperties(arr);
            }).catch(function(error){
                toast.error(error.message);
            })
        } catch(error){
            toast.error(error.message);
        }
      }, []);

    return (
        <>
        <Group position="apart">
            <Group position="left">
                <Title order={4} weight={300}>Welcome, {state.userData.username}</Title>
            </Group>
            <Group position="right">
                <BreadcrumbsSlash items={items} />
            </Group>
        </Group>

        <Modal opened={opened} closeOnClickOutside={false} closeOnEscape={false} onClose={() => {setOpened(false)}} centered title="Make payment">
            <Text mb={20} size="xs">Select the house and specific unit to pay for. We are currently supporting M-Pesa transactions only.</Text>

                        <Group mb={20} grow>
                            <Group position="left">
                                <Text size='xs'>Select House</Text>
                            </Group>
                            <Group>
                            <Select data={properties} placeholder='select one' size='xs'  />
                            </Group>
                        </Group>

                        <Group mb={20} grow>
                            <Group position="left">
                                <Text size='xs'>Room</Text>
                            </Group>
                            <Group>
                            <TextInput placeholder='' size='xs'  />
                            </Group>
                        </Group>

                        <Button onClick={() => {makePayments()}} >Continue</Button>
        </Modal>
        <Paper mt="lg" shadow="sm" p="md">
            <Group spacing="lg" position="right">
                <Tooltip label="New Payment">
                    <ActionIcon onClick={() => {setOpened(true)}} >
                        <IconPlus />
                    </ActionIcon>
                </Tooltip>
            </Group>

            <Group mb={20} position="apart">
                <Group position="left">
                <TextInput placeholder='Search transaction' size='xs' radius={28} />
                </Group>
            </Group>

            <div style={{overflowX: 'auto'}}>
                <Table fontSize="xs">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Transaction ID</th>
                            <th>Amount</th>
                            <th>Description</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td colSpan={7}>
                                <Center>
                                    <Text size="xs">No data is available</Text>
                                </Center>
                            </td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        </Paper>

        </>
    )
}