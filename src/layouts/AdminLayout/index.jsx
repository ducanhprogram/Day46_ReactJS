import config from "@/config";
import useUser from "@/hooks/useUser";
import { Link, NavLink, Outlet } from "react-router-dom";

const AdminLayout = () => {
    const user = useUser();
    console.log(user);
    return (
        <div className="wrapper">
            <h1>Admin Layout</h1>
            <nav>
                <ul>
                    <li>
                        <NavLink to={config.routes.home}>Home</NavLink>
                    </li>
                    <li>
                        <NavLink to={config.routes.products}>Products</NavLink>
                    </li>
                </ul>
            </nav>

            {user && (
                <div>
                    <p>Xin chào, {user.lastName}</p>
                    <Link to={`/profile/${user.username}`}>Trang cá nhân</Link>
                </div>
            )}
            <Outlet />
        </div>
    );
};

export default AdminLayout;
