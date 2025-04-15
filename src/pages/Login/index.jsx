import InputTextHookForm from "@/components/InputText/InputTextHookForm";
// import config from "@/config";
// import useQuery from "@/hooks/useQuery";
// import httpRequest from "@/utils/httpRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "@/utils/schema/loginSchema";
import authService from "@/services/authService";
import { Link, useNavigate } from "react-router-dom";
import useQuery from "@/hooks/useQuery";
import config from "@/config";
import { useOverlay } from "@/contexts/OverlayContext";
import Register from "../Register";
import styles from "./Login.module.scss";
import clsx from "clsx";
import useUser from "@/hooks/useUser";
import { useLoading } from "@/hooks/useLoading";
import { useEffect } from "react";

const Login = () => {
    const navigate = useNavigate();
    const query = useQuery();
    const { closeOverlay, openOverlay } = useOverlay();
    // const { setUser } = useContext(UserContext);
    const { setUser } = useUser();
    const { setLoading } = useLoading();

    //resolver: Là cầu đổi chuyển đổi giúp React Hook Form sử dụng thư viện validation bên ngoài (Yup)
    const {
        register,
        handleSubmit,
        setError,
        clearErrors,
        watch,
        trigger,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: yupResolver(loginSchema),
    });

    const emailValue = watch("email");
    const passwordValue = watch("password");

    useEffect(() => {
        if (emailValue && errors.email?.type === "manual") {
            clearErrors("email");
        }
        if (passwordValue && errors.password?.type === "manual") {
            clearErrors("password");
        }
    }, [emailValue, passwordValue, errors, clearErrors]);

    const onSubmit = async (data) => {
        const isValid = await trigger();

        if (!isValid) {
            return;
        }
        setLoading(true);
        //call API
        try {
            const response = await authService.login(data);
            const userData = await authService.getCurrentUser();
            setUser(userData);
            if (response.status === "success" && response.data.access_token) {
                alert("Đăng nhập thành công");
                closeOverlay();
                const continuePath =
                    query.get("continue") || config.routes.home;
                navigate(continuePath);
            }

            throw new Error("Đăng nhập không thành công");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.message) {
                const data = error.response.data;

                console.log(data);
                // Xử lý lỗi từ API
                if (data.message) {
                    setError("password", {
                        type: "manual",
                        message: "Email hoặc mật khẩu không đúng!",
                    });
                }
            } else {
                setError("email", {
                    type: "manual",
                    message: "Đã có lỗi xảy ra. Vui lòng thử lại sau.",
                });
            }
        } finally {
            setLoading(false);
        }
    };

    const handleRegisterClick = () => {
        closeOverlay(); // Đóng form đăng nhập
        openOverlay(<Register />); // Mở form đăng ký trong overlay
    };

    return (
        <div
            className={clsx(styles.login_form)}
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng nhập</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <InputTextHookForm
                    label={"Email"}
                    type="email"
                    name="email"
                    error={errors.email?.message}
                    {...register("email")}
                />

                <InputTextHookForm
                    label={"Mật khẩu"}
                    type="password"
                    name="password"
                    error={errors.password?.message}
                    {...register("password")}
                />

                <button>Đăng nhập</button>
                <div>
                    <span>Bạn chưa có tài khoản?</span>
                    <Link
                        className={clsx(styles.register_link)}
                        to={"#"}
                        onClick={(e) => {
                            e.preventDefault();
                            handleRegisterClick();
                        }}
                    >
                        {" "}
                        Đăng ký ngay
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Login;
