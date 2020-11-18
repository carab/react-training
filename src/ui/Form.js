import { useState } from "react";
import Button from "./Button";

function Form() {
  const [values, setValues] = useState({
    email: "",
    phone: "",
    cgu: false,
  });

  function onSubmit(event) {
    event.preventDefault();

    // send to API

    console.log(values);
    setValues({
      email: "",
      phone: "",
      cgu: false,
    });
  }

  function onChange(event) {
    const { name, value, type, checked } = event.target;

    setValues((values) => ({
      ...values,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  return (
    <form onSubmit={onSubmit}>
      <label>
        Email:
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={onChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="text"
          name="phone"
          value={values.phone}
          onChange={onChange}
        />
      </label>
      <label>
        Phone:
        <input
          type="checkbox"
          name="cgu"
          checked={values.cgu}
          onChange={onChange}
        />
      </label>
      <Button
        color="primary"
      >
        Submit
      </Button>
      <Button
        color="default"
        Component="a"
        href="/.."
      >
        Mot de passe oublié
      </Button>
    </form>
  );
}

export default Form;
