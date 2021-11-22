<template>
  <dashboard-default>
  <div>
    <title-bar :title-stack="titleStack"/>
    <card-component>
      <section class="section is-main-section">
        <form @submit.prevent="editProduct">
          <div class="form-group">
            <label>Product Name</label>
            <input v-model="product.name" type="text" class="form-control" :class="{'is-invalid':errors.name}">
            <div v-if="errors.name" class="invalid-feedback">{{errors.name[0]}}</div>
          </div>
          <div class="form-group">
            <label>Product Sku</label>
            <input v-model="product.sku" type="text" class="form-control" :class="{'is-invalid':errors.sku}">
          </div>
          <div class="form-group">
            <label>Product Slug</label>
            <input v-model="product.slug" type="text" class="form-control" :class="{'is-invalid':errors.slug}">
            <div v-if="errors.slug" class="invalid-feedback">{{errors.slug[0]}}</div>
          </div>
          <div class="form-group">
            <label>Product Price</label>
            <input v-model="product.price" type="number" min=0 class="form-control" :class="{'is-invalid':errors.price}">
            <div v-if="errors.price" class="invalid-feedback">{{errors.price[0]}}</div>
          </div>
          <div class="form-group">
            <label>Product Quantity</label>
            <input v-model="product.quantity" type="number" min=0 class="form-control" :class="{'is-invalid':errors.quantity}">
            <div v-if="errors.quantity" class="invalid-feedback">{{errors.quantity[0]}}</div>
          </div>
          <button type="submit" class="btn btn-primary">{{ titleFuntionName }}</button>
        </form>
      </section>
      
    </card-component>
  </div>
  </dashboard-default>
</template>

<script>
import Validate from '@/core/Validate';
import { required, minLength } from 'vuelidate/lib/validators'
import HandleData from '@/core/HandleData';
import BaseRequest from '@/core/BaseRequest';
import DashboardDefault from '@/layout/DashboardDefault.vue'
import CardComponent from '@/components/CardComponent'
import TitleBar from '@/components/TitleBar'
export default {
  components: { TitleBar, DashboardDefault, CardComponent },
  props: {
    slug: {
      default: null
    }
  },
  data () {
    return {
      isExitProduct: false,
      titleFuntion: '',
      product: {
        name: '',
        sku: '',
        price: 0,
        quantity: 0,
        slug: null
      },
      errors: {},
    }
  },
  validations: {
    product: {
      name: {
        required,
        minLength: minLength(4)
      }
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        this.isExitProduct ? 'Edit Product' : 'Add Product'
      ]
    },
    titleFuntionName() {
      this.titleFuntion = this.isExitProduct ? 'Update' : 'Add'
      return this.titleFuntion;
    }
  },
  beforeMount() {
    if (this.slug) {
      this.getProduct()
    }
  },
  methods: {
    getProduct() {
      BaseRequest.get('product/' + this.slug)
      .then(response => {
        if (response.data) {
          this.product = HandleData.prepareData(this.product, response.data)
          this.isExitProduct = true
        } else {
          this.$router.push({ name: "add.product" });
        }
      })
      .catch(error => {
        alert('System error')
      });
    },
    editProduct() {
      if(this.isExitProduct) {
        console.log("update")
      } else {
        console.log("addd")
      }
    }
  }
}
</script>
