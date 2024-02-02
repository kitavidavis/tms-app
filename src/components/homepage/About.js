import { createStyles, Title, Text, Button, Card, Container, ActionIcon, Center, SimpleGrid } from '@mantine/core';
import { Icon3dCubeSphere, IconGauge, IconChartBar,IconCookie, IconRocket, IconInbox, IconDashboard, IconTool, IconMail } from '@tabler/icons';
import { InfoCircle } from 'tabler-icons-react';

const mockdata = [
    {
      title: 'Core PMS',
      description:
        'Create landlords, properties, units and tenants. Invoice for rent, service charge, utility bills and repairs. Create landlord and tenant statements all these with simple intuitive steps. Repetitive tasks are automated.',
      icon: IconTool,
    },
    {
      title: 'Accounting',
      description:
        'Your accounting transactions are recorded in real time as you transact. Manage company expenses, suppliers and other transactions. Prepare for auditing and returns by easily generating relevant reports such as trial balance, income statement and balance sheet.',
      icon: IconMail,
    },
    {
      title: 'Other Features',
      description:
        'Landlords and tenants self service portal, Bulk payments for landlords and tenants through b2b and b2c disbursements, schedule repetitive tasks, system logs and advanced security.',
      icon: IconRocket,
    },
];

const useStyles = createStyles((theme) => ({
  wrapper: {
    position: 'relative',
    paddingTop: 40,
    paddingBottom: 80,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[0],

    '@media (max-width: 755px)': {
      paddingTop: 80,
      paddingBottom: 60,
    },
  },

  inner: {
    position: 'relative',
    zIndex: 1,
  },

  dots: {
    position: 'absolute',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],

    '@media (max-width: 755px)': {
      display: 'none',
    },
  },

  dotsLeft: {
    left: 0,
    top: 0,
  },

  title: {
    textAlign: 'center',
    letterSpacing: -1,
    color: theme.colorScheme === 'dark' ? theme.white : theme.black,
    marginBottom: theme.spacing.xs,
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,

    '@media (max-width: 520px)': {
      fontSize: 28,
      textAlign: 'left',
    },
  },

  highlight: {
    color: theme.colors[theme.primaryColor][theme.colorScheme === 'dark' ? 4 : 6],
  },

  description: {
    textAlign: 'center',

    '@media (max-width: 520px)': {
      textAlign: 'left',
      fontSize: theme.fontSizes.md,
    },
  },

  controls: {
    marginTop: theme.spacing.lg,
    display: 'flex',
    justifyContent: 'center',

    '@media (max-width: 520px)': {
      flexDirection: 'column',
    },
  },

  control: {
    '&:not(:first-of-type)': {
      marginLeft: theme.spacing.md,
    },

    '@media (max-width: 520px)': {
      height: 42,
      fontSize: theme.fontSizes.md,

      '&:not(:first-of-type)': {
        marginTop: theme.spacing.md,
        marginLeft: 0,
      },
    },
  },
}));

export function About() {
  const { classes, theme } = useStyles();

  const features = mockdata.map((feature) => (
    <Card key={feature.title} shadow="md" radius="md" className={classes.card} p="xl">
      <feature.icon size={50} stroke={2} color={theme.fn.primaryColor()} />
      <Text size="lg" weight={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text size="sm" color="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container className={classes.wrapper} size={1400}>

      <div className={classes.inner}>
        <Center mt={30} mb={30} >
        <ActionIcon style={{backgroundColor: theme.colors.blue[9]}}>
        <Icon3dCubeSphere size={50} stroke={2} color={"white"} />
        </ActionIcon>
        </Center>
        <Title weight={300} order={3} className={classes.title}>
                About Us
        </Title>

        <Container mb={50} p={0} size={600}>
          <Text size="lg" color="dimmed" className={classes.description}>
          The days of switching between excel, word and your accounting software are over. Discover efficiency, speed and convenience in a unified platform. What you get:
          </Text>
        </Container>
            <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </div>
    </Container>
  );
}