<template>
  <dashboard-default>
  <div>
    <title-bar :title-stack="titleStack"/>
    <div class="form-group">
      <label>Product Name</label>
      <input v-model="product.name" type="text" name="name" class="form-control" :class="{'is-invalid':errors.name}" id="name">
      <div v-if="errors.name" class="invalid-feedback">{{errors.name[0]}}</div>
    </div>
    <div class="form-group">
      <label>Product SKU</label>
      <input v-model="product.sku" type="text" name="sku" class="form-control" :class="{'is-invalid':errors.sku}" id="sku">
      <div v-if="errors.sku" class="invalid-feedback">{{errors.sku[0]}}</div>
    </div>
  </div>
  </dashboard-default>
</template>

<script>
// import Validate from '@/core/Validate';
// import BaseRequest from '@/core/BaseRequest';
import DashboardDefault from '@/layout/DashboardDefault.vue'
import TitleBar from '@/components/TitleBar'
export default {
  components: { TitleBar, DashboardDefault },
  data () {
    return {
      product: {
        name: '',
        sku: ''
      },
      errors: {},
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Product'
      ]
    }
  },
  methods: {
    // login () {
    //   let isValid = Validate.validateUser(this.userInfo)
    //   if (Object.keys(isValid).length > 0) {
    //     this.errors = isValid
    //   } else {
    //     BaseRequest.post('login', this.userInfo)
    //     .then(response => {
    //       if (null != response.data.error) {
    //         this.errors = response.data;
    //       } else {
    //         this.user(response.data)
    //         window.localStorage.setItem('token', response.data.token)
    //         this.$router.push({name: 'admin'})
    //       }
    //     })
    //     .catch(error => {
    //       this.errors = error.response.data.errors;
    //     });
    //   }
    // }
  }
}
</script>
