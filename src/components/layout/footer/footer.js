import { createStyles, useMantineColorScheme, Container, Group, Anchor, Center } from '@mantine/core';
import LogoWhite from "../../../assets/logo/logo-white.jpg";
import LogoBlue from "../../../assets/logo/logo-blue.jpg";

const useStyles = createStyles((theme) => ({
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[2]
    }`,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : "#ffff",
    bottom: 0,
    left: 0,
    right: 0
  },

  inner: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,

    [theme.fn.smallerThan('xs')]: {
      flexDirection: 'column',
    },
  },

  links: {
    [theme.fn.smallerThan('xs')]: {
      marginTop: theme.spacing.md,
    },
  },
}));

const links = [
    {
      "link": "#",
      "label": "Contact"
    },
    {
      "link": "#",
      "label": "Privacy"
    },
    {
      "link": "#",
      "label": "Blog"
    },
    {
      "link": "#",
      "label": "Careers"
    }
  ];

export function FooterPage({fixed=true}) {
  const { classes } = useStyles();
  const theme = useMantineColorScheme()
  const items = links.map((link) => (
    <Anchor
      color="dimmed"
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size="sm"
    >
      {link.label}
    </Anchor>
  ));

  return (
    <footer style={{position: fixed ? "fixed" : "relative"}} className={classes.footer}>
      <Container className={classes.inner}>
        <a href="/">
          <Center sx={(theme) => theme.fn.focusStyles()}>
            <img src={theme.colorScheme === "dark" ? LogoWhite : LogoBlue} height={40} width={140} />
          </Center>
        </a>
        <Group className={classes.links}>{items}</Group>
      </Container>
    </footer>
  );
}