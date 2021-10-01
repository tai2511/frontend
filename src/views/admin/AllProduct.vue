<template>
  <dashboard-default>
  <title-bar :title-stack="titleStack"/>
  <v-data-table
    :headers="headers"
    :items="desserts"
    :items-per-page="5"
    :footer-props="{'items-per-page-options':[5, 10, 15, 20, -1]}"
    class="elevation-1"
    >
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editTutorial(item.slug)">mdi-pencil</v-icon>
      <v-icon small @click="deleteTutorial(item.id)">mdi-delete</v-icon>
    </template>
  </v-data-table>
  </dashboard-default>
</template>

<script>
import DashboardDefault from '@/layout/DashboardDefault.vue'
import TitleBar from '@/components/TitleBar'
import BaseRequest from '@/core/BaseRequest';
export default {
  components: { TitleBar, DashboardDefault },
  computed: {
    titleStack () {
      return [
        'Admin',
        'All Product'
      ]
    }
  },
  mounted (){
    BaseRequest.get('product')
    .then(response => {
      this.desserts = response.data.data
    })
    .catch(error => {
      this.errors = error.response.data.errors;
    });
  },
  data () {
    return {
      headers: [
        { text: 'Product Name', value: 'name' },
        { text: 'Slug', value: 'slug' },
        { text: 'SKU', value: 'SKU' },
        { text: 'Price', value: 'price' },
        { text: 'Quantity', value: 'quantity' },
        { text: "Actions", value: "actions", sortable: false }
      ],
      desserts: []
    }
  },
  methods: {
     editTutorial(slug) {
      this.$router.push({ name: "edit.product", params: { slug: slug } });
    },

    deleteTutorial(id) {
      TutorialDataService.delete(id)
        .then(() => {
          this.refreshList();
        })
        .catch((e) => {
          console.log(e);
        });
    },
  }
}
</script>
