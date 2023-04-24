import React from 'react';
import { connect } from 'umi';
import ProLayout, {
  BasicLayoutProps as ProLayoutProps,
  Settings,
} from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
export interface BasicLayoutProps extends ProLayoutProps {
  settings: Settings;
}
const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const {
    children,
    settings,
  } = props;
  return (
    <ProLayout {...props} {...settings}>
      {children}
    </ProLayout>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
