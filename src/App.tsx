import { Assets as NavigationAssets } from '@react-navigation/elements';
import { Asset } from 'expo-asset';
import * as SplashScreen from 'expo-splash-screen';
import * as React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useCallback, useEffect, useState } from 'react';
import { UserProvider } from './stores/useUser';
import { Navigation } from './navigation';
import { useAutoLogin } from './hooks/useAutoLogin';

// Prevenir auto hide del splash nativo
SplashScreen.preventAutoHideAsync();

// Runner que se monta dentro del UserProvider y ejecuta el auto-login
function AutoLoginRunner({ onDone }: { onDone: () => void }) {
  const { handleAutoLogin } = useAutoLogin();

  useEffect(() => {
    let mounted = true;
    // timeout fallback por si algo cuelga (7s)
    const t = setTimeout(() => {
      if (mounted) {
        console.warn('[AutoLoginRunner] timeout, continuing');
        onDone();
      }
    }, 7000);

    (async () => {
      try {
        console.log('[AutoLoginRunner] starting');
        const ok = await handleAutoLogin();
        console.log('[AutoLoginRunner] result:', ok);
      } catch (e) {
        console.warn('[AutoLoginRunner] error:', e);
      } finally {
        clearTimeout(t);
        if (mounted) onDone();
      }
    })();

    return () => {
      mounted = false;
      clearTimeout(t);
    };
  }, [handleAutoLogin, onDone]);

  return null;
}

export function App() {
  const [assetsReady, setAssetsReady] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // ocultar splash cuando ambos estén listos
  useEffect(() => {
    let mounted = true;
    const tryHide = async () => {
      if (mounted && assetsReady && authChecked) {
        try {
          await SplashScreen.hideAsync();
        } catch (e) {
          console.warn('Failed to hide splash:', e);
        }
      }
    };
    tryHide();
    return () => { mounted = false; };
  }, [assetsReady, authChecked]);

  // Cargar assets (splash)
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        await Asset.loadAsync([
          ...NavigationAssets,
          require('./assets/newspaper.png'),
          require('./assets/bell.png'),
        ]);
      } catch (e) {
        console.warn(e);
      } finally {
        if (mounted) setAssetsReady(true);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (assetsReady && authChecked) {
      await SplashScreen.hideAsync();
    }
  }, [assetsReady, authChecked]);

  // Mantener splash hasta que ambos estén listos
  if (!assetsReady || !authChecked) {
    return (
      <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
        <UserProvider>
          <AutoLoginRunner onDone={() => setAuthChecked(true)} />
        </UserProvider>
      </GestureHandlerRootView>
    );
  }

  // Cuando todo listo, render normal (UserProvider debe envolver Navigation)
  return (
    <GestureHandlerRootView style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <UserProvider>
        <Navigation />
      </UserProvider>
    </GestureHandlerRootView>
  );
}
