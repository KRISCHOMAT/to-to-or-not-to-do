import React, { useEffect, useState } from "react";
import { Logo, FormRow, Alert } from "../components";
import Wrapper from "../assets/wrappers/Login";
import { useAppContext } from "../context/appContext";
import { useNavigate } from "react-router-dom";

const initValues = {
  email: "",
  name: "",
  password: "",
};
const Register = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(initValues);

  const {
    user,
    setIsMember,
    setIsReset,
    setupUser,
    registerState,
    resetPassword,
  } = useAppContext();

  const changeIsMember = () => {
    setIsMember();
  };

  const changeIsReset = () => {
    setIsReset();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (registerState === "register") {
      const { email, name, password } = values;
      const user = { email, name, password };
      setupUser("register", user);
    } else if (registerState === "login") {
      const { email, password } = values;
      const user = { email, password };
      setupUser("login", user);
    } else {
      const { email } = values;
      resetPassword(email);
    }
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  });
  return (
    <>
      <Wrapper>
        <section>
          <form className="form" onSubmit={handleSubmit}>
            <Logo register={true} />
            {registerState === "login" && <h1>Login</h1>}
            {registerState === "register" && <h1>Register</h1>}
            {registerState === "reset" && <h1>Reset Password</h1>}

            {registerState === "register" && (
              <FormRow
                type="text"
                name="name"
                onChange={handleChange}
                value={values.name}
              />
            )}
            <FormRow
              type="text"
              name="email"
              onChange={handleChange}
              value={values.email}
            />
            {registerState !== "reset" && (
              <FormRow
                type="password"
                name="password"
                onChange={handleChange}
                value={values.password}
              />
            )}

            <button className="btn btn-block">Submit</button>
            <Alert />

            {registerState === "login" && (
              <div className="memberCheck">
                not a member yet?
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={changeIsMember}
                >
                  register
                </button>
              </div>
            )}

            {registerState !== "login" && (
              <div className="memberCheck">
                already a member?
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={changeIsMember}
                >
                  login
                </button>
              </div>
            )}

            {registerState === "login" && (
              <div className="memberCheck">
                forgot your password?
                <button
                  type="button"
                  className="btn btn-small"
                  onClick={changeIsReset}
                >
                  reset
                </button>
              </div>
            )}
          </form>
        </section>
      </Wrapper>
    </>
  );
};

export default Register;
