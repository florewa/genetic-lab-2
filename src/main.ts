import "@/assets/styles/main.scss";

import { VueQueryPlugin } from "@tanstack/vue-query";
import { createPinia } from "pinia";
import { createApp } from "vue";

import App from "./App.vue";

import router from "@/router";

const app = createApp(App);

app
  .use(VueQueryPlugin, {
    enableDevtoolsV6Plugin: true,
  })
  .use(router)
  .use(createPinia());

app.mount("#app");
