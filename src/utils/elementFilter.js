import ElementUI, { Message } from 'element-ui';

export default function (Vue) {
  // Vue.use(Pagination);
  // Vue.use(Dialog);
  // Vue.use(Autocomplete);
  // Vue.use(Dropdown);
  // Vue.use(Loading.directtive);

  Vue.use(ElementUI);
  // eslint-disable-next-line no-param-reassign
  Vue.prototype.$message = Message;
}
