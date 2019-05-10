import { constantRoutes } from '@/router'
import Layout from '@/layout'
/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(resources) {
  var routeMaps = []
  console.log(resources)
  resources.forEach(r => {
    if (r.children && r.children.length > 0) {
      // 有下级菜单
      var level = {
        path: '',
        redirect: '',
        component: Layout,
        name: '',
        meta: { title: '', icon: '' },
        children: [],
        buttons: []
      }
      const children = r.children

      level.path = '' + parseInt(Math.random() * 100)
      level.redirect = children[0].url
      level.name = r.name
      level.meta.title = r.name
      level.meta.icon = r.icon
      level.buttons = r.buttons

      children.forEach(child => {
        var childNode = {
          path: child.url,
          name: child.name,
          // component: () => import('@/views/attest'),
          component: () => import('@/views' + child.url),
          meta: { title: child.name, icon: child.icon },
          buttons: child.buttons
        }
        console.log('@/views' + child.url)
        level.children.push(childNode)
      })

      routeMaps.push(level)
    } else {
      // 无下级菜单
      var single = {
        path: '',
        buttons: [],
        component: Layout,
        children: [
          {
            path: '',
            name: '',
            component: '',
            meta: { title: '', icon: '' },
            buttons: []
          }
        ]
      }

      single.path = r.url
      single.children[0].meta.title = r.name
      single.children[0].meta.icon = r.icon
      single.children[0].name = r.name
      single.children[0].component = () => import('@/views' + r.url)
      single.children[0].buttons = r.buttons
      single.buttons = r.buttons

      routeMaps.push(single)
    }
  })

  var blank = { path: '*', component: () => import('@/views/404'), hidden: true }
  routeMaps.push(blank)
  return routeMaps
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      const accessedRoutes = filterAsyncRoutes(roles)
      console.log('access', accessedRoutes)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
