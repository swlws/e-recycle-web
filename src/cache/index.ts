import env from "./env";
import User from "./user";

class CacheMgr {
  env: env;
  /** 用户信息 */
  user: User;

  constructor() {
    this.env = new env();
    this.user = new User();
  }
}
export default new CacheMgr();
