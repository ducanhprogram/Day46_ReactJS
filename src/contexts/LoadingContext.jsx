import { createContext, useState } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line react-refresh/only-export-components
export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);

    const value = {
        loading,
        setLoading,
    };

    return (
        <LoadingContext.Provider value={value}>
            {children}
        </LoadingContext.Provider>
    );
};

LoadingProvider.propTypes = {
    children: PropTypes.element.isRequired,
};
