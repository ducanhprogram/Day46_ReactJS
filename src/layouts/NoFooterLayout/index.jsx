import { Outlet } from "react-router-dom";
import Navigation from "../DefaultLayout/Navigation";
import Header from "../components/Header";

const NoFooterLayout = () => {
    return (
        <div>
            <Header />
            <Navigation />
            <Outlet />
        </div>
    );
};

export default NoFooterLayout;
