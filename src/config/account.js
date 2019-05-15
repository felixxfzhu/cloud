import baseModule from './baseModule'
import path from './path'

class AccountReq extends baseModule {
    
    async login (asd){
        return this.post("/api/v1/login",asd)
      }
}

export default new AccountReq(path.host)