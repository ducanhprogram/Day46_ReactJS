// contexts/OverlayContext.jsx
import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";
const OverlayContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useOverlay = () => useContext(OverlayContext);

export const OverlayProvider = ({ children }) => {
    const [isOverlayOpen, setIsOverlayOpen] = useState(false);
    const [overlayContent, setOverlayContent] = useState(null);

    const openOverlay = (content) => {
        setOverlayContent(content);
        setIsOverlayOpen(true);
    };

    const closeOverlay = () => {
        setIsOverlayOpen(false);
        setOverlayContent(null);
    };

    return (
        <OverlayContext.Provider
            value={{ isOverlayOpen, openOverlay, closeOverlay, overlayContent }}
        >
            {children}
        </OverlayContext.Provider>
    );
};

OverlayProvider.propTypes = {
    children: PropTypes.node,
};

export default OverlayProvider;
