<template>
  <div>
    <nav-bar/>
    <aside-menu :menu="menu" />
    <slot></slot>
    <footer-bar/>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import AsideMenu from '@/components/AsideMenu'
import FooterBar from '@/components/FooterBar'
export default {
  components: {
    FooterBar,
    AsideMenu,
    NavBar
  },
  computed: {
    menu () {
      return [
        'General',
        [
          {
            to: '/admin',
            icon: 'desktop-mac',
            label: 'Dashboard'
          }
        ],
        'Examples',
        [
          {
            to: '/admin/tables',
            label: 'Tables',
            icon: 'table'
          },
          {
            to: '/admin/forms',
            label: 'Forms',
            icon: 'square-edit-outline'
          },
          {
            to: '/admin/profile',
            label: 'Profile',
            icon: 'account-circle'
          },
          {
            label: 'Product',
            subLabel: 'product',
            icon: 'view-list',
            menu: [
              {
                to: '/admin/product',
                label: 'Add Product'
              },
              {
                to: '/admin/all-product',
                label: 'All Product'
              }
            ]
          }
        ],
        'About',
        [
          {
            href: 'https://admin-null.justboil.me',
            label: 'Premium Demo',
            icon: 'credit-card'
          },
          {
            href: 'https://justboil.me/bulma-admin-template/null',
            label: 'About',
            icon: 'help-circle'
          }
        ]
      ]
    }
  },
  created () {
    this.$store.commit('user', {
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://avatars.dicebear.com/v2/gridy/John-Doe.svg'
    })
  }
}
</script>