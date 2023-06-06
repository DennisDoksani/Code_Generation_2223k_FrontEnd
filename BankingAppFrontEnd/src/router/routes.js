
const routes = [
  {
    path: '/',
    component: () => import('layouts/BankingAppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/accounts',component: () => import('pages/AccountsOverviewPage.vue') },
      {path: '/overview',component: () => import('pages/LoggedUserPage.vue')},
      {path: '/newaccount',component: () => import('components/accounts/CreateAccount.vue')},
    ]
  },

  // Always leave this as last one for 404
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
