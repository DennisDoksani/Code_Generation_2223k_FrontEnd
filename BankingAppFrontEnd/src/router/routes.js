
const routes = [
  {
    path: '/',
    component: () => import('layouts/BankingAppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/accounts',component: () => import('pages/AccountsOverviewPage.vue') },
      {path: '/accounts/createNewAccount',component: () => import('pages/CreateNewAccountPage.vue')},


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
