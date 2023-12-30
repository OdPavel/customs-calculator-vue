import { createRouter, createWebHistory } from 'vue-router';
import FormApi from "@/components/FormApi";
import CustomsApi from "@/components/CustomsApi";

const routes = [
  {
    path: '/',
    name: 'default',
    component: FormApi,
  },
  {
    path: '/customs',
    name: 'customs',
    component: CustomsApi,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


