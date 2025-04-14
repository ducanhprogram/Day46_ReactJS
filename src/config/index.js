const config = {
    routes: {
        home: "/",
        register: "/register",
        login: "/login",
        products: "/products",
        productDetail: "/products/:slug",
        users: "/users",
        profile: "/profile/:username",
        profileEdit: "/profile/:username/edit",
        notFound: "*",
    },
};

export default config;
