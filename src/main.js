import Vue from 'vue';
import App from './App.vue';
import router from '../src/routes';
import store from './store';
// import firebase from 'firebase/app';
// import 'firebase/auth';
// import 'firebase/firestore';
// import { firestorePlugin } from 'vuefire';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faAngleRight,
  faFistRaised,
  faSwimmer,
  faSkullCrossbones,
  faGavel,
  faShieldAlt,
  faHatWizard,
  faStickyNote,
  faCaretDown,
  faCaretUp,
} from '@fortawesome/free-solid-svg-icons';

library.add(
  faAngleRight,
  faFistRaised,
  faSwimmer,
  faSkullCrossbones,
  faGavel,
  faShieldAlt,
  faHatWizard,
  faStickyNote,
  faCaretDown,
  faCaretUp
);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;
// Vue.config.devtools = false;
// Vue.use(firestorePlugin);

// const configOptions = {
//   apiKey: process.env.VUE_APP_apiKey,
//   authDomain: process.env.VUE_APP_authDomain,
//   databaseURL: process.env.VUE_APP_databaseURL,
//   projectId: process.env.VUE_APP_projectId,
//   storageBucket: process.env.VUE_APP_storageBucket,
//   messagingSenderId: process.env.VUE_APP_messagingSenderId,
//   appId: process.env.VUE_APP_appId
// };

// firebase.auth().onAuthStateChanged(user => {
//   if (user !== null) {
//     firebase
//       .firestore()
//       .collection("users")
//       .doc(user.uid)
//       .get()
//       .then(res => {
//         store.dispatch("fetchUser", res.data());
//       });
//   } else {
//     store.dispatch("fetchUser", null);
//   }
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
// });
