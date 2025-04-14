import { Link } from "react-router-dom";
import Navigation from "../Navigation";
import SearchForm from "../SearchForm";
import styles from "./Header.module.scss";
import clsx from "clsx";
const Header = () => {
    return (
        <header className={clsx(styles.header)}>
            <div className={clsx(styles.header_top)}>
                <div className={clsx(styles.container)}>
                    <div className={clsx(styles.logo)}>
                        <Link to={"/"} title="logo">
                            <img
                                width={245}
                                height={45}
                                src="https://clickbuy.com.vn//uploads/images/logo/clickbuy-logo.png"
                                alt="Clickbuy.com.vn - Hệ thống bán lẻ điện thoại, máy tính bảng, laptop, phụ kiện chính hãng"
                                title="Clickbuy.com.vn - Hệ thống bán lẻ điện thoại, máy tính bảng, laptop, phụ kiện chính hãng"
                            />
                        </Link>
                    </div>
                    <SearchForm />
                    <Navigation />
                </div>
            </div>
        </header>
    );
};

export default Header;
