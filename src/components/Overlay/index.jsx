import { useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import styles from "./Overlay.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const Overlay = ({ isOpen, onClose, children, className }) => {
    // Xử lý đóng overlay khi click bên ngoài
    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape" && isOpen) {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
        }

        return () => {
            document.removeEventListener("keydown", handleEscape);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={clsx(styles.overlay)} onClick={onClose}>
            <div
                className={clsx(styles.modal, className)}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
                <button className={styles.closeButton} onClick={onClose}>
                    <FontAwesomeIcon icon={faTimes} />
                </button>
            </div>
        </div>
    );
};

Overlay.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    children: PropTypes.node,
    className: PropTypes.string,
};

export default Overlay;
