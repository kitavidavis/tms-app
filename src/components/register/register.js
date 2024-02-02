import {
  TextInput,
  PasswordInput,
  Container,
  Button,
  Checkbox,
  Text,
  Anchor,
  Divider,
  Radio,
  Paper
} from '@mantine/core';
import {  useMemo, useEffect, useContext, useState} from 'react';
import toast from 'react-hot-toast';
import axios from '../../utils/axios';
import { Link, useLocation } from 'react-router-dom';
import styles from "./register.module.css";
import { AuthContext } from '../../App';
import { SESSION_DATA } from '../../constants';

function useQuery() {
  const { search } = useLocation();

  return useMemo(() => new URLSearchParams(search), [search]);
}

const Register = () => {
  const { state, dispatch } = useContext(AuthContext);
  let query = useQuery();
  const [r, setR] = useState(query.get("role") || "")
  const [checked, setChecked] = useState(r === "user" ? true : r === "" ? true : false);
  const [checked2, setChecked2] = useState(r=== "tenant" ? true : false);
  const [checked3, setChecked3] = useState(r=== "employee" ? true : false);
  const [checked4, setChecked4] = useState(r=== "fundi" ? true : false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [step, setStep] = useState(0);

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
  
  const submitDetails = async () => {
    if(email === ""){
      toast.error("Email is required!");
      return false;
    }

    if(password === ""){
      toast.error("Password is required");
      return false;
    }

    if(phonenumber === ""){
      toast.error("Phone number is required");
      return false;
    }

    try {
      const body = {
        username: email,
        password: password,
        phonenumber: phonenumber,
        role: checked ? "user" : checked2 ? "tenant" : checked3 ? "employee" : "fundi"
      }
      axios.post("/auth/register", body).then(({
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
      toast.error("Something wrong happened!");
    }
  }

  return (
    <>
    <Container size={600} my={40}>
    <h1 className={styles.title}>Create account</h1>
    <p className={styles.subtitle}>
            {step === 0 ? "Choose account" : "Personal details"}
          </p>
          {step === 0 ? (
      <>
          <Paper onClick={() => {
      setChecked(true)
      setChecked2(false);
      setChecked3(false);
      setChecked4(false);
      }} sx={(theme) => ({backgroundColor: checked ? theme.fn.variant({ variant: 'light' }).background : "transparent", cursor: "pointer"})} mb={10} withBorder p="md">
      <Radio onChange={() => {}} checked={checked} label="House owner user" />
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
    ) :(
      <>
      <TextInput value={email} onChange={(e) => {setEmail(e.currentTarget.value)}} label={checked ? "Admin user email address" : checked2 ?  "Tenant user email address" : checked3 ? "Employee user email address" : "Fundi user email address"} required />
      <TextInput value={phonenumber} onChange={(e) => {setPhonenumber(e.currentTarget.value)}} label="Phone Number" placeholder="" mt="md" required />
    <PasswordInput value={password} onChange={(e) => {setPassword(e.currentTarget.value)}} label="Password" required mt="md" />
    <Button mb={20} fullWidth onClick={() => {submitDetails()}} mt="lg">Register Account</Button>
      </>
    )}
    <Text mb={20} color="dimmed" size="sm" inline >By continuing, you agree to <Anchor>TMS Customer Agreement</Anchor> or other agreements for TMS services, and the 
        <Anchor>Privacy Notice</Anchor>. This site uses essential cookies. See our <Anchor>Cookie Notice</Anchor> for more information.</Text>
  
        <Divider mb={20} labelPosition="center" label="Already a memebr?" />
  
  <Button variant='outline' component={Link} to="/account/login" color="dimmed" fullWidth>Login</Button>

</Container>
</>
  );
};

export default Register;
