import { ColorSwatch, Select, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button} from '@mantine/core';
import { useLocalStorage, useViewportSize } from '@mantine/hooks';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useState, useEffect } from 'react';
import { AlertCircle, X } from 'tabler-icons-react';
import toast from 'react-hot-toast';
import axios from '../../utils/axios';

function AddUnit() {
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
  const [house, setHouse] = useState("");
  const [rooms, setRooms] = useState(0);
  const [watercost, setWaterCost] = useState(0);
  const [garbageCost, setGarbageCost] = useState(0);
  const [rent, setRent] = useState(0);
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    try {
        const body = {
            username: state.userData._id
        };

        axios.post("/properties/getproperties", body).then(function(res){
          let arr = []; 
          for(let i=0; i<res.data.data.length; i++){
            let item = res.data.data[i];
            arr.push({label: item.name, value: item.name})
           }

          setProperties(arr);
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

  const saveDetails = () => {
    try{
      const body = {
        house: house,
        username: username,
        roomNumber: rooms,
        rent: rent,
        water: water,
        watercost: watercost,
        garbage: garbage,
        garbageCost: garbageCost
      };

      axios.post("/units/create", body).then(function(res){
        if(res.status === 200){
          toast.success("House unit added!")
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
        <Select value={house} onChange={(val) => {setHouse(val)}} mt="md" label="House" description="House to add unit" data={properties} />
        <NumberInput value={rooms} onChange={(val) => {setRooms(val)}} label="Room Number" description="" mt="md" required />
        <Text size="xs" mt="md" color="dimmed">Additional parameters</Text>
        <Switch checked={water} onChange={(e) => {setWater(e.currentTarget.checked)}} label="Water" description="Does tenants pay for water?" mt="md" />
        {water ? <NumberInput value={watercost} onChange={(val) => {setWaterCost(val)}} label="Water Cost" description="Cost to be incurred by tenant per month" mt="md" required /> : null}
        <Switch checked={garbage} onChange={(e) => {setGarbage(e.currentTarget.checked)}} label="Garbage" description="Does tenants pay for garbage?" mt="md" />
        {garbage ? <NumberInput value={garbageCost} onChange={(val) => {setGarbageCost(val)}} label="Garbage Cost" description="Cost to be incurred by tenant per month" mt="md" required/> : null}
        <NumberInput value={rent} onChange={(val) => {setRent(val)}} label="Rent" description="Per month" mt="md" />

        <Button onClick={() => {saveDetails()}} mt="md" >Save Details</Button>
    </Paper>
    </>
  )
}

export default AddUnit;