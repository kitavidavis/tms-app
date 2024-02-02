import {
    createStyles,
    Paper,
    Title,
    Text,
    TextInput,
    Button,
    Container,
    Group,
    Anchor,
    Center,
    Box,
  } from '@mantine/core';
  import { IconArrowLeft } from '@tabler/icons';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { nanoid } from 'nanoid';
import axios from "../../utils/axios";
import { FooterPage } from '../layout/footer/footer';

  const useStyles = createStyles((theme) => ({
    title: {
      fontSize: 26,
      fontWeight: 900,
      fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    },
  
    controls: {
      [theme.fn.smallerThan('xs')]: {
        flexDirection: 'column-reverse',
      },
    },
  
    control: {
      [theme.fn.smallerThan('xs')]: {
        width: '100%',
        textAlign: 'center',
      },
    },
  }));
  
  export default function ForgotPassword() {
    const { classes } = useStyles();
    const [email, setEmail] = useState("");

    const sendLink = async () => {
        if(email === ""){
          toast.error("Email is empty");
            return false;
        }

        const body = {
          username: email,
          creatorID: nanoid(32),
          expireAt: 1000 * 60 * 10 // 10 minutes
        };

        axios.post("/forgotPassword/createToken", body).then(({data: {data: token}, }) => {
          const body2 = {
            username: token.username,
            creatorID: token.creatorID
          };

          axios.post("/forgotPassword/sendmail", body2).then(({data: {data: senddata}, }) => {
            toast.success("An email with reset link has been sent to "+ email)
          })
        })
    }
  
    return (
      <>
      <Container size={460} my={30}>
        <Title className={classes.title} align="center">
          Forgot your password?
        </Title>
        <Text color="dimmed" size="sm" align="center">
          Enter your email to get a reset link
        </Text>
  
        <Paper withBorder shadow="md" p={30} radius="md" mt="xl">
          <TextInput value={email} onChange={(e) => {setEmail(e.currentTarget.value)}} label="Your email" placeholder="" required />
          <Group position="apart" mt="lg" className={classes.controls}>
            <Anchor component={Link} to="/account/login" color="dimmed" size="sm" className={classes.control}>
              <Center inline>
                <IconArrowLeft size={12} stroke={1.5} />
                <Box ml={5}>Back to login page</Box>
              </Center>
            </Anchor>
            <Button onClick={() => {sendLink()}} className={classes.control}>Reset password</Button>
          </Group>
        </Paper>
      </Container>
      </>
    );
  }