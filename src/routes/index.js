import Vue from 'vue';
import store from '../store';
import Router from 'vue-router';
import axios from 'axios';
import Documents from '../views/Documents';
import AddSpell from '../views/spells/AddSpell';
import About from '../views/About';
import Login from '../views/Login';
import Register from '../views/Register';
import Profile from '../views/Profile';
import Home from '../views/home/Home';
import Character from '../views/character/Character.vue';
import Play from '../views/play/Play';
import Landing from '../views/Landing';
import NotFound from '../views/NotFound';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/landing',
      name: 'Landing',
      component: Landing,
      props: true,
      meta: {
        guest: true,
        title: `${process.env.VUE_APP_SITE_NAME}`,
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      props: true,
      meta: {
        guest: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Login`,
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: true,
      meta: {
        guest: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Register`,
      },
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Edit Profile`,
      },
    },
    {
      path: '/documents',
      name: 'Documents',
      component: Documents,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Documents`,
      },
    },
    {
      path: '/spells',
      name: 'AddSpell',
      component: AddSpell,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Add Spells`,
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: `${process.env.VUE_APP_SITE_NAME} | About`,
      },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Home`,
      },
    },
    {
      path: '/character',
      name: 'Character',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Edit`,
      },
    },
    {
      path: '/character/summary',
      name: 'Summary',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Summary`,
      },
    },
    {
      path: '/character/abilities',
      name: 'Abilities',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Abilities`,
      },
    },
    {
      path: '/character/skills',
      name: 'Skills',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Skills`,
      },
    },
    {
      path: '/character/saving-throws',
      name: 'Saving Throws',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Saving Throws`,
      },
    },
    {
      path: '/character/weapons',
      name: 'Weapons',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Weapons`,
      },
    },
    {
      path: '/character/armor',
      name: 'Armor',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Armor`,
      },
    },
    {
      path: '/character/spells',
      name: 'Spells',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Spells`,
      },
    },
    {
      path: '/character/notes',
      name: 'Notes',
      component: Character,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Character Notes`,
      },
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Play Campaign`,
      },
    },
    {
      path: '/play/chat',
      name: 'Chat',
      component: Play,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Play Campaign`,
      },
    },
    {
      path: '/play/roll',
      name: 'Roll',
      component: Play,
      props: true,
      meta: {
        requiresAuth: true,
        title: `${process.env.VUE_APP_SITE_NAME} | Play Campaign`,
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: `${process.env.VUE_APP_SITE_NAME}`,
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  let auth = store.getters.user.access_token;
  let auth_local = JSON.parse(localStorage.getItem('access_token'));

  if (!auth && auth_local && auth_local.expiry > new Date().getTime()) {
    auth = auth_local.token;
    store.getters.user.access_token = auth_local.token;
  }

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (auth == null || !auth_local || auth_local.expiry < new Date().getTime()) {
      localStorage.removeItem('access_token');
      store.getters.user.access_token = null;
      store.getters.user.data = null;
      next({
        name: 'Landing',
        params: { logout: 'Your credentials have expired, you have been logged out!' },
      });
    } else if (!store.getters.user.data) {
      axios
        .get(`${store.getters.env}/api/user`, {
          headers: { Authorization: `Bearer ${auth}` },
        })
        .then(res => {
          store.dispatch('fetchUser', res.data.user);
          next();
        })
        .catch(err => {
          console.log(err.response);
          next({
            name: 'Landing',
          });
        });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.guest)) {
    if (auth !== null) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

router.afterEach((to, from) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title || 'Three-5';
  });
});

export default router;
