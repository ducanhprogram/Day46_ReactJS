import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import TextInput from "./TextInput";
import { ALLOW_REGISTER_INPUTS } from "./consts";

function Form({ children, schema, defaultValues = {}, formProps, onSubmit }) {
    const config = {
        defaultValues,
        ...formProps,
    };
    if (schema) {
        config.resolver = yupResolver(schema);
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm(config);

    const inputs = React.Children.toArray(children).map((child) => {
        //Loại trừ những cái nào không phải là input
        if (!ALLOW_REGISTER_INPUTS.includes(child.type)) {
            return child;
        }
        return React.cloneElement(child, {
            register: register(child.props.name),
            error: errors[child.props.name]?.message,
        });

        // return {
        //     ...child,
        //     props: {
        //         ...child.props,
        //         register: register(child.props.name),
        //         error: errors[child.props.name]?.message,
        //     },
        // };
    });

    return <form onSubmit={handleSubmit(onSubmit)}>{inputs}</form>;
}

export default Form;
