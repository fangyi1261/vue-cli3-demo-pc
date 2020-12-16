import Mock from 'mockjs';
import ComAPI from './common';
import { url } from '../api/common';

Mock.setup({
  timeout: '3000-6000'
});

Mock.mock(/login/, 'get', ComAPI.getLogin);

Mock.mock(`${url}/XXX`, 'post', ComAPI['XXX']);

export default Mock;