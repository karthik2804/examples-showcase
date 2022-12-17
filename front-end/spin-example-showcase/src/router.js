import { createWebHistory, createRouter } from "vue-router";
import ListExamples from "./components/WorkspaceListingView.vue";
import ShowExample from "./components/ExampleDetails/ExampleDetails.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: ListExamples,
  },
  {
    path: '/detail/:id',
    name: "About",
    component: ShowExample,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;