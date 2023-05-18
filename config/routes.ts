
export default [
{
  path: '/',
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: '/',
          redirect: '/CreateOrder',
        },
        {
          path: '/CreateOrder',
          name: '创建订单',
          // title: '创建订单',
          component: './CreateOrder',
        },
        {
          path: '/OrderManager',
          name: '订单列表',
          title: '订单列表',
          component: './OrderManager',
        },
        {
          path: '/basicInfo',
          title: '基础信息',
          name:"基础信息",
          routes: [
            {
              path: '/basicInfo/goodsInfo',
              title: '商品信息',
              name:"商品信息",
              component: './BasicInfo/goodsInfo',
            },
            {
              path: '/basicInfo/shoopInfo',
              title: '店铺信息',
              name:"店铺信息",
              component: './BasicInfo/shoopInfo',
            },
            {
              path: '/basicInfo/userInfo',
              title: '用户信息',
              name:"用户信息",
              component: './BasicInfo/userInfo',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    }
  ],
},
{
  component: './404',
},
]
