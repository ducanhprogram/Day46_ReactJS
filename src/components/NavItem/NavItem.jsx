import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./NavItem.module.scss";
import clsx from "clsx";
import { NavLink } from "react-router-dom";

const NavItem = ({
    children,
    icon,
    to = "",
    href = "",
    className,
    onClick,
}) => {
    let Component = "div";
    const passProps = {};
    if (to) {
        Component = NavLink;
        passProps.to = to;
    } else if (href) {
        Component = "a";
        passProps.href = href;
    }

    const handleClick = () => {
        if (typeof onClick === "function") {
            onClick();
        }
    };

    return (
        <Component
            {...passProps}
            className={clsx(styles.navItem, className)}
            onClick={handleClick}
        >
            {icon && <FontAwesomeIcon icon={icon} className={styles.icon} />}
            <span>{children}</span>
        </Component>
    );
};

NavItem.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    to: PropTypes.string,
    href: PropTypes.string,
    icon: PropTypes.object,
    onClick: PropTypes.func,
};

export default NavItem;
