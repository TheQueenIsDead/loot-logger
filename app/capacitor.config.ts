import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'dev.tqid.lootlogger',
  appName: 'LootLogger',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
