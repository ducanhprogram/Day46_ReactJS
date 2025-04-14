import clsx from "clsx";
import styles from "./Navigation.module.scss";
import NavItem from "@/components/NavItem/NavItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faCaretDown,
    faMoon,
    faPhoneVolume,
    faShieldAlt,
    faStore,
    faSun,
    faUser,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { UserContext } from "@/contexts/UserContext";
import useTheme from "@/hooks/useTheme";
import Button from "@/components/Button";

import Login from "@/pages/Login";
import { useOverlay } from "@/contexts/OverlayContext";
import Logout from "@/pages/Logout/Logout";
import config from "@/config";

function Navigation() {
    const navigate = useNavigate();
    const [showRegionOverlay, setShowRegionOverlay] = useState(false);
    const [selectedRegion, setSelectedRegion] = useState("Miền Bắc");
    const { user, loading } = useContext(UserContext);
    const { theme, toggleTheme } = useTheme(); // Sử dụng useTheme
    const themeIcon = theme === "light" ? faMoon : faSun;
    const { openOverlay } = useOverlay();

    //hàm xử lý khi click vào "Xem giá tại"
    const toggleRegionOverlay = () => {
        setShowRegionOverlay(!showRegionOverlay);
    };

    //Hàm xử lý khi chọn một miền
    const handleRegionSelect = (region) => {
        setSelectedRegion(region);
        setShowRegionOverlay(false);
    };

    const handleLoginClick = () => {
        openOverlay(<Login />);
    };

    // const handleRegisterClick = () => {
    //     openOverlay(<Register />);
    // };
    return (
        <nav className={clsx(styles.navigation)}>
            <div className={clsx(styles.regionWrapper)}>
                <NavItem
                    className={
                        (styles.dropdown,
                        {
                            [styles.active]: showRegionOverlay,
                        })
                    }
                    onClick={toggleRegionOverlay}
                >
                    Xem giá tại
                    <FontAwesomeIcon
                        icon={faCaretDown}
                        className={styles.arrow}
                    ></FontAwesomeIcon>
                </NavItem>
                <span className={styles.selectedRegion}>{selectedRegion}</span>

                {showRegionOverlay && (
                    <div className={styles.regionOverlay}>
                        <button
                            className={styles.regionOption}
                            onClick={() => handleRegionSelect("Miền Bắc")}
                        >
                            Miền Bắc
                        </button>
                        <button
                            className={styles.regionOption}
                            onClick={() => handleRegionSelect("Miền Trung")}
                        >
                            Miền Trung
                        </button>
                        <button
                            className={styles.regionOption}
                            onClick={() => handleRegionSelect("Miền Nam")}
                        >
                            Miền Nam
                        </button>
                    </div>
                )}
            </div>

            {/* Gọi mua hàng */}
            <div className={clsx(styles.info_website)}>
                <NavItem icon={faPhoneVolume} href="tel: 1900633471">
                    Gọi mua hàng <br /> 1900.633.471
                </NavItem>

                {/* Chính sách Bảo hành */}
                <NavItem icon={faShieldAlt} to="/">
                    Chính sách <br /> Bảo hành
                </NavItem>

                {/* Hệ thống cửa hàng */}
                <NavItem icon={faStore} to="/stores">
                    Hệ thống
                    <br />
                    Cửa hàng
                </NavItem>

                {loading ? (
                    <span>Đang tải...</span>
                ) : user ? (
                    <div className={styles.userActions}>
                        <NavItem
                            icon={faUser}
                            to={`/profile/${user.data.username}`}
                        >
                            {user.data.firstName}
                        </NavItem>
                        <Logout />
                    </div>
                ) : (
                    <NavItem icon={faUser} onClick={handleLoginClick}>
                        Đăng nhập
                        <br />
                        Tài khoản
                    </NavItem>
                )}
            </div>

            <Button
                onClick={toggleTheme}
                icon={themeIcon}
                rounded
                themeToggle
                className={styles.themeToggle}
            />
        </nav>
    );
}

export default Navigation;
