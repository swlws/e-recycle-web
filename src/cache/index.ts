import token from './token';
import env from './env';
import User from './user';

class CacheMgr {
  token: token;
  env: env;
  /** 用户信息 */
  user: User;

  constructor() {
    this.token = new token();
    this.env = new env();
    this.user = new User();
  }
}
export default new CacheMgr();
