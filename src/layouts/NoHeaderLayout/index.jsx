import { Outlet } from "react-router-dom";
import Navigation from "../DefaultLayout/Navigation";
import Footer from "../components/Footer";

const NoHeaderLayout = () => {
    return (
        <div>
            <Navigation />
            <Outlet />
            <Footer />
        </div>
    );
};

export default NoHeaderLayout;
