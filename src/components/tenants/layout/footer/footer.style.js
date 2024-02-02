import { createStyles } from '@mantine/core';

export default createStyles((theme) => ({
  footer: {
    bottom: 0,
    paddingBottom: theme.spacing.xl * 5,
    backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[8] : "#ffff",
  },
}));