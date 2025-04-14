import * as yup from "yup";
const profileSchema = yup
    .object({
        firstName: yup
            .string()
            .required("Tên là bắt buộc")
            .min(2, "Tên phải có ít nhất 2 ký tự"),
        lastName: yup
            .string()
            .required("Họ là bắt buộc")
            .min(2, "Họ phải có ít nhất 2 ký tự"),
        email: yup.string().email("Email không đúng định dạng"),
        phone: yup
            .string()
            .matches(/^[0-9]{10}$/, "Số điện thoại phải là 10 chữ số"),
        username: yup.string().min(3, "Username phải có ít nhất 3 ký tự"),
        age: yup.number().min(1, "Tuổi phải lớn hơn 0").nullable(),
        gender: yup
            .string()
            .oneOf(["male", "female", ""], "Giới tính không hợp lệ"),
        birthDate: yup.date().nullable(),
        image: yup
            .mixed()
            .nullable()
            .test("fileType", "File phải là ảnh (jpg, jpeg, png)", (value) => {
                if (!value) return true; // Cho phép null
                return ["image/jpeg", "image/png", "image/jpg"].includes(
                    value.type
                );
            })
            .test("fileSize", "File quá lớn, tối đa 5MB", (value) => {
                if (!value) return true; // Cho phép null
                return value.size <= 5 * 1024 * 1024; // 5MB
            }),
    })
    .required();

export default profileSchema;
