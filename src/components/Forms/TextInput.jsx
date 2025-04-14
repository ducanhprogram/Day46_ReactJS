function TextInput({ type = "text", name, register, error }) {
    return (
        <div>
            <input type={type} name={name} {...register} />
            {error && <p>{error}</p>}
        </div>
    );
}

export default TextInput;
