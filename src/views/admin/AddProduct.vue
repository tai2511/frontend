<template>
  <dashboard-default>
  <div>
    <title-bar :title-stack="titleStack"/>
    <section class="section is-main-section">
      <card-component>
        <form @submit.prevent="submit">
          <b-field label="Product name" horizontal>
            <b-field>
              <b-input v-model="form.name" placeholder="Product Name" name="name" required />
            </b-field>
          </b-field>
          <b-field label="Product SKU" horizontal  type="is-success" message="This username is available">
            <b-field>
              <b-input v-model="form.sku" placeholder="Product SKU" name="sku" required />
            </b-field>
          </b-field>
          <b-field message="Do not enter the leading zero" horizontal>
            <b-field>
              <p class="control">
                <a class="button is-static">
                  +44
                </a>
              </p>
              <b-input type="tel" v-model="form.phone" name="phone" expanded />
            </b-field>
          </b-field>
          <b-field label="Department" horizontal>
            <b-select placeholder="Select a department" v-model="form.department" required>
              <option v-for="(department, index) in departments" :key="index" :value="department">
                {{ department }}
              </option>
            </b-select>
          </b-field>
          <hr>
          <b-field label="Subject" message="Message subject" horizontal>
            <b-input placeholder="e.g. Partnership proposal" v-model="form.subject" required />
          </b-field>
          <b-field label="Question" message="Your question. Max 255 characters" horizontal>
            <b-input type="textarea" placeholder="Explain how we can help you" v-model="form.question" maxlength="255" required/>
          </b-field>
          <hr>
          <b-field horizontal>
            <b-field grouped>
              <div class="control">
                <b-button native-type="submit" type="is-primary">Submit</b-button>
              </div>
              <div class="control">
                <b-button type="is-primary is-outlined" @click="reset">Reset</b-button>
              </div>
            </b-field>
          </b-field>
        </form>
      </card-component>
      <card-component title="Custom elements" icon="ballot-outline">
        <b-field label="Checkbox" class="has-check" horizontal>
          <checkbox-picker :options="{lorem:'Lorem', ipsum:'Ipsum', dolore:'Dolore'}" v-model="customElementsForm.checkbox" type="is-primary"/>
        </b-field>
        <hr>
        <b-field label="Radio" class="has-check" horizontal>
          <radio-picker :options="{one:'One',two:'Two'}" v-model="customElementsForm.radio"></radio-picker>
        </b-field>
        <hr>
        <b-field label="Switch" horizontal>
          <b-switch v-model="customElementsForm.switch">
            Default
          </b-switch>
        </b-field>
        <hr>
        <b-field label="File" horizontal>
          <file-picker v-model="customElementsForm.file"/>
        </b-field>
      </card-component>
    </section>
  </div>
  </dashboard-default>
</template>

<script>
import TitleBar from '@/components/TitleBar'
import CardComponent from '@/components/CardComponent'
import mapValues from 'lodash/mapValues'
import CheckboxPicker from '@/components/CheckboxPicker'
import RadioPicker from '@/components/RadioPicker'
import FilePicker from '@/components/FilePicker'
import DashboardDefault from '@/layout/DashboardDefault.vue'

export default {
  name: 'AddProduct',
  components: { FilePicker, RadioPicker, CheckboxPicker, CardComponent, TitleBar, DashboardDefault },
  data () {
    return {
      isLoading: false,
      form: {
        name: null,
        email: null,
        phone: null,
        department: null,
        subject: null,
        question: null
      },
      customElementsForm: {
        checkbox: [],
        radio: null,
        switch: true,
        file: null
      },
      departments: [
        'Business Development',
        'Marketing',
        'Sales'
      ],
      product: {
        
      }
    }
  },
  computed: {
    titleStack () {
      return [
        'Admin',
        'Add Product'
      ]
    }
  },
  methods: {
    submit () {

    },
    reset () {
      this.form = mapValues(this.form, item => {
        if (item && typeof item === 'object') {
          return []
        }
        return null
      })

      this.$buefy.snackbar.open({
        message: 'Reset successfully',
        queue: false
      })
    }
  }
}
</script>
