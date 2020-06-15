import Layout from '@/layout'
import i18n from '@/locales'

export default [

  {
    path: '*',
    redirect: {
      path: '/visualization/web/404'
    }
  },
  {
    path: '/visualization/web/404',
    name: 'NotFound',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/NotFound.vue`
    )
  },
  {
    path: '/visualization/web/403',
    name: 'AccessDenied',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Deny.vue`
    )
  },
  {
    path: '/visualization/web/500',
    name: 'ServerError',
    component: () => import(
      /* webpackChunkName: "routes" */
      `@/views/Error.vue`
    )
  },


  {
    path: '/visualization/web',
    component: Layout,
    name: 'Root',
    redirect: {
      name: 'visualization'
    }
  },

  {
    path: '/visualization/web',
    component: Layout,
    children: [{
      path: '',
      name: 'visualization',
      component: () => import('@/views/Template/AttackMap/'),
      meta: {
        breadcrumb: [{
          text: i18n.t('global.main.visualization.visualization'),
          path: '/visualization/web'
        }
        ]
      }
    }]
  }
];
