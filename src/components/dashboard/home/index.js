import { ColorSwatch, Text, Group, Paper, SimpleGrid, Anchor, Title as MantineTitle, useMantineColorScheme, useMantineTheme, ActionIcon} from '@mantine/core';
import { useLocalStorage, useViewportSize } from '@mantine/hooks';
import { BreadcrumbsSlash } from "../../BreadCrumbs/";
import { AuthContext } from '../../../App';
import { useContext, useEffect, useState } from 'react';
import { AlertCircle, X } from 'tabler-icons-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  BarElement,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import { faker } from '@faker-js/faker';
import Statistics from './Statistics';
import axios from '../../../utils/axios';
import toast from 'react-hot-toast';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
      position: 'top',
    },
    title: {
      display: false,
      text: 'Chart.js Line Chart',
    },
  },
};


function HomePage() {
  const theme2 = useMantineColorScheme();
  const { state, dispatch } = useContext(AuthContext);

  const items = [
    { title: 'app', href: '/app/' },
    { title: 'Dashboard', href: '#' },
  ].map((item, index) => (
    <Anchor size="xs" href={item.href} key={index}>
      {item.title}
    </Anchor>
  ));

  const [complains, setComplains] = useState([]);
  const [tenants, setTenants] = useState([]);
  
  const [jan, setJan] = useState(0);
  const [feb, setFeb] = useState(0);
  const [march, setMarch] = useState(0);
  const [apr, setApr] = useState(0);
  const [may, setMay] = useState(0);
  const [june, setJune] = useState(0);
  const [july, setJuly] = useState(0);
  const [aug, setAug] = useState(0);
  const [sep, setSep] = useState(0);
  const [oct, setOct] = useState(0);
  const [nov, setNov] = useState(0);
  const [dec, setDec] = useState(0);

  const [jan2, setJan2] = useState(0);
  const [feb2, setFeb2] = useState(0);
  const [march2, setMarch2] = useState(0);
  const [apr2, setApr2] = useState(0);
  const [may2, setMay2] = useState(0);
  const [june2, setJune2] = useState(0);
  const [july2, setJuly2] = useState(0);
  const [aug2, setAug2] = useState(0);
  const [sep2, setSep2] = useState(0);
  const [oct2, setOct2] = useState(0);
  const [nov2, setNov2] = useState(0);
  const [dec2, setDec2] = useState(0);

  const [jan3, setJan3] = useState(0);
  const [feb3, setFeb3] = useState(0);
  const [march3, setMarch3] = useState(0);
  const [apr3, setApr3] = useState(0);
  const [may3, setMay3] = useState(0);
  const [june3, setJune3] = useState(0);
  const [july3, setJuly3] = useState(0);
  const [aug3, setAug3] = useState(0);
  const [sep3, setSep3] = useState(0);
  const [oct3, setOct3] = useState(0);
  const [nov3, setNov3] = useState(0);
  const [dec3, setDec3] = useState(0);

  useEffect(() => {
    for(let i=0; i<tenants.length; i++){
      let item = tenants[i];
      if(item.role !== "tenant"){
        continue
      }
      let createdAt = new Date(item.createdAt).getMonth();

      switch(createdAt){
        case 1:
          setJan3(prevVal => (prevVal + 1));
          break;

        case 2:
          setFeb3(prevVal => (prevVal + 1));
          break;

        case 3:
          setMarch3(prevVal => (prevVal + 1));
          break;

        case 4:
          setApr3(prevVal => (prevVal + 1));
          break;

        case 5:
          setMay3(prevVal => (prevVal + 1));
          break;

        case 6:
          setJune3(prevVal => (prevVal + 1));
          break;

        case 7:
          setJuly3(prevVal => (prevVal + 1));
          break;

        case 8:
          setAug3(prevVal => (prevVal + 1));
          break;

        case 9:
          setSep3(prevVal => (prevVal + 1));
          break;

        case 10:
          setOct3(prevVal => (prevVal + 1));
          break;

        case 11:
          setNov3(prevVal => (prevVal + 1));
          break;

        default:
          setDec3(prevVal => (prevVal + 1));
          break;
      }
    }
  }, [tenants]);

  useEffect(() => {
    for(let i=0; i<complains.length; i++){
      let item = complains[i];
      if(item.status !== "Sorted"){
        continue;
      }
      let createdAt = new Date(item.createdAt).getMonth();

      switch(createdAt){
        case 1:
          setJan2(prevVal => (prevVal + 1));
          break;

        case 2:
          setFeb2(prevVal => (prevVal + 1));
          break;

        case 3:
          setMarch2(prevVal => (prevVal + 1));
          break;

        case 4:
          setApr2(prevVal => (prevVal + 1));
          break;

        case 5:
          setMay2(prevVal => (prevVal + 1));
          break;

        case 6:
          setJune2(prevVal => (prevVal + 1));
          break;

        case 7:
          setJuly2(prevVal => (prevVal + 1));
          break;

        case 8:
          setAug2(prevVal => (prevVal + 1));
          break;

        case 9:
          setSep2(prevVal => (prevVal + 1));
          break;

        case 10:
          setOct2(prevVal => (prevVal + 1));
          break;

        case 11:
          setNov2(prevVal => (prevVal + 1));
          break;

        default:
          setDec2(prevVal => (prevVal + 1));
          break;
      }
    }
  }, [complains]);

  useEffect(() => {
    for(let i=0; i<complains.length; i++){
      let item = complains[i];
      if(item.status !== "Pending"){
        continue;
      }
      let createdAt = new Date(item.createdAt).getMonth();

      switch(createdAt){
        case 1:
          setJan(prevVal => (prevVal + 1));
          break;

        case 2:
          setFeb(prevVal => (prevVal + 1));
          break;

        case 3:
          setMarch(prevVal => (prevVal + 1));
          break;

        case 4:
          setApr(prevVal => (prevVal + 1));
          break;

        case 5:
          setMay(prevVal => (prevVal + 1));
          break;

        case 6:
          setJune(prevVal => (prevVal + 1));
          break;

        case 7:
          setJuly(prevVal => (prevVal + 1));
          break;

        case 8:
          setAug(prevVal => (prevVal + 1));
          break;

        case 9:
          setSep(prevVal => (prevVal + 1));
          break;

        case 10:
          setOct(prevVal => (prevVal + 1));
          break;

        case 11:
          setNov(prevVal => (prevVal + 1));
          break;

        default:
          setDec(prevVal => (prevVal + 1));
          break;
      }
    }
  }, [complains]);
  useEffect(() => {
    try{
      axios.post("/complains/getcomplains", {
        username: state.userData.username
      }).then(function(res){
        if(res.status === 200){
          setComplains(res.data.data);
          console.log(res.data.data);
        }
      }).catch(function(error){
        toast.error("Sorry!complains data cannot be fetched!");
      })
    } catch(error){
      toast.error("Sorry!complains data cannot be fetched!");
    }
  }, []);

  useEffect(() => {
    try{
      axios.post("/auth/tenants", {
        username: state.userData.username
      }).then(function(res){
        if(res.status === 200){
          setTenants(res.data.data);
        }
      }).catch(function(error){
        toast.error("Sorry!tenants data cannot be fetched!");
      })
    } catch(error){
      toast.error("Sorry!tenants data cannot be fetched!");
    }
  }, []);

  const theme = useMantineTheme()

  const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  const data = {
      labels,
      datasets: [
        {
          label: 'Settled',
          data: [jan2, feb2, march2, apr2, may2, june2, july2, aug2, sep2, oct2, nov2, dec2],
          borderColor: theme.colors.green[8],
          backgroundColor: theme.colors.green[8],
        },
        {
          label: 'Pending',
          data: [jan, feb, march, apr, may, june, july, aug, sep, oct, nov, dec],
          borderColor: "red",
          backgroundColor: "red",
        },
      ],
    };

    const data2 = {
      labels,
      datasets: [
        {
          label: 'Tenants',
          data: [jan3, feb3, march3, apr3, may3, june3, july3, aug3, sep3, oct3, nov3, dec3],
          borderColor: theme.colors.green[8],
          backgroundColor: theme.colors.green[8],
        },
      ],
    };

  return (
    <>
    <Group mb={20} position='apart'>
      <Group position='left'>
      <MantineTitle order={4} weight={300}>Welcome, {state.userData.username}</MantineTitle>
      </Group>
      <Group position='right'>
        <BreadcrumbsSlash items={items} />
      </Group>
    </Group>

    <Statistics complains={complains.length} tenants={tenants.length} />
    <SimpleGrid
      cols={2}
      spacing="lg"
      breakpoints={[
        { maxWidth: 980, cols: 2, spacing: 'md' },
        { maxWidth: 755, cols: 1, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      <Paper withBorder shadow="xs" p="md" >
        <Group mb={20} >
            <MantineTitle order={4}>Complaints</MantineTitle>
        </Group>
        <Group position='apart' mb={20}>
            <Group position='left'>
                <Text color="dimmed" >Settled vs Pending</Text>
            </Group>
            <Group spacing={5} position='right'>
                <Group spacing={3} >
                <ColorSwatch size={10} color={theme.colors.green[8]} />
                <Text color="dimmed"  size='xs' >Settled</Text>
                </Group>
                <Group spacing={3} >
                <ColorSwatch size={10} color={theme.colors.red[8]} />
                <Text color="dimmed"  size='xs' >Pending</Text>
                </Group>
            </Group>
        </Group>

        <Line options={options} data={data} />
      </Paper>
      
      <Paper withBorder shadow="xs" p="md" >
      <Group mb={20} >
            <MantineTitle order={4}>Tenants</MantineTitle>
        </Group>

        <Bar options={options} data={data2} />
      </Paper>
    </SimpleGrid>
    </>
  )
}

export default HomePage;