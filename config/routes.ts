
export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {
        path: '/user',
        routes: [
          {
            name: 'login',
            path: '/user/login',
            component: './user/Login/index_test',
          },
        ],
      },
    ],
  },

  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },

  {
    name: '找书',
    icon: 'table',
    path: '/list',
    access:'canUser',
    component: './TableList/index1.tsx',
  },
  
  {
    name: '用户信息',
    icon: 'smile',
    access:'canAdmin',
    path: '/inf',
    component: './Inf/index_test.tsx',
  },

  {
    path:'/AddExistedBook',
    name:'添加已有书籍',
    access:'canAdmin',
    component:'./AddExistedBook',
  },

  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    access: 'canAdmin',
    // component: './Admin',
    routes: [
      {
        path:'/AddExistedBook',
        name:'添加已有书籍',
        component:'./AddExistedBook',
      },

      // {
      //   path: 'admin/addBook',
      //   name: '添书',
      //   icon: 'smile',
      //   component: './AddBooks',
      // }
    ],
  },

  {
    access: 'canAdmin',
    path: '/addBook',
    name: '添书',
    icon: 'smile',
    component: './AddBooks',
  },

  {
        access: 'canUser',
        path:'/history',
        icon:'table',
        name:'借阅记录',
        component:'./History',
  },

  // {
  //   path:'/history',
  //   icon:'table',
  //   name:'借阅历史',
  //   component:'./History',
  // },

  {
    path: '/',
    redirect: '/welcome',
  },
  
  {
    component: './404',
  },
];
