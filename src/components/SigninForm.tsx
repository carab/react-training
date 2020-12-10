import { useState } from "react";

type FormType = {
    email: string|null;
    password: string|null;
}

function SigninForm() {
const [values, setValues] = useState<FormType>({
    email: null,
    password: null,
});

function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target

    setValues((values) => ({
        ...values,
        [name]: value === '' ? null : value
    }));
}

function handleSubmit(event: any) {
    event.preventDefault();
    console.log(values);
}

return (
    <form onSubmit={handleSubmit}>
        <label>
            Email:
            <input type="email" name="email" value={values.email ?? ''} onChange={handleChange} />
        </label>
        <label>
            Password:
            <input type="password" name="password" value={values.password ?? ''} onChange={handleChange} />
        </label>
        <button type="submit">Submit</button>
    </form>
);
}

export default SigninForm