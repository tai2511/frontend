<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <v-card>
        <v-card-title>
          <span class="text-h5">Update Product</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Name*"
                  required
                  v-model="stateLocal.name"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="SKU*"
                  required
                  v-model="stateLocal.sku"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Slug*"
                  required
                  v-model="stateLocal.slug"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Price"
                  required
                  type="number"
                  v-model="stateLocal.price"
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Quantity"
                  required
                  type="number"
                  v-model="stateLocal.quantity"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="removeDialog()"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="agree()"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogForm',
  computed: {
    stateLocal () {
      return {...this.item}
    }
  },
  props: {
    item: {
      type: Object,
      default: null
    },
    dialog: false
  },
  methods: {
    removeDialog() {
      this.$emit('removeDialog', false)
    },
    agree() {
      this.$emit('agree', this.stateLocal)
      this.removeDialog()
    }
  }
}
</script>
