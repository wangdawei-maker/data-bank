import { Settings as ProSettings } from '@ant-design/pro-layout';
type DefaultSettings = ProSettings & {
  pwa: boolean;
};

const proSettings: DefaultSettings = {
  navTheme: 'dark',
  primaryColor: '#1890ff',
  layout: 'top',
  contentWidth: 'Fluid',
  fixedHeader: false,
  fixSiderbar: true,
  colorWeak: false,
  menuRender: false,
  splitMenus: false,
  // headerRender: false,
  footerRender: false,
  menu: {
    locale: true,
  },
  title: 'Vevor子系统',
  pwa: false,
  iconfontUrl: '',
};


export type { DefaultSettings };

export default proSettings;
