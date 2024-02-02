import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button} from '@mantine/core';
import { useLocalStorage, useViewportSize } from '@mantine/hooks';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useState } from 'react';
import { AlertCircle, X } from 'tabler-icons-react';
import toast from 'react-hot-toast';
import axios from '../../utils/axios';

function AddProperty() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Add Property', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const theme = useMantineTheme()
  const [water, setWater] = useState(false);
  const [garbage, setGarbage] = useState(false);
  const [username, setUsername] = useState(state.userData._id);
  const [name, setName] = useState("");
  const [rooms, setRooms] = useState(0);
  const [watercost, setWaterCost] = useState(0);
  const [garbageCost, setGarbageCost] = useState(0);
  const [rent, setRent] = useState(0);

  const saveDetails = () => {
    try{
      const body = {
        name: name,
        username: username,
        rooms: rooms,
        rent: rent,
        water: water,
        watercost: watercost,
        garbage: garbage,
        garbageCost: garbageCost
      };

      axios.post("/properties/create", body).then(function(res){
        if(res.status === 200){
          toast.success("House property created!")
        } else {
          toast.error("Something wrong happened.")
        }
      })
    } catch(error){
      toast.error(error.message);
    }
  }
  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Create/Add Property</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">
        <TextInput value={name} onChange={(e) => {setName(e.currentTarget.value)}} label="Name of flat" description="A flat name may be derived from the name of the location where the flat resides" required />
        <NumberInput value={rooms} onChange={(val) => {setRooms(val)}} label="Number of rooms" description="Each room represents a unit." mt="md" required />
        <Button onClick={() => {saveDetails()}} mt="md" >Save Details</Button>
    </Paper>
    </>
  )
}

export default AddProperty;