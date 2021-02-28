import Home from "../views/Home.vue";
import Classify from "../views/Classify.vue";
import Shopping from "../views/Shopping.vue";
import Search from "../views/Search.vue";

const routes = [
    {
        path: "/home",
        redirect: "/home/classify",
        component: Home,
        children: [
            { path: "classify", component: Classify },
            { path: "shopping", component: Shopping },
        ],
    },
    {
        path: "/search",
        component: Search,
    },
    {
        path: "*",
        redirect: "/home/classify",
    },
];

export default routes;
