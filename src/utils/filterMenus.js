export function filterMenu(val, menus) {
  let newMenus = [];
  let newRoutes = [];
  // 得到一级菜单

  val.forEach((items, indexs) => {
    menus.forEach((vals, keys) => {
      items.children.forEach((item, index) => {
        vals.children.forEach((val, key) => {
          if (item.url === url.name) {
            newMenus.push(vals);
            newRoutes.push(val);
          }
        });
      });
    });
  });

  // 二级菜单
  let newMenusList = [...new Set(newMenus)];

  newMenusList.forEach(items => {
    let loop = items.children.length;

    for (let i = 0; i < loop; i++) {
      if (newRoutes.indexOf(items.children[i]) === -1) {
        items.children.splice(i, 1);
        i = i - 1;
        loop = loop - 1;
      }
    }
  });
  return newMenusList;
}
