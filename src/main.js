import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "./assets/tailwind.css"; // ถ้าใช้ Tailwind

const app = createApp(App);
app.use(createPinia());
app.use(router);
app.mount("#app");
