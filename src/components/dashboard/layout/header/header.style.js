import { createStyles } from '@mantine/styles';
import { useContext } from 'react';

import { SidebarContext } from '../context/sidebar/sidebar.context';

export const HEADER_HEIGHT = 60;

export default createStyles((theme) => {
  const { state, dispatch } = useContext(SidebarContext);
  return ({
    header: {
      position: 'fixed',
      zIndex: 10,
      top: 0,
      [theme.fn.largerThan('md')]: {
        left: state.width,
      },
      [theme.fn.smallerThan('md')]: {
        left: 0,
      },
      right: 0,
      height: HEADER_HEIGHT,
      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.white,
      borderBottom: `1px solid ${
        theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[3]
      }`,
    },
  
    search: {
      [theme.fn.smallerThan('sm')]: {
        display: 'none'
      }
    },
  
    inner: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '100%',
    },
})
});