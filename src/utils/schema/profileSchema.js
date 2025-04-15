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
        email: yup.string().email("Email không đúng định dạng").nullable(),
        phone: yup
            .string()
            .matches(/^[0-9]{10}$/, {
                message: "Số điện thoại phải là 10 chữ số",
                excludeEmptyString: true,
            })
            .nullable(),
        username: yup
            .string()
            .min(3, "Username phải có ít nhất 3 ký tự")
            .nullable(),
        age: yup.number().min(0, "Tuổi không được âm").nullable(),
        gender: yup
            .string()
            .oneOf(["male", "female", ""], "Giới tính không hợp lệ")
            .nullable(),
        birthDate: yup.date().nullable(),
        image: yup
            .mixed()
            .nullable()
            .test("fileType", "File phải là ảnh (jpg, jpeg, png)", (value) => {
                if (!value || !(value instanceof File)) return true;
                return ["image/jpeg", "image/png", "image/jpg"].includes(
                    value.type
                );
            })
            .test("fileSize", "File quá lớn, tối đa 5MB", (value) => {
                if (!value || !(value instanceof File)) return true;
                return value.size <= 5 * 1024 * 1024;
            }),
    })
    .required();

export default profileSchema;
