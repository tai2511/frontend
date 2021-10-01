<template>
  <section class="container">
    <form @submit.prevent="register" class="not-layout">
      <div class="form-group">
        <label for="name">Username</label>
        <input v-model="user.name" type="text" name="name" class="form-control" :class="{'is-invalid':errors.name}" id="name" required>
        <div v-if="errors.name" class="invalid-feedback">{{errors.name[0]}}</div>
      </div>
      <div class="form-group">
        <label for="email">Email address</label>
        <input v-model="user.email" type="email" name="email" class="form-control" :class="{'is-invalid':errors.email}" id="email" aria-describedby="emailHelp">
        <div v-if="errors.email" class="invalid-feedback">{{errors.email[0]}}</div>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="user.password" type="password" name="password" class="form-control" :class="{'is-invalid':errors.password}" id="password">
        <div v-if="errors.password" class="invalid-feedback">{{errors.password[0]}}</div>
      </div>
      <div class="d-flex">
        <button type="submit" class="btn btn-primary">Register</button>
      </div>
    </form>
  </section>
</template>

<script>
import Validate from '@/core/Validate';
import BaseRequest from '@/core/BaseRequest';
export default {
  data () {
    return {
      user: {
        name: '',
        email: '',
        password: ''
      },
      errors: {},
    }
  },
  methods: {
    register () {
      let isValid = Validate.validateUser(this.user)
      if (Object.keys(isValid).length > 0) {
        this.errors = isValid
      } else {
        BaseRequest.post('register', this.user)
        .then(() => {
          this.$router.push({path: 'login'})
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>