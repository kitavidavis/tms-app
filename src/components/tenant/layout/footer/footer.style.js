import { useContext } from 'react';
import { createStyles } from '@mantine/styles';
import { HEADER_HEIGHT } from '../header/header.style';
import { SidebarContext } from '../context/sidebar/sidebar.context';

export default createStyles((theme) => {
    const { state, dispatch } = useContext(SidebarContext);
    return ({
        wrapper: {
            position: 'fixed',
            zIndex: 10,
            bottom: 0,
            [theme.fn.largerThan('md')]: {
                left: state.width,
            },
            [theme.fn.smallerThan('md')]: {
                left: 0,
            },
            right: 0,
            height: HEADER_HEIGHT,
            backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[7] : "white",
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 20,
            marginTop: 40,
          },
        
          productOf: {
            [theme.fn.smallerThan('md')]: {
                display: 'none'
            },
          }
        })

});