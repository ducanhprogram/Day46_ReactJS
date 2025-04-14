import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "@/contexts/UserContext";
import authService from "@/services/authService";
import { setToken } from "@/utils/httpRequest";
import NavItem from "@/components/NavItem/NavItem"; // Nếu bạn muốn dùng NavItem cho giao diện đồng bộ

const Logout = () => {
    const navigate = useNavigate();
    const { setUser } = useContext(UserContext);

    const handleLogout = async () => {
        const isConfirm = window.confirm("Bạn có chắc chắn muốn đăng xuất?");
        if (!isConfirm) return;

        const token = localStorage.getItem("token");
        if (!token) {
            setUser(null);
            navigate("/");
            return;
        }

        try {
            const data = await authService.logout();
            if (data.status === "success") {
                setToken(null);
                localStorage.removeItem("token");
                setUser(null);
                navigate("/");
            } else {
                console.error("Đăng xuất không thành công: ", data.message);
            }
        } catch (error) {
            console.error("Lỗi đăng xuất: ", error);
        }
    };

    return <NavItem onClick={handleLogout}>Đăng xuất</NavItem>;
};

export default Logout;
