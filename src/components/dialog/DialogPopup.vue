<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          {{ title }}
        </v-card-title>
        <v-card-text>
          {{ message }}
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <div v-if="onlyShow == ''">
            <v-btn color="green darken-1" text @click="removeDialog()"> Disagree </v-btn>
            <v-btn color="green darken-1" text @click="agree()" > Agree </v-btn>
          </div>
          <v-btn v-else color="green darken-1" text @click="removeDialog()" > {{ onlyShow }} </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: 'DialogPopup',
  props: {
    title: {
      type: String,
      default: null
    },
    message: {
      type: String,
      default: null
    },
    onlyShow: {
      type: String,
      default: ''
    },
    dialog: false
  },
  methods: {
    removeDialog() {
      this.$emit('removeDialog', false)
    },
    agree() {
      this.$emit('agree', false)
      this.removeDialog()
    }
  }
}
</script>
