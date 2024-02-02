import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Input, Select, Box, List, Loader, Menu, Badge} from '@mantine/core';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { IconFileExport, IconPlus } from "@tabler/icons"
import toast from 'react-hot-toast';
import axios from '../../utils/axios';
import { Dots } from 'tabler-icons-react';

function Complains() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'complaints', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const [ready, setReady] = useState(false);
  const [complains, setComplains] = useState([]);

  useEffect(() => {
    try{
      axios.post("/complains/getcomplains", {
        username: state.userData.username
      }).then(function(res){
        if(res.status === 200){
          setComplains(res.data.data);
          console.log(res.data.data);
        }

        setReady(true);
      }).catch(function(error){
        toast.error("Sorry!Something wrong happened!");
        setReady(true);
      })
    } catch(error){
      toast.error("Sorry!Something wrong happened");
      setReady(true);
    }
  }, []);

  const theme = useMantineTheme()

  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Complaints</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">

    <div style={{overflowX: 'auto'}} >
    <Table fontSize='xs' >
        <thead>
            <tr>
                <th>
                    #
                </th>
                <th>
                    House
                </th>
                <th>
                    Description
                </th>
                <th>
                  Status
                </th>
                <th>
                    Action
                </th>
            </tr>
        </thead>
        <tbody>
        {ready ? (
          complains.length === 0 ? (
            <tr>
            <td colSpan={7}>
                <Center>
                    <Text size="xs">No data is available</Text>
                </Center>
            </td>
        </tr>
          ) : (
            complains.map((item, index) => {
              return (
                <tr key={`complain-row-${index}`} >
                  <td>
                    {index + 1}
                  </td>
                  <td>
                    {item.house}
                  </td>
                  <td>
                    {item.description}
                  </td>
                  <td>
                    <Badge>{item.status}</Badge>
                  </td>
                  <td>
                    <Menu>
                      <Menu.Target>
                        <ActionIcon size="xs">
                          <Dots />
                        </ActionIcon>
                      </Menu.Target>
                    </Menu>
                  </td>
                </tr>
              )
            })
          )
        ) : (
                      <tr>
                <td colSpan={7}>
                    <Center>
                        <Loader variant='bars' size="xs" />
                    </Center>
                </td>
            </tr>
        )}
        </tbody>
    </Table>
    </div>
    </Paper>

    </>
  )
}

export default Complains;