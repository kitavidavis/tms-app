import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Container,
  Group,
  Button,
  Center,
  ActionIcon,
  Radio,
  Paper,
  Text,
  Divider,
} from '@mantine/core';
import {  useContext, useState, useMemo, useEffect} from 'react';
import toast from 'react-hot-toast';
import { Lock } from 'tabler-icons-react';
import styles from "./login.module.css";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from '../../utils/axios';
import { AuthContext } from '../../App';
import { SESSION_DATA } from '../../constants';
import { useForm } from "@mantine/form";

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  let query = useQuery();
  const [r, setR] = useState(query.get("role") || "")
  const [checked, setChecked] = useState(r === "user" ? true : r === "" ? true : false);
  const [checked2, setChecked2] = useState(r=== "tenant" ? true : false);
  const [checked3, setChecked3] = useState(r=== "employee" ? true : false);
  const [checked4, setChecked4] = useState(r=== "fundi" ? true : false);
  const [step, setStep] = useState(1);
  const form = useForm({
    initialValues: { email: "", password: ""},
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
      password: (value) => (value.length < 2 ? 'Password must have at least 8 characters' : null),
    },
    validateInputOnBlur: true
  });

  useEffect(() => {
    if(checked){
      window.history.replaceState(null, "Admin Login", "?role=user")
    } else if(checked2) {
      window.history.replaceState(null, "Tenant Login", "?role=tenant")
    } else if(checked3){
      window.history.replaceState(null, "Employee Login", "?role=employee")
    } else {
      window.history.replaceState(null, "Fundi Login", "?role=fundi")
    }
}, [checked, checked2, checked3, checked4])

  const onSubmit = async (obj) => {
      try {
        const body = {
          username: obj.email,
          password: obj.password
        };
  
        axios.post("/auth/login", body).then(({
          data: {
            data: accountData,
            token: accessToken
          },
        }) => {
          localStorage.setItem(SESSION_DATA, accessToken);
          dispatch({type: "SIGN_IN", token: accessToken, data: accountData});
        }).catch((error) => {
          console.log(error);
          toast.error(error?.response?.data?.message || error.message)
        })
      } catch(error){
        console.log(error);
        toast.error(error?.response?.data?.message || error.message);
      }
  }

  return (
    <>
    <Container size={600} my={20}>
    <h1 className={styles.title}>Sign In</h1>
    <Center mb={20} mt={10} >
    <ActionIcon size="lg" radius={28} style={{backgroundColor: 'red', cursor: 'text'}} >
      <Lock color='white' />
    </ActionIcon>
    </Center>
    <p className={styles.subtitle}>
            {step === 0 ? "Choose account" : "Login details"}
          </p>
    {step === 0 ? (
      <>
          <Paper onClick={() => {
      setChecked(true)
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      }} sx={(theme) => ({backgroundColor: checked ? theme.fn.variant({ variant: 'light' }).background : "transparent", cursor: "pointer"})} mb={10} withBorder p="md">
      <Radio onChange={() => {}} checked={checked} label="Admin user" />
      <Text color="dimmed" size="sm">Account owner that performs core tasks without restrictions</Text>
    </Paper>
    <Paper onClick={() => {
      setChecked(false)
      setChecked2(true);
      setChecked3(false);
      setChecked4(false);
      }} sx={(theme) => ({backgroundColor: checked2 ? theme.fn.variant({ variant: 'light' }).background : "transparent", cursor: "pointer"})} mb={10} withBorder p="md">
      <Radio onChange={() => {}} checked={checked2} label="Tenant user" />
      <Text color="dimmed" size="sm">User with tenant account.</Text>
    </Paper>
    <Paper onClick={() => {
      setChecked(false)
      setChecked2(false);
      setChecked3(true);
      setChecked4(false);
      }} sx={(theme) => ({backgroundColor: checked3 ? theme.fn.variant({ variant: 'light' }).background : "transparent", cursor: "pointer"})} mb={10} withBorder p="md">
      <Radio onChange={() => {}} checked={checked3} label="Employee/Caretaker user" />
      <Text color="dimmed" size="sm">User with employee/caretaker account.</Text>
    </Paper>
    <Paper onClick={() => {
      setChecked(false)
      setChecked2(false);
      setChecked3(false);
      setChecked4(true);
      }} sx={(theme) => ({backgroundColor: checked4 ? theme.fn.variant({ variant: 'light' }).background : "transparent", cursor: "pointer"})} mb={10} withBorder p="md">
      <Radio onChange={() => {}} checked={checked4} label="Fundi user" />
      <Text color="dimmed" size="sm">User with fundi account.</Text>
    </Paper>

    <Button mb={20} fullWidth onClick={() => {setStep(1)}} mt={40}>Continue</Button>
      </>
    ) : (
      <form onSubmit={form.onSubmit((values) => {onSubmit(values)})}>
      <TextInput {...form.getInputProps("email")} placeholder="username@example.com" label={checked ? "Admin user email address" : checked2 ?  "Tenant user email address" : checked3 ? "Employee user email address" : "Fundi user email address"}/>
      <PasswordInput {...form.getInputProps("password")} label="Password" mt="md" />
      <Group position="apart" mt="md">
      <></>
        <Anchor component={Link} to="/account/forgot-password/" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button mb={20} type='submit' fullWidth mt="xl">
        Login
      </Button>
  
    </form>
    )}

<Text mb={20} color="dimmed" size="sm" inline >By continuing, you agree to <Anchor>TMS Customer Agreement</Anchor> or other agreements for TMS services, and the 
        <Anchor>Privacy Notice</Anchor>. This site uses essential cookies. See our <Anchor>Cookie Notice</Anchor> for more information.</Text>
  
        <Divider mb={20} labelPosition="center" label="New to TMS?" />
  
  <Button variant='outline' component={Link} to="/account/register" color="dimmed" fullWidth>Create a new TMS account</Button>


</Container>
</>
  );
};

export default Login;
