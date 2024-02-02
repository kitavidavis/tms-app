import { createContext, useEffect, useReducer, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import LandingPage from './Page-Components/Landing'
import LoginPage from './Page-Components/Auth/Login';
import SignUp from './Page-Components/Auth/Register';
import { Layout } from './components/layout/layout';
import { Center, Loader } from '@mantine/core';
import axios from './utils/axios';
import { SESSION_DATA } from './constants';
import rtlPlugin from 'stylis-plugin-rtl';
import {
  MantineProvider,
  ColorSchemeProvider,
  createEmotionCache,
} from '@mantine/core';
import { useLocalStorage, useHotkeys } from '@mantine/hooks';
import ForgotPasswordPage from './Page-Components/Auth/forgot-password';
import HomePage from './components/dashboard/home';
import AppLayout from './components/dashboard/layout/layout';
import NotFoundImage from './components/404/Auth/404';
import NotFound from './components/404/Unauth/404';
import AddProperty from './components/Add-Properties';
import PropertyList from './components/Property-List';
import Reports from './components/Reports';
import Payments from './components/Payments';
import AddStaff from './components/Add-Staff';
import StaffList from './components/Staff-List';
import Complains from './components/complains';
import Settings from './components/Settings';
import SMS from './components/sms';
import Accounts from './components/Accounting';
import { TenantLayout } from './components/tenants/layout/layout';
import TenantPage from './components/tenants/homepage/homepage';
import PaymentsList from './components/payments-list';
import AddUnit from './components/add-units';
import TenantDashboard from './components/tenant/dashboard';
import AppTenantLayout from './components/tenant/layout/layout';
import CreateComplain from './components/complains/create';
import AppEmployeeLayout from './components/employees/layout/layout';
import EmployeeDashboard from './components/employees/dashboard';
import EmployeesHouse from './components/employees/houses';
import EmployeesTask from './components/employees/tasks';
import EmployeesComplains from './components/employees/complains';

const THEME_KEY = 'tms-color-scheme';

const rtlCache = createEmotionCache({
  key: 'mantine-rtl',
  prepend: true,
  stylisPlugins: [rtlPlugin],
});

const initialState = {
  isLoading: true,
  isSignout: false,
  userToken: null,
  userData: null,
};

export const AuthContext = createContext({
  state: initialState,
  dispatch: () => {}
});

function AuthReducer(state, action) {
  switch(action.type){
    case "RESTORE_TOKEN":
      return {
        ...state,
        isLoading: false,
        userToken: action.token,
        userData: action.data
      };

    case "SIGN_IN":
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        userData: action.data
      };

    case "SIGN_UP":
      return {
        ...state,
        isSignout: false,
        userToken: action.token,
        userData: action.data
      };

    case "SIGN_OUT":
      localStorage.removeItem(SESSION_DATA);
      return {
        ...state,
        isSignout: true,
        userToken: null,
        userData: null
      };

    default:
      return state;
  }
}
export default function App() {
  const [state, dispatch] = useReducer(AuthReducer, initialState);
  const [session, setSession] = useState(localStorage.getItem(SESSION_DATA));
  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;
      let data;

      try{
        userToken = session;
        // login with token
        if(userToken !== null){
          try {
            const {
              data: {
                data: accountData,
                token: accessToken
              },
            } = await axios.get("/auth/account", {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            });
  
            userToken = accessToken;
            data = accountData;
  
          } catch(error){
            console.log(error);
            userToken = null;
            data = null;
          }
        }  
      } catch(e){
        console.log(e);
        userToken = null
        data = null;
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken, data: data});
    }


    bootstrapAsync();
  }, [session]);

const LoaderPage = () => {
    return (
      <Center my={'20%'}>
        <Loader variant='dots' />
        </Center>
    )
  }

  const AuthPage = () => {
    return (
      state.userData.role === "user" ? (
        <Navigate to={"/app/"} />
      ) : state.userData.role === "tenant" ? (
        <Navigate to={"/tenant/"} />
      ) : (
        <Navigate to="/employee/" />
      )
    )
  }

  const UnauthPage = () => {
    return (
      <Navigate to={"/account/login"} />
    )
  }

  const [colorScheme, setColorScheme] = useLocalStorage({
    key: THEME_KEY,
    defaultValue: 'light',
    getInitialValueInEffect: true,
  });

  const [dir, setDir] = useState('ltr');

  const toggleColorScheme = (value) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'));

    const toggleDir = () => {
        setDir("rtl");
    }

  useHotkeys([
    ['mod+J', () => toggleColorScheme()],
    ['mod+L', toggleDir],
  ]);

  return (
    <AuthContext.Provider value={{state, dispatch}}> 
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
        <MantineProvider
          theme={{ colorScheme, dir, primaryColor: "blue", primaryShade: 9 }}
          withGlobalStyles
          withNormalizeCSS
          emotionCache={dir === 'rtl' ? rtlCache : undefined}
        >
    {state.isLoading ? (
      <LoaderPage />
    ) : (

        <BrowserRouter>
        <Routes>
        <Route path='/' element={state.userToken === null ? <Layout noFooter /> : <AuthPage />} >
            <Route index element={<LoginPage />} />
            <Route path='*' element={<NotFound />} />
            <Route path="/account/login" element={<LoginPage />} />
            <Route path='/account/register' element={<SignUp />} />
            <Route path='/account/forgot-password' element={<ForgotPasswordPage /> } />
          </Route>
          <Route path='/employee/' element={state.userToken === null ? <UnauthPage /> : <AppEmployeeLayout />}>
            <Route index element={<EmployeeDashboard />} />
            <Route path='/employee/houses' element={<EmployeesHouse />} />
            <Route path='/employee/tasks' element={<EmployeesTask />} />
            <Route path='/employee/complains' element={<EmployeesComplains />} />
            <Route path='/employee/settings' element={<Settings />} />
          </Route>
          <Route path='/tenant/' element={state.userToken === null ? <UnauthPage /> : <AppTenantLayout />}>
          <Route index element={<TenantDashboard />} />
          <Route path='/tenant/complains/' element={<CreateComplain />} />
          <Route path='/tenant/settings' element={<Settings />} />
          </Route>
          <Route path='/app/' element={state.userToken === null ? <UnauthPage /> : <AppLayout />}>
            <Route index element={<HomePage />} />
            <Route path='/app/properties/add-property' element={<AddProperty />} />
            <Route path='/app/properties/add-units' element={<AddUnit />} />
            <Route path='/app/properties/list' element={<PropertyList />} />
            <Route path='/app/reports' element={<Reports />} />
            <Route path='/app/payments' element={<Payments />} />
            <Route path='/app/payments/list' element={<PaymentsList />} />
            <Route path='/app/staff/add-staff' element={<AddStaff />} />
            <Route path='/app/staff/staff-list' element={<StaffList />} />
            <Route path='/app/complains' element={<Complains />} />
            <Route path='/app/settings' element={<Settings />} />
            <Route path='/app/sms' element={<SMS />} />
            <Route path='/app/accountings' element={<Accounts />} />
            <Route path='*' element={<NotFoundImage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    )}
            </MantineProvider>
      </ColorSchemeProvider>
    </AuthContext.Provider>
  )
}

