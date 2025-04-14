import PropTypes from "prop-types";

function Tab({ children }) {
    return <div>{children}</div>;
}

Tab.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Tab;
