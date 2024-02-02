import { createContext, useState } from "react";

const [opened, setOpened] = useState(false);

const NavbarContext = createContext({opened, setOpened});

const NavbarContextProvider = ({children}) => {
    return (
        <NavbarContext.Provider value={{opened, setOpened}}>
            {children}
        </NavbarContext.Provider>
    )
}

export { NavbarContext, NavbarContextProvider };