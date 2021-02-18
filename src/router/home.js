export const routesMap = {
  index: 'demo',
  text: '测试页面',
  icon: 'el-icon-view',
  children: [
    {
      path: '/demo', // 路径
      name: 'demo', // 名称
      value: '测试页面1', // 标题
      component: () => import('@/views/demo/Home.vue')
    },
    {
      path: '/about', // 路径
      name: 'about', // 名称
      value: '测试页面2', // 标题
      component: () => import('@/views/demo/About.vue')
    }
  ]
};

export const menus = [
  routesMap
];

const routes = [].concat(...menus.map(menu => menu.children));

export default routes;
