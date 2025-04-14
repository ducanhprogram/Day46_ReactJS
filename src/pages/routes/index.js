import config from "@/config";
import AdminLayout from "@/layouts/AdminLayout";
import NotFound from "@/pages/NotFound.jsx";
import ProductDetail from "@/pages/ProductDetail";
import Products from "@/pages/Products";
import Users from "@/pages/Users";
import Profile from "../Profile";
import ProfileEdit from "../ProfileEdit/ProfileEdit";

import Register from "../Register";
import Login from "../Login";
import Home from "../Home";

const routes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.products,
        component: Products,
        layout: AdminLayout,
    },
    {
        path: config.routes.productDetail,
        component: ProductDetail,
        layout: null,
        protected: false,
    },

    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.users,
        component: Users,
        protected: true,
    },
    {
        path: config.routes.profile,
        component: Profile,
        protected: true,
    },
    {
        path: config.routes.profileEdit,
        component: ProfileEdit,
        protected: true,
    },

    {
        path: config.routes.notFound,
        component: NotFound,
    },
];

export default routes;
