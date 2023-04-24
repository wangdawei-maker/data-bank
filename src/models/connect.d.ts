import { Settings as ProSettings } from '@ant-design/pro-layout';
export interface Loading {
  global: boolean;
  effects: { [key: string]: boolean | undefined };
  models: {
    global?: boolean;
    setting?: boolean;
  };
}

export interface ConnectState {
  loading: Loading;
  settings: ProSettings;
}
