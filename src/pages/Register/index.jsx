import { Link, useNavigate } from "react-router-dom";
import httpRequest from "@/utils/httpRequest";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "@/utils/schema/registerSchema";
import InputTextHookForm from "@/components/InputText/InputTextHookForm";
import { useContext, useEffect } from "react";
import authService from "@/services/authService";
import { useOverlay } from "@/contexts/OverlayContext";
import Login from "../Login";
import styles from "./Register.module.scss";
import clsx from "clsx";
import useDebounce from "@/hooks/useDebounce";
import { UserContext } from "@/contexts/UserContext";

let timer;

const Register = () => {
    const navigate = useNavigate();
    const { closeOverlay, openOverlay } = useOverlay();
    const { setUser } = useContext(UserContext);

    // Khởi tạo React Hook Form với Yup resolver
    const {
        register,
        handleSubmit,
        watch,
        trigger,
        setError,
        clearErrors,
        formState: { errors },
    } = useForm({
        defaultValues: {
            fullName: "",
            email: "",
            password: "",
            passwordConfirmation: "",
        },
        resolver: yupResolver(registerSchema),
    });

    //Lấy gái trị nhập từ form
    const emailValue = watch("email");
    const debouncedEmail = useDebounce(emailValue, 800);

    //Tách họ và tên
    const splitFullName = (fullName) => {
        const nameParts = fullName.trim().split(" ");
        const firstName = nameParts.pop() || "";
        const lastName = nameParts.join(" ") || "";
        return { firstName, lastName };
    };

    const onSubmit = async (data) => {
        const { fullName, email, password, passwordConfirmation } = data;
        const { firstName, lastName } = splitFullName(fullName);

        const payload = {
            firstName,
            lastName,
            email,
            password,
            password_confirmation: passwordConfirmation,
        };

        try {
            const response = await httpRequest.post("/auth/register", payload);

            httpRequest.setToken(response.data.access_token);
            const user = await authService.getCurrentUser();
            setUser(user);
            alert("Đăng ký thành công");
            closeOverlay();
            navigate("/");
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const errorData = error.response.data;

                // Xử lý các lỗi từ API
                if (
                    errorData.message.email?.[0].includes(
                        "The email has already been taken"
                    )
                ) {
                    setError("email", {
                        type: "manual",
                        message: "Email đã tồn tại",
                    });
                }
                if (
                    errorData.message.lastName?.[0].includes(
                        "The last name field is required"
                    )
                ) {
                    setError("fullName", {
                        type: "manual",
                        message: "The last name field is required",
                    });
                }
            } else {
                setError("email", {
                    type: "manual",
                    message: "Đã có lỗi xảy ra, vui lòng thử lại sau",
                });
                console.error("Lỗi kết nối API:", error.message);
            }
        }
    };

    useEffect(() => {
        //Khi người dùng chưa nhập gì hoặc xóa hết
        if (!debouncedEmail) {
            clearErrors("email");
            return;
        }
        clearTimeout(timer);
        timer = setTimeout(async () => {
            //trigger("email") validation cho field email, nó lấy giá trị hiện tại của field email trong form
            const isValid = await trigger("email");
            if (isValid) {
                //exists : true tức là email đã tồn tai, false là email chưa tồn tại
                const exists = await authService.checkEmail(debouncedEmail);

                console.log(exists);
                if (exists) {
                    setError("email", {
                        type: "manual",
                        message: "Email đã tồn tại...",
                    });
                } else {
                    clearErrors("email");
                }
            }
        }, 800);
    }, [debouncedEmail, trigger, setError, clearErrors]);

    const handleLoginClick = () => {
        closeOverlay();
        openOverlay(<Login />);
    };
    return (
        <div
            className={clsx(styles.register_form)}
            style={{ maxWidth: "400px", margin: "50px auto", padding: "20px" }}
        >
            <h2>Đăng ký</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <InputTextHookForm
                        label={"Họ và tên"}
                        type="text"
                        name="fullName"
                        {...register("fullName")}
                        error={errors.fullName?.message}
                    />
                </div>
                <div>
                    <InputTextHookForm
                        label={"Email"}
                        type="email"
                        name="email"
                        error={errors.email?.message}
                        {...register("email")}
                    />
                </div>
                <div>
                    <InputTextHookForm
                        label={"Mật khẩu"}
                        type="password"
                        name="password"
                        {...register("password")}
                        error={errors.password?.message}
                    />
                </div>

                <div>
                    <InputTextHookForm
                        label={"Nhập lại mật khẩu"}
                        type="password"
                        name="passwordConfirmation"
                        {...register("passwordConfirmation")}
                        error={errors.passwordConfirmation?.message}
                    />
                </div>

                <button type="submit">Đăng ký</button>
                <div>
                    <span>Bạn đã có tài khoản?</span>
                    <Link
                        className={clsx(styles.login_link)}
                        href="#"
                        onClick={(e) => {
                            e.preventDefault();
                            handleLoginClick();
                        }}
                    >
                        {" "}
                        Đăng nhập
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default Register;
