import { BrowserRouter } from "react-router-dom";
import ScrollTop from "./components/ScrollTop";
import AppRoutes from "./components/AppRoutes/AppRoutes";
import styles from "./pages/Home/Home.module.scss";
import clsx from "clsx";
import useTheme from "./hooks/useTheme";
import OverlayProvider from "./contexts/OverlayContext";
import { LoadingProvider } from "./contexts/LoadingContext";
function App() {
    const { theme } = useTheme();
    return (
        <BrowserRouter>
            <LoadingProvider>
                <ScrollTop />
                <OverlayProvider>
                    <div className={clsx(styles.app, styles[`${theme}-mode`])}>
                        <AppRoutes />
                    </div>
                </OverlayProvider>
            </LoadingProvider>
        </BrowserRouter>
    );
}

export default App;
