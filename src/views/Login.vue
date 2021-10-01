<template>
  <section class="container">
    <form @submit.prevent="login" class="not-layout">
      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="userInfo.email" type="email" name="email" class="form-control" :class="{'is-invalid':errors.email}" id="email" aria-describedby="emailHelp">
        <div v-if="errors.email" class="invalid-feedback">{{errors.email[0]}}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="userInfo.password" type="password" name="password" class="form-control" :class="{'is-invalid':errors.password}" id="password">
        <div v-if="errors.email" class="invalid-feedback">{{errors.password[0]}}</div>
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary">Login</button>
        <router-link to="/register" class="register-button" ><button class="btn btn-secondary">Register</button></router-link>
      </div>
    </form>
  </section>
</template>

<script>
import Validate from '@/core/Validate';
import BaseRequest from '@/core/BaseRequest';
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      userInfo: {
        email: '',
        password: ''
      },
      errors: {},
    }
  },
  methods: {
    login () {
      let isValid = Validate.validateUser(this.userInfo)
      if (Object.keys(isValid).length > 0) {
        this.errors = isValid
      } else {
        BaseRequest.post('login', this.userInfo)
        .then(response => {
          if (null != response.data.error) {
            this.errors = response.data;
          } else {
            this.user(response.data)
            window.localStorage.setItem('token', response.data.token)
            this.$router.push({name: 'admin'})
          }
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
      }
    },
    ...mapMutations([
      'user',
    ])
  }
}
</script>
<style lang="scss" scoped>
.register-button{
  margin-left: auto
}
</style>