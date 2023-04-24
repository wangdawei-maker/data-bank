export default [
{
  path: '/',
  routes: [
    {
      path: '/',
      component: '../layouts/BasicLayout',
      routes: [
        {
          path: './',
          redirect: './CreateOrder',
        },
        {
          path: './CreateOrder',
          name: '创建订单',
          title: '欢迎',
          component: './CreateOrder',
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
