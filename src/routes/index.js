import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import store from '../store';
import Router from 'vue-router';
import Documents from '../views/Documents';
import About from '../views/About';
import Login from '../views/Login';
import Register from '../views/Register';
import Home from '../views/Home';
import CharacterEdit from '../views/CharacterEdit.vue';
import Play from '../views/Play';
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
        title: 'Dashboard',
      },
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      meta: {
        guest: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      meta: {
        guest: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/documents',
      name: 'Documents',
      component: Documents,
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        title: 'Dashboard',
      },
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      props: true,
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/character',
      name: 'CharacterEdit',
      component: CharacterEdit,
      props: true,
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '/play',
      name: 'Play',
      component: Play,
      props: true,
      meta: {
        requiresAuth: true,
        title: 'Dashboard',
      },
    },
    {
      path: '*',
      name: 'NotFound',
      component: NotFound,
      meta: {
        title: 'Dashboard',
      },
    },
  ],
});

router.beforeEach((to, from, next) => {
  var authed = firebase.auth().currentUser;

  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (authed == null) {
      next({
        path: '/landing',
        params: { nextUrl: to.fullPath },
      });
    } else {
      firebase
        .firestore()
        .collection('users')
        .doc(authed.uid)
        .get()
        .then((res) => {
          store.dispatch('fetchUser', res.data());
        });
      next();
    }
  } else if (to.matched.some((record) => record.meta.guest)) {
    if (authed !== null) {
      next({ name: 'Home' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
