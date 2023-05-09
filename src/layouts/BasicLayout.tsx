import React, { useEffect, useState } from 'react';
import { connect, history } from 'umi';
import ProLayout, { BasicLayoutProps as ProLayoutProps, Settings } from '@ant-design/pro-layout';
import { ConnectState } from '@/models/connect';
import { Menu } from 'antd';
import routes from '../../config/routes';
import {createFromIconfontCN} from '@ant-design/icons'
const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/c/font_3700257_g8ljkunsdws.js',
});
export interface BasicLayoutProps extends ProLayoutProps {
  settings: Settings;
}
const BasicLayout: React.FC<BasicLayoutProps> = props => {
  const { children, settings } = props;
  const [selectedKeys, setSelectedKeys] = useState<any>();
  const [openKeys,setOpenKeys]=useState<any>('/basicInfo')
  const arr = (routes as any)
    .filter(item => item.path === '/')[0]
    .routes[0]?.routes.filter(item => item.title);
  const addChildren = (tree: Array<Record<string, any>>) => {
    for (let i = 0; i < tree.length; i++) {
      tree[i].label = tree[i]?.title;
      tree[i].key = tree[i]?.path;
      tree[i].icon=<IconFont type="icon-dingdan" />
      if (tree[i].routes) {
        tree[i].children = tree[i].routes;
        addChildren(tree[i].routes);
      }
    }
    return tree;
  };
  const findOpenKey=(tree: Array<Record<string, any>>,key)=>{
    for (let i = 0; i < tree.length; i++) {
      
      if (tree[i].routes) {
       if(tree[i].routes.filter(item=>item.path===key).length){
        return tree[i]
       }
        addChildren(tree[i].routes);
      }
    }
    return undefined
  }
  const onClick = e => {
    history.push(e?.key);
  };
  function getSelectedKeys(list, parentKeys = []) {
    const pathname = location.pathname.replace(/^\/[^/]+\//, '/');
    setSelectedKeys(pathname)
    return pathname;
  }
  useEffect(() => {
    history.listen(() => {
      const keys = getSelectedKeys(addChildren(arr));
      if(findOpenKey(addChildren(arr),keys)){
        setOpenKeys(findOpenKey(addChildren(arr),keys)?.key)
      }
    });
  }, []);
  return (
    <div style={{ display: 'flex' }}>
      <div>
      <Menu
        onClick={onClick}
        style={{ width: 180 }}
        selectedKeys={selectedKeys}
        defaultOpenKeys={[openKeys]}
        mode="inline"
        items={addChildren(arr)as any}
      />
      </div>
      <ProLayout {...props} {...settings} style={{width:'calc(100vw - 197px)'}}>
        {children}
      </ProLayout>
    </div>
  );
};

export default connect(({ settings }: ConnectState) => ({
  settings,
}))(BasicLayout);
