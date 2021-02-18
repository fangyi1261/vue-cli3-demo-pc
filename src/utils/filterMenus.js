export function filterMenu(lists, menus) { // lists - 接口返回路由 menus - 本地配置路由
  const newMenus = [];

  const newRoutes = [];

  // 得到一级菜单
  lists.forEach(list => {
    menus.forEach(menu => {
      list.children.forEach(item => {
        menu.children.forEach(child => {
          if (item.url === child.name) {
            newMenus.push(menu);
            newRoutes.push(child);
          }
        });
      });
    });
  });

  // 二级菜单
  const newMenusList = [...new Set(newMenus)];

  newMenusList.forEach(items => {
    let loop = items.children.length;

    for (let i = 0; i < loop; i++) {
      if (newRoutes.indexOf(items.children[i]) === -1) {
        items.children.splice(i, 1);
        i--;
        loop--;
      }
    }
  });
  return newMenusList;
}
