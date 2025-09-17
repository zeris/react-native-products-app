import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HeaderButton, Text } from '@react-navigation/elements';
import {
  createStaticNavigation,
  StaticParamList,
  createNavigationContainerRef,
  DarkTheme, 
  DefaultTheme
} from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image, useColorScheme } from 'react-native';
import logo from '../../assets/softtek_logo.png';
import { useTheme } from '@react-navigation/native';
import bell from '../assets/bell.png';
import newspaper from '../assets/newspaper.png';
import { Home } from './screens/Home';
import { Profile } from './screens/Profile';
import { Settings } from './screens/Settings';
import { Login } from './screens/Login';
import { NotFound } from './screens/NotFound';
import { ProductDetail } from './screens/ProductDetail';
import { EditProfile } from './screens/EditProfile';
import { useAutoLogin } from '../hooks/useAutoLogin';
import { useUser } from '../context/userContext';


const HomeTabs = createBottomTabNavigator({
  screens: {
    Home: {
      screen: Home,
      options: {
        title: 'Main',
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={newspaper}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
        tabBarIcon: ({ color, size }) => (
          <Image
            source={bell}
            tintColor={color}
            style={{
              width: size,
              height: size,
            }}
          />
        ),
      },
    },
  },
});

// small header logo component that reads theme colors
// small header logo component (avoids calling useTheme here so it can be defined outside NavigationContainer)
function HeaderLogo() {
  return <Image source={logo} style={{ width: 70, height: 70, resizeMode: 'contain' }} />;
}

const RootStack = createNativeStackNavigator({
  initialRouteName: 'Login',
  screens: {
    Login: {
      screen: Login,
      options: {
        headerShown: false,
        gestureEnabled: false,
      },
    },
    HomeTabs: {
      screen: HomeTabs,
      options: {
        headerShown: false,
        headerTransparent: true,
        headerTitle: () => <HeaderLogo />,
      },
    },
    Profile: {
      screen: Profile,
      options: {
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
      },
    },
    EditProfile: {
      screen: EditProfile,
      options: {
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
      },
    },
    ProductDetail: {
      screen: ProductDetail,
      options: {
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
      }
    },
    Settings: {
      screen: Settings,
      options: ({ navigation }) => ({
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
      }),
    },
    NotFound: {
      screen: NotFound,
      options: {
        title: '404',
        headerTitle: () => <HeaderLogo />,
        headerTitleAlign: 'center',
      },
      linking: {
        path: '*',
      },
    },
  }
});

const NavigationImpl = createStaticNavigation(RootStack);

// export a navigation ref that can be used outside components
export const navigationRef = createNavigationContainerRef();

export function Navigation() {
  const { handleAutoLogin } = useAutoLogin();
  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const ok = await handleAutoLogin();
        if (mounted) setAuthenticated(!!ok);
      } catch (e) {
        console.warn('autoLogin check failed', e);
      } finally {
        if (mounted) setChecked(true);
      }
    })();
    return () => { mounted = false; };
  }, [handleAutoLogin]);

  useEffect(() => {
    if (!checked || !authenticated) return;
    const tryNav = () => {
      if (navigationRef.isReady()) {
        navigationRef.navigate('HomeTabs');
      } else {
        setTimeout(tryNav, 50);
      }
    };
    tryNav();
  }, [checked, authenticated]);

  const colorScheme = useColorScheme();
  const { user } = useUser();
  const selectedTheme = user?.preferences?.theme ?? 'system';

  const theme = selectedTheme === 'system'
    ? (colorScheme === 'dark' ? DarkTheme : DefaultTheme)
    : (selectedTheme === 'dark' ? DarkTheme : DefaultTheme);
  


  if (!checked) return null;

  // Render NavigationImpl (it receives the `theme` prop so nested components can use useTheme())
  return <NavigationImpl ref={navigationRef} theme={theme} />;
}

type RootStackParamList = StaticParamList<typeof RootStack>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
