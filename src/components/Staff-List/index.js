import { ColorSwatch, Avatar, Menu, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Input, Select, Box, List} from '@mantine/core';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IconFileExport, IconPlus } from "@tabler/icons"
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import { Dots } from 'tabler-icons-react';

function StaffList() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Staff List', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
const [staff, setStaff] = useState([]);
  const theme = useMantineTheme()

  
  useEffect(() => {
    try {
        const body = {
            username: state.userData.username
        };

        axios.post("/staff/getall", body).then(function(res){
            if(res.status === 200){
                setStaff(res.data.data);
            }
        })
    } catch(error){
        console.log(error);
    }
  }, []);

  const deleteStaff = (id) => {
    // delete staff
  }

  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Staff/Agent/Caretaker/Employee List</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">
        <Group spacing="lg" position='right'>
            <Tooltip label="Export data as CSV">
            <ActionIcon>
                <IconFileExport />
            </ActionIcon>
            </Tooltip>
            <Tooltip label="Add New Staff" >
            <ActionIcon component={Link} to="/app/staff/add-staff" >
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
                   ID
                </th>
                <th>
                    Phone
                </th>
                <th>
                    House
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {staff.length === 0 ? (
            <tr>
                <td colSpan={7}>
                    <Center>
                        <Text size="xs">No data is available</Text>
                    </Center>
                </td>
            </tr>
        ) : (
            staff.map((item, index) => {
                return (
                    <tr>
                        <td>
                            {index+1}
                        </td>
                        <td>
                            <Avatar radius="xl" >H</Avatar>
                        </td>
                        <td>
                            {item.fullname }
                        </td>
                        <td>
                            {item.idnumber}
                        </td>
                        <td>
                            {item.phone}
                        </td>
                        <td>
                            {item.house}
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
                                    <Menu.Item onClick={() => {deleteStaff(item._id)}} >Delete</Menu.Item>
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
    </Paper>

    </>
  )
}

export default StaffList;