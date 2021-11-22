<template>
  <dashboard-default>
  <title-bar :title-stack="titleStack"/>
  <v-data-table
    :headers="headers"
    :items="products"
    :items-per-page="15"
    :footer-props="{'items-per-page-options':[15, 30, 45, -1]}"
    class="elevation-1"
    >
    <template v-slot:[`item.image`]="{ item }">
      <div class="p-2">
        <v-img :src="item.image" :alt="item.name" height="100px" max-width="100px"></v-img>
      </div>
    </template>

    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editproduct(item)">mdi-pencil</v-icon>
      <v-icon small @click="deleteproduct(item)">mdi-delete</v-icon>
    </template>
  </v-data-table>
  <DialogForm :dialog="editProduct" :item="item" title='Edit Product' @removeDialog="editProduct = $event" @agree="confirmEditproduct($event)"></DialogForm>
  <DialogPopup :dialog="deleteProduct" title='Confirm' :message="'Are you sure delete ' + item.name" @removeDialog="deleteProduct = $event" @agree="confirmDeleteproduct()"></DialogPopup>
  <DialogPopup :dialog="confirm" :message="confirmMessage" onlyShow='OK' @removeDialog="confirm = $event"></DialogPopup>
  </dashboard-default>
</template>

<script>
import DashboardDefault from '@/layout/DashboardDefault.vue'
import DialogPopup from '@/components/dialog/DialogPopup'
import DialogForm from '@/components/dialog/DialogForm'
import TitleBar from '@/components/TitleBar'
import BaseRequest from '@/core/BaseRequest'

export default {
  components: { TitleBar, DashboardDefault, DialogPopup, DialogForm },
  computed: {
    titleStack () {
      return [
        'Admin',
        'All Product'
      ]
    }
  },
  async mounted() {
    await this.getAllProduct()
  },
  data () {
    return {
      headers: [
        { text: 'Product Name', value: 'name' },
        { text: 'Image', value: 'image', sortable: false },
        { text: 'Slug', value: 'slug' },
        { text: 'SKU', value: 'sku' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: 'Actions', value: 'actions', sortable: false }
      ],
      products: [],
      item: {},
      editProduct: false,
      deleteProduct: false,
      confirm: false,
      confirmMessage: ''
    }
  },
  methods: {
    getAllProduct() {
      BaseRequest.get('product', {perPage : 'all'})
      .then(response => {
        this.products = response.data
      })
      .catch(error => {
        this.errors = error.response.data.errors;
      });
    },
    editproduct(item) {
      // this.$router.push({ name: "edit.product", params: { slug: slug } });
      this.item = item
      this.editProduct = true
    },
    deleteproduct(item) {
      this.item = item
      this.deleteProduct = true
    },
    confirmDeleteproduct() {
      this.confirm = true
      BaseRequest.delete('product/',this.item.id)
      .then(response => {
        this.getAllProduct()
        this.confirmMessage = 'Delete success ' + this.item.name
      })
      .catch(error => {
        console.log(error)
        this.confirmMessage = 'System error. Please try again!'
      });
    },
    confirmEditproduct(product) {
      BaseRequest.patch('product/',product)
      .then(response => {
        this.confirmMessage = 'Update success ' + product.name
        this.getAllProduct()
        this.confirm = true
      })
      .catch(error => {
        this.editProduct = true
        console.log(error)
        this.confirmMessage = 'System error. Please try again!'
      });
    }
  }
}
</script>
<style scoped>
</style>
