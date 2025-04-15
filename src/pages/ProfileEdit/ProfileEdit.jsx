import InputTextHookForm from "@/components/InputText/InputTextHookForm";
import authService from "@/services/authService";
import profileSchema from "@/utils/schema/profileSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { format } from "date-fns";

const ProfileEdit = () => {
    const { username } = useParams();
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error_s, setError_s] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const prevImageRef = useRef(null);
    const prevFileRef = useRef(null);

    const {
        register,
        handleSubmit,
        watch,
        setError,
        control,
        clearErrors,
        reset,
        formState: { errors },
    } = useForm({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            username: "",
            age: null,
            gender: "",
            birthDate: null,
            image: null,
        },
        resolver: yupResolver(profileSchema),
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const profileResponse = await authService.getUserProfile(
                    username
                );
                let profileData = profileResponse.data || profileResponse;
                setUser(profileData);
                setPreviewImage(profileData.image || null);
                reset({ ...profileData, image: null });
                setLoading(false);
            } catch (error) {
                setError_s(error.message);
                setLoading(false);
            }
        };
        fetchData();
    }, [username, reset]);

    const emailValue = watch("email");
    const phoneValue = watch("phone");
    const usernameValue = watch("username");
    const imageValue = watch("image");

    // Xử lý preview ảnh
    useEffect(() => {
        if (imageValue && imageValue instanceof File) {
            if (imageValue !== prevFileRef.current) {
                if (previewImage && previewImage !== user?.image) {
                    URL.revokeObjectURL(previewImage);
                }
                const newPreview = URL.createObjectURL(imageValue);
                setPreviewImage(newPreview);
                prevImageRef.current = newPreview;
                prevFileRef.current = imageValue;
            }
        } else if (!imageValue && previewImage !== user?.image) {
            if (previewImage) {
                URL.revokeObjectURL(previewImage);
            }
            setPreviewImage(user?.image || null);
            prevFileRef.current = null;
        }
    }, [imageValue, user?.image, previewImage]);

    // Xử lý hủy bỏ chọn ảnh
    const handleCancelImage = () => {
        if (previewImage && previewImage !== user?.image) {
            URL.revokeObjectURL(previewImage);
        }
        setPreviewImage(user?.image || null);
        reset({ ...watch(), image: null });
        prevFileRef.current = null;
    };

    // Cleanup khi unmount
    useEffect(() => {
        return () => {
            if (previewImage && previewImage !== user?.image) {
                URL.revokeObjectURL(previewImage);
            }
        };
    }, [previewImage, user?.image]);

    useEffect(() => {
        const timer = setTimeout(async () => {
            if (emailValue && emailValue !== user?.email) {
                const exists = await authService.checkEmail(
                    emailValue,
                    user?.id
                );
                if (exists) {
                    setError("email", {
                        type: "manual",
                        message: "Email đã tồn tại",
                    });
                } else {
                    clearErrors("email");
                }
            }

            if (phoneValue && phoneValue !== user?.phone) {
                const exists = await authService.checkPhone(
                    phoneValue,
                    user?.id
                );
                if (exists) {
                    setError("phone", {
                        type: "manual",
                        message: "Số điện thoại đã tồn tại",
                    });
                } else {
                    clearErrors("phone");
                }
            }

            if (usernameValue && usernameValue !== user?.username) {
                const exists = await authService.checkUsername(
                    usernameValue,
                    user?.id
                );
                if (exists) {
                    setError("username", {
                        type: "manual",
                        message: "Username đã tồn tại",
                    });
                } else {
                    clearErrors("username");
                }
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [
        emailValue,
        phoneValue,
        usernameValue,
        clearErrors,
        setError,
        user?.email,
        user?.id,
        user?.username,
        user?.phone,
    ]);

    const onSubmit = async (data) => {
        try {
            console.log("Dữ liệu form:", data);

            // Tách thông tin người dùng
            const payload = { ...data };
            delete payload.image;
            if (payload.birthDate) {
                payload.birthDate = format(
                    new Date(payload.birthDate),
                    "yyyy-MM-dd"
                );
            }
            // console.log("Payload thông tin:", payload);

            // Gửi thông tin người dùng qua JSON
            await authService.updateUserProfile(username, payload);

            // Fetch lại dữ liệu để đồng bộ
            const updatedUser = await authService.getUserProfile(username);
            const updatedData = updatedUser.data || updatedUser;
            // console.log("Dữ liệu từ server:", updatedData);

            setUser(updatedData);
            setPreviewImage(updatedData.image || null);
            reset({ ...updatedData, image: null });
            prevFileRef.current = null;
            toast.success("Cập nhật thông tin thành công!", {
                onClose: () => navigate(`/profile/${username}`),
            });
        } catch (error) {
            console.error(
                "Lỗi khi cập nhật:",
                error.response?.data || error.message
            );
            toast.error(
                error.response?.data?.message ||
                    "Có lỗi xảy ra, vui lòng thử lại"
            );
        }
    };

    if (loading) return <div style={{ textAlign: "center" }}>Loading...</div>;
    if (error_s) return <div style={{ textAlign: "center" }}>{error_s}</div>;
    if (!user)
        return (
            <div style={{ textAlign: "center" }}>
                Không có dữ liệu người dùng
            </div>
        );

    return (
        <div>
            <h2>Chỉnh sửa thông tin cá nhân</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginBottom: "20px" }}>
                    <label>Ảnh đại diện:</label>
                    <div>
                        {previewImage ? (
                            <img
                                src={previewImage}
                                alt="Avatar Preview"
                                style={{ width: "200px", marginBottom: "10px" }}
                            />
                        ) : (
                            <p>Chưa có ảnh đại diện</p>
                        )}
                    </div>
                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    field.onChange(file);
                                }}
                            />
                        )}
                    />
                    {errors.image && (
                        <p style={{ color: "red" }}>{errors.image.message}</p>
                    )}
                    {imageValue && (
                        <div style={{ marginTop: "10px" }}>
                            <button
                                type="button"
                                onClick={handleCancelImage}
                                style={{ marginRight: "10px" }}
                            >
                                Hủy bỏ
                            </button>
                        </div>
                    )}
                </div>
                <InputTextHookForm
                    label="Họ"
                    name="lastName"
                    error={errors.lastName?.message}
                    {...register("lastName")}
                />
                <InputTextHookForm
                    label="Tên"
                    name="firstName"
                    error={errors.firstName?.message}
                    {...register("firstName")}
                />
                <InputTextHookForm
                    label="Email"
                    name="email"
                    type="email"
                    error={errors.email?.message}
                    {...register("email")}
                />
                <InputTextHookForm
                    label="Số điện thoại"
                    name="phone"
                    type="tel"
                    error={errors.phone?.message}
                    {...register("phone")}
                />
                <InputTextHookForm
                    label="Username"
                    name="username"
                    error={errors.username?.message}
                    {...register("username")}
                />
                <InputTextHookForm
                    label="Tuổi"
                    name="age"
                    type="number"
                    error={errors.age?.message}
                    {...register("age")}
                />
                <div>
                    <label>Giới tính:</label>
                    <select {...register("gender")}>
                        <option value="">Chọn giới tính</option>
                        <option value="male">Nam</option>
                        <option value="female">Nữ</option>
                    </select>
                    {errors.gender && <p>{errors.gender.message}</p>}
                </div>
                <InputTextHookForm
                    label="Ngày sinh"
                    name="birthDate"
                    type="date"
                    error={errors.birthDate?.message}
                    {...register("birthDate")}
                />
                <button type="submit">Lưu</button>
                <button
                    type="button"
                    onClick={() => navigate(`/profile/${username}`)}
                >
                    Hủy
                </button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default ProfileEdit;
