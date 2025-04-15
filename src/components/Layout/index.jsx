// src/components/Layout/Layout.jsx
import { useUser } from "@/hooks/useUser";
import { Link, useNavigate } from "react-router-dom";
import Logout from "@/pages/Logout";
import config from "@/config";
import styles from "./Layout.module.scss";
import clsx from "clsx";
import { useLoading } from "@/hooks/useLoading";
import Loading from "../Loading";

const Layout = ({ children }) => {
    const { user, loading: userLoading } = useUser();
    const { loading: globalLoading } = useLoading();

    const isLoading = userLoading || globalLoading;
    return (
        <div className={clsx(styles.layout)}>
            {isLoading && <Loading />}
            <header className={clsx(styles.header)}>
                {user ? (
                    <div className={clsx(styles.userInfo)}>
                        <span>Welcome, {user.name || user.email}!</span>
                        {user.avatar && (
                            <img
                                src={user.avatar}
                                alt="User Avatar"
                                className={clsx(styles.avatar)}
                            />
                        )}
                        <Logout />
                    </div>
                ) : (
                    <div className={clsx(styles.authButtons)}>
                        <Link
                            to={`/login?continue=${encodeURIComponent(
                                window.location.pathname
                            )}`}
                            className={clsx(styles.loginButton)}
                        >
                            Đăng nhập
                        </Link>
                        <Link
                            to={`/register?continue=${encodeURIComponent(
                                window.location.pathname
                            )}`}
                            className={clsx(styles.registerButton)}
                        >
                            Đăng ký
                        </Link>
                    </div>
                )}
            </header>
            <main>{children}</main>
        </div>
    );
};

export default Layout;
