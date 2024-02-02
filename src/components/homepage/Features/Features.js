import {
    createStyles,
    Badge,
    Group,
    Title,
    Text,
    Card,
    SimpleGrid,
    Container,
  } from '@mantine/core';
  import { IconGauge, IconUser, IconCookie, IconChartBar, IconNetwork, IconShieldLock, IconAdjustments, IconCoin, IconMail, IconCreditCard, IconReport, IconUserCircle, IconDatabase, IconReportAnalytics, IconPhone } from '@tabler/icons';
import { ChartBar } from 'tabler-icons-react';
  
  const mockdata = [
    {
      title: 'Online based',
      description:
        'You can access the system from anywhere, any time and using any browser based device. Centralize your operations on a cloud platform that can scale as your business grows.',
      icon: IconNetwork,
    },
    {
      title: 'Secure',
      description:
        'Our hardware and performance testing, 24/7 system monitoring combined with stringent security measures ensure downtime is minimized and your data is always safe.',
      icon: IconShieldLock,
    },
    {
      title: 'Recurrent Tasks',
      description:
        'Dont sweat the small stuff. EazzyRent will automate all your recurrent tasks such as invoicing, unit rates adjustments, reminders and receipting of payments.',
      icon: IconAdjustments,
    },
    {
      title: 'Online Rent Processing',
      description:
        'Collect rent faster by taking advantage of integrations to your paybill and bank accounts. Rent is received automatically and receipt sent to the tenant via sms and email in real time.',
      icon: IconCoin,
    },
    {
      title: 'Bulk SMS/Email',
      description:
        'Communicate with tenants, landlords, staff members and other stake holders. Send receipts, invoices, statements and reminders.',
      icon: IconMail,
    },
    {
      title: 'Debt Control',
      description:
        'EazzyRent provides you with tools to keep an eye on your tenants debt levels such as reminders, demand notes, quit notice and a workflow to assign debt recovery tasks to different stake holders.',
      icon: IconCreditCard,
    },
    {
      title: 'Landlord Statements',
      description:
        'Prepare landlord statements for the month at the click of a button. Capture expenses such as repairs, advance payments, loans, your management commission and see them reflect in the statement.',
      icon: IconReport,
    },
    {
      title: 'Accounts',
      description:
        'Have a clear view of the health of your business without having to worry if the books are in order. Your transactions will be posted accurately and in real time to correct ledgers.',
      icon: IconUserCircle,
    },
    {
      title: 'Document Management',
      description:
        'Spend less time on paper work. The system will auto generate lease documents, demand letters, quit notice among other document. Backup your other documents by uploading them in the system.',
      icon: IconDatabase,
    },
    {
      title: 'Reports',
      description:
        'Get a snapshot of what is happening through charts and graphs. Narrow information to what you specifically need from a wide array of available reports.',
      icon: IconReportAnalytics,
    },
    {
      title: 'Support',
      description:
        'Get support when you need it. We provide you with multiple support channels such as phone calls, email, QA and chat to keep your business moving.',
      icon: IconPhone,
    },
    
  ];
  
  const useStyles = createStyles((theme) => ({
    title: {
      [theme.fn.smallerThan('sm')]: {
        fontSize: 24,
      },
    },
  
    description: {
      maxWidth: 600,
      margin: 'auto',
  
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
  
    card: {
      border: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1]
      }`,
    },
  
    cardTitle: {
      '&::after': {
        content: '""',
        display: 'block',
        backgroundColor: theme.fn.primaryColor(),
        width: 45,
        height: 2,
        marginTop: theme.spacing.sm,
      },
    },
    wrapper: {
        backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : "#ffff",
    }
  }));
  
  export function FeaturesCards() {
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
        <div className={classes.wrapper} >
      <Container size="lg" py="xl">

        <Title weight={300} order={2} className={classes.title} align="center" mt="sm">
          Technology that Integrates effortlessly
        </Title>
  
        <Text color="dimmed" className={classes.description} align="center" mt="md">
          Core features ensures that you enjoy the following benefits:
        </Text>
  
        <SimpleGrid cols={3} spacing="xl" mt={50} breakpoints={[{ maxWidth: 'md', cols: 1 }]}>
          {features}
        </SimpleGrid>
      </Container>
      </div>
    );
  }