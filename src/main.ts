import { createApp } from "vue";
import { createPinia } from "pinia";
import "./style.css";
import "./primevue-custom.css";
import "primeicons/primeicons.css";
import App from "./App.vue";
import router from "./router";
import PrimeVue from "primevue/config";
import Aura from "@primeuix/themes/aura";
import Button from "primevue/button";
import { definePreset } from "@primeuix/themes";

const app = createApp(App);
const pinia = createPinia();
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: "{gray.50}",
      100: "{gray.100}",
      200: "{gray.200}",
      300: "{gray.300}",
      400: "{gray.400}",
      500: "{gray.500}",
      600: "{gray.600}",
      700: "{gray.700}",
      800: "{gray.800}",
      900: "{gray.900}",
      950: "{gray.950}",
    },
  },
});

app.component("Button", Button);
app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
  },
});

app.use(pinia);
app.use(router);
app.mount("#app");
