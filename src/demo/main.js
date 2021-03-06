import Vue from "vue";
import Vuex from "vuex";
import vueCustomElement from "vue-custom-element";
import VueI18n from "vue-i18n";
import VueResource from "vue-resource";
import VueRouter from "vue-router";
import VeeValidate, { Validator } from "vee-validate";
import fr from "vee-validate/dist/locale/fr";

import { VueColorPlugin, VueAerisLanguagePlugin } from "aeris-mixins";

import TasksComponents from "../lib/modules/tasks/components/tasks-components.js";

import taskModule from "../lib/modules/tasks/store/tasks-store.js";

import app from "./app.vue";
import TaskDisplayComponentTest from "./task-display-component-test.vue";
import TasksEditComponentsTest from "./task-edit-component-test.vue";
import TasksListComponentsTest from "./tasklist-component-test.vue";

Vue.use(vueCustomElement);
Vue.use(Vuex);
Vue.use(VueI18n);
Vue.use(VueResource);
Vue.use(VueRouter);
Vue.use(VeeValidate);
Validator.localize("fr", fr);

Vue.use(VueColorPlugin);
Vue.use(VueAerisLanguagePlugin);

const store = new Vuex.Store({
  modules: {
    example: taskModule
  }
});

Vue.use(TasksComponents, {
  store: store
});

const router = new VueRouter({
  mode: "history",
  routes: [
    {
      path: "/task-path",
      component: TaskDisplayComponentTest
    },
    {
      path: "/task-edit-path",
      component: TasksEditComponentsTest
    },
    {
      path: "/tasklist-path",
      component: TasksListComponentsTest
    }
  ]
});

new Vue({
  el: "#app",
  router,
  template: "<app/>",
  components: {
    app,
    TaskDisplayComponentTest,
    TasksListComponentsTest
  }
}).$mount("#app");
