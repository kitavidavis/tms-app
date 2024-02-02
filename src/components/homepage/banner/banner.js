import { IconExternalLink, IconUserCheck } from '@tabler/icons';
import { GithubIcon } from '@mantine/ds';
import {
  Title,
  Overlay,
  Group,
  Text,
  Button,
  ThemeIcon,
  SimpleGrid,
  Container,
  useMantineTheme,
} from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import data from './data';
import useStyles from './banner.style';
import { Link } from 'react-router-dom';

export function Banner() {
  const { classes, cx } = useStyles();
  const [, scrollTo] = useWindowScroll();
  const theme = useMantineTheme();

  const features = data.map((feature) => (
    <div key={feature.title}>
      <ThemeIcon className={classes.featureIcon} size={44}>
        <feature.icon size={24} stroke={1.5} />
      </ThemeIcon>

      <div className={classes.featureBody}>
        <Text className={classes.featureTitle}>{feature.title}</Text>
        <Text className={classes.featureDescription}>{feature.description}</Text>
      </div>
    </div>
  ));

  return (
    <div className={classes.root}>
    <div className={classes.wrapper}>
      <Container size="xl" px="md">
        <div className={classes.image} />

        <div className={classes.body}>
          <Title className={classes.title}>
            <span className={classes.highlight}>Your One Platform</span>
            <br /> for all real estate operations
          </Title>

          <Text className={classes.description}>
            Managing complex real-estate properties can be a great challenge. Automate tasks and enhance efficient workflows
            by integreting core tools that simplify real-estate operations.
          </Text>

          <Group className={classes.controls}>
            <Button
              className={cx(classes.control, classes.controlMain)}
              onClick={() => scrollTo({ y: 700 })}
            >
              Browse Features
            </Button>
            <Button
              className={cx(classes.control, classes.controlSecondary)}
              leftIcon={<IconUserCheck size={16} />}
              component={Link}
              to="/account/login"
            >
              Login
            </Button>
            <Button
              className={cx(classes.control, classes.controlSecondary)}
              rightIcon={<IconExternalLink size={16} stroke={1.5} />}
              component={Link}
              to="/account/register"
            >
              Get started
            </Button>
          </Group>
          <SimpleGrid
            cols={3}
            spacing="xl"
            className={classes.features}
            style={{ marginTop: 100 }}
            breakpoints={[{ maxWidth: 755, cols: 1, spacing: 'lg' }]}
          >
            {features}
          </SimpleGrid>
        </div>
      </Container>
    </div>
    </div>
  );
}