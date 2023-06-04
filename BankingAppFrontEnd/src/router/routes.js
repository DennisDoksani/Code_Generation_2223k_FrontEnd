import BankingAppLayout from 'layouts/BankingAppLayout.vue'
import IndexPage from 'pages/IndexPage.vue'
import AccountsOverviewPage from 'pages/AccountsOverviewPage.vue'
import RegistrationPage from 'pages/RegistrationPage.vue'

const routes = [
  {
    path: '/',
    component: () => BankingAppLayout,
    children: [
      { path: '', component: () => IndexPage },
      { path: '/accounts',component: () => AccountsOverviewPage },
      { path: '/registration',component: () => RegistrationPage },
      {path: '/logged',component: () => import('pages/LoggedUserPage.vue')},
    ]
  },

  // Always leave this as last one for 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
