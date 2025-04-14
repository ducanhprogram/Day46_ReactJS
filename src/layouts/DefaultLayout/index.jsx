import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Overlay from "@/components/Overlay";
import { useOverlay } from "@/contexts/OverlayContext";

const DefaultLayout = () => {
    const { isOverlayOpen, closeOverlay, overlayContent } = useOverlay();
    return (
        <div className="wrapper">
            <Header />
            <Outlet />
            <Footer />
            <Overlay isOpen={isOverlayOpen} onClose={closeOverlay}>
                {overlayContent}
            </Overlay>
        </div>
    );
};

export default DefaultLayout;
