import { useLocalStorage } from "@mantine/hooks";
import React, { useReducer } from "react";
import { useState } from "react";
import { SidebarContext } from "./sidebar.context";

export const SidebarProvider = ({ children }) => {
    const [width, setWidth] = useLocalStorage({
        key: "sidebar-width",
        defaultValue: 250,
        getInitialValueInEffect: true
    });

      const reducer = (state, action) => {
        switch(action.type) {
            case 'TOGGLE':
                return {
                    ...state,
                    opened: !state.opened,
                };
                
            case 'MINIFY':
                setWidth(50);
                return {
                    ...state,
                    width: 50
                };
                
            case 'MAXIFY':
                setWidth(250)
                return {
                    ...state,
                    width: 250
                };
    
            default:
                return state;
        }
    }

    const initialState = {
        opened: true, //depends with how you understand an hidden, opened sidebar,
        width: width
    };
    const [state, dispatch] = useReducer(reducer, initialState);
    return (
        <SidebarContext.Provider value={{state, dispatch}}>
            {children}
        </SidebarContext.Provider>
    )
}