import { ColorSwatch, Text, Avatar, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Menu} from '@mantine/core';
import { useLocalStorage, useViewportSize } from '@mantine/hooks';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, Dots, X } from 'tabler-icons-react';
import { IconFileExport, IconPlus } from '@tabler/icons';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from '../../utils/axios';

function PropertyList() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Property List', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));
  const [properties, setProperties] = useState([]);

  const deleteProperty = (id) => {
    try {
        const body = {
            id: id
        };

        axios.post("/properties/deletehouse", body).then(function(res){
            if(res.status === 200){
                let idx = properties.findIndex((obj => obj._id === id));
                if(idx !== -1){
                    properties.splice(idx, 1);
                    setProperties([...properties]);
                    toast.success("Property deleted successfully");
                }
            } else {
                toast.error("Something wrong happened!");
            }
        })
    } catch(error){
        toast.error("Something wrong happened!")
    }
  }

  const convertToCSV = (arr) => {
    const array = [Object.keys(arr[0])].concat(arr)
  
    return array.map(it => {
      return Object.values(it).toString()
    }).join('\n')
  }

  const downloadCSV = () => {
    let csv = convertToCSV(properties);

    var downloadLink = document.createElement("a");
    var blob = new Blob(["\ufeff", csv]);
    var url = URL.createObjectURL(blob);
    downloadLink.href = url;
    downloadLink.download = "TMS-"+new Date().getMilliseconds()+".csv";

    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  }

  useEffect(() => {
    try {
        const body = {
            username: state.userData._id
        };

        axios.post("/properties/getproperties", body).then(function(res){
            setProperties(res.data.data);
        }).catch(function(error){
            toast.error(error.message, {
                position: "bottom-right"
            });
        })
    } catch(error){
        toast.error(error.message, {
            position: "bottom-right"
        });
    }
  }, []);

  const theme = useMantineTheme()
  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Property List</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">
        <Group spacing="lg" position='right'>
            <Tooltip label="Export data as CSV">
            <ActionIcon onClick={() => {downloadCSV()}} >
                <IconFileExport />
            </ActionIcon>
            </Tooltip>
            <Tooltip label="Add new Property" >
            <ActionIcon component={Link} to="/app/properties/add-property" >
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
                   Total Units
                </th>
                <th>
                    Empty Units
                </th>
                <th>
                    Occupied Units
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
            {properties.length === 0 ? (
                            <tr>
                            <td colSpan={7}>
                                <Center>
                                    <Text size="xs">No data is available</Text>
                                </Center>
                            </td>
                        </tr>
            ) : (
                properties.map((item, index) => {
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
                                        <Menu.Item onClick={() => {deleteProperty(item._id)}} >Delete</Menu.Item>
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

export default PropertyList;