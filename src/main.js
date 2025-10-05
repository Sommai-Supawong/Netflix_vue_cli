import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import CustomAlert from "@/components/CustomAlert.vue";
import "./assets/main.css";

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.component('CustomAlert', CustomAlert);
app.mount("#app");
