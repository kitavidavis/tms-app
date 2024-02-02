import { Anchor, Button, Center, FileInput, Group, Paper, Select, Text, Textarea, TextInput, Title } from "@mantine/core";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Check } from "tabler-icons-react";
import { AuthContext } from "../../App";
import axios from "../../utils/axios";
import { BreadcrumbsSlash } from "../BreadCrumbs";

export default function CreateComplain(){
    const { state, dispatch } = useContext(AuthContext);
    const items = [
        {title: 'app', href: '/tenant/'},
        { title: 'Complains', href: '#'},
    ].map((item, index) => (
        <Anchor size="xs" href={item.href} key={index}>
            {item.title}
        </Anchor>
    ));
    const [file, setFile] = useState(null);
    const [house, setHouse] = useState("");
    const [room, setRoom] = useState("");
    const [desc, setDesc] = useState("");
    const [done, setDone] = useState(false);
    const [properties, setProperties] = useState([]);

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

    const createComplain = () => {
        try{
            axios.post("/complains/create", {
                username: state.userData.username,
                house: house,
                room: room,
                description: desc
            }).then(function(res){
                console.log(res.data.data);
                setDone(true);
            }).catch(function(error){
                console.log(error);
                toast.error("Sorry! Something wrong happened!");
            })
        } catch{
            toast.error("Sorry!Something wrong happened!");
        }
    }
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

        <Paper mt="lg" shadow="sm" p="md">
            <Text>Create a new complain</Text>
            {!done ? (
                <>
            <Text mb="md" size="xs">Dear {state.userData.username}, we are sorry for the issue you are experiencing. Please provide us with great details concerning the issue.</Text>
            <Select label="House" description="Description of the house to give complain on" data={properties} value={house} onChange={(val) => {setHouse(val)}} mb="md" />
            <TextInput label="Room number" description="Room number to give complain on(optional)" mb="md" value={room} onChange={(e) => {setRoom(e.currentTarget.value)}} />
            <Textarea label="Detailed description about the issue" minRows={4} mb="md" value={desc} onChange={(e) => {setDesc(e.currentTarget.value)}} />
            <FileInput label="Image" description="(optional)" value={file} onChange={setFile} mb="md" />
            <Button onClick={() => {createComplain()}} >Submit Complain</Button>
                </>
            ) : (
                <>
                <Center mt="10%" >
                    <Check color="green" size={100} />
                </Center>
                <Center mb="10%">
                <Text>Your complain has been send to the house owner!</Text>
                </Center>
                </>
            )}
        </Paper>
        </>
    )
}