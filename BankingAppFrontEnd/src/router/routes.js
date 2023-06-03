
const routes = [
  {
    path: '/',
    component: () => import('layouts/BankingAppLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: '/accounts',component: () => import('pages/AccountsOverviewPage.vue') },
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
