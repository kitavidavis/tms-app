import { useState, useContext, useCallback, useEffect } from 'react';
import { Container, ActionIcon, Group, useMantineColorScheme, MediaQuery, Burger, Select, TextInput, UnstyledButton, Avatar, Text, Indicator, Menu, HoverCard, Button } from '@mantine/core';
import { ArrowLeftCircle, ArrowRightCircle, Bell, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, GridDots, Logout, User } from "tabler-icons-react";
import useStyles from './header.style';
import {ColorSchemeControl } from '@mantine/ds';
import { IconChevronDown, IconSearch, IconArrowRight, IconArrowLeft } from '@tabler/icons';
import { SidebarContext } from '../context/sidebar/sidebar.context';
import { UserInfo } from '../userInfo';
import { useLocation } from 'react-router-dom';

export function Header() {
  const { classes } = useStyles();
  const { state, dispatch } = useContext(SidebarContext);
  const location = useLocation();
  
  const toggleHandler = useCallback(() => {
    dispatch({
      type: 'TOGGLE',
    });
  }, [dispatch]);

  const minifyNav = useCallback(() => {
    dispatch({
      type: 'MINIFY'
    });
  }, [dispatch]);

  const maxifyNav = useCallback(() => {
    dispatch({
      type: 'MAXIFY'
    });
  }, [dispatch]);

  useEffect(() => {
    if(!state.opened){
      dispatch({
        type: 'TOGGLE',
      });
    }
  }, [location.pathname])

  return (
    <div className={classes.header}>
      <Container size="xl" px="md" className={classes.inner}>
        <Group >
        <MediaQuery smallerThan="md" styles={{ display: 'none' }}>
          {state.width === 250 ? (
            <ActionIcon onClick={minifyNav} >
            <ChevronsLeft size={40} />
          </ActionIcon>
          ) : (
            <ActionIcon onClick={maxifyNav} >
            <ChevronsRight size={40} />
          </ActionIcon>
          )}
        </MediaQuery>

        <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
              <Burger
                opened={!state.opened}
                onClick={toggleHandler}
                size="sm"
                color="#868E96"
                mr="xl"
              />
            </MediaQuery>
        </Group>
        <Group spacing={20} >

            <Group sx={(theme) => ({ [theme.fn.smallerThan('sm')]: { display: 'none' } })} >
                <UserInfo/>
            </Group>
                  </Group>
      </Container>
    </div>
  );
}