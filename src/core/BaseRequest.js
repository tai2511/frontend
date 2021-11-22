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
  get(url, data = ''){
    return axios.get(apiUrl + url,
      { 
        headers: this.getHearder(),
        params: data
      }
    )
  },
  post(url, data){
    return axios.post(apiUrl + url,
      data,
      { headers: this.getHearder()}
    )
  },
  delete(url,id){
    return axios.delete(apiUrl + url + id,
      { headers: this.getHearder()}
    )
  },
  patch(url,data){
    return axios.patch(apiUrl + url + data.id,
      data,
      { headers: this.getHearder()}
    )
  }
}