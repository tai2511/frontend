const axios = require('axios');
const apiUrl = 'http://localhost:8090/api/v1/';

export default {
  getHearder(){
    let token = window.localStorage.getItem('token');
    if(null == token){
      return {}
    }else{
      return {Authorization: 'Bearer ' + token}
    }
  },
  get(url){
    return axios.get(apiUrl + url,
      { headers: this.getHearder()}
    )
  },
  post(url, data){
    return axios.post(apiUrl + url,
      data,
      { headers: this.getHearder()}
    )
  }
}