import { CapacitorConfig } from '@capacitor/cli'

const config: CapacitorConfig = {
  appId: 'dev.hybridlab.mapovanie',
  appName: 'Mapovanie',
  bundledWebRuntime: false,
  webDir: 'dist',
  plugins: {
    SplashScreen: {
      launchAutoHide: false,
    },
  },
  cordova: {},
}

export default config
