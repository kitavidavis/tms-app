import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon, TextInput, NumberInput, Switch, Button, Tooltip, Table, Center, Input, Select, Box, List} from '@mantine/core';
import { BreadcrumbsSlash } from "../BreadCrumbs/";
import { AuthContext } from '../../App';
import { useContext, useEffect, useState } from 'react';
import { InfoCircle, Send, X } from 'tabler-icons-react';
import toast from 'react-hot-toast';
import { nanoid } from 'nanoid';
import axios from '../../utils/axios';

function AddStaff() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);
  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Add Staff', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const theme = useMantineTheme()
    const [fullname, setFullname] = useState("");
    const [idnumber, setIdNumber] = useState("");
    const [username, setUsername] = useState("");
    const [phone, setPhone] = useState("");
    const [house, setHouse] = useState("");
    const [salary, setSalary] = useState("");
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

  const addStaff = () => {
    try {
      const body = {
        fullname: fullname,
        idnumber: idnumber,
        username: state.userData.username,
        email: username,
        phone: phone,
        house: house,
        salary: salary,
        password: nanoid(10)
      };

      axios.post("/staff/create", body).then(function(res){
        if(res.status === 200){
          toast.success("Staff created successfully!");
        } else {
          toast.error("Something wrong happened!");
        }
      })
    } catch(error){
      toast.error("Something wrong happened");
    }
  }

  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Add Staff/Agent/Caretaker/Employee</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Paper shadow="sm" p="md">
        <TextInput value={fullname} onChange={(e) => {setFullname(e.currentTarget.value)}} label="Full Names" description="Full names of the employees" required />
        <TextInput value={idnumber} onChange={(e) => {setIdNumber(e.currentTarget.value)}} mt="md" label="ID Number" description="Identification number of the employee" required />
        <TextInput value={phone} onChange={(e) => {setPhone(e.currentTarget.value)}} mt="md" label="Phone Number" description="Phonenumber of the employee" required />
        <Select value={house} onChange={(val) => {setHouse(val)}} mt="md" label="House" description="House to manage" data={properties} />
        <TextInput value={salary} onChange={(e) => {setSalary(e.currentTarget.value)}} mt="md" label="Salary" description="Salary of the employee" required />
        <Button onClick={() => {addStaff()}} mt="md" >Save Details</Button>
    </Paper>

    </>
  )
}

export default AddStaff;