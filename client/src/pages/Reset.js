/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Wrapper from "../assets/wrappers/Login";
import { Alert, FormRow, Logo } from "../components";
import { useAppContext } from "../context/appContext";

const Reset = () => {
  const navigate = useNavigate();
  const { updatePassword, isPasswordReset, saveToken } = useAppContext();
  const { token } = useParams();
  const [password, setPassword] = useState({ password: "", repeat: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    updatePassword(password);
  };

  useEffect(() => {
    if (isPasswordReset) {
      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  });

  useEffect(() => {
    saveToken(token);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPassword((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  return (
    <Wrapper>
      <section>
        <form className="form" onSubmit={handleSubmit}>
          <Logo register={true} />
          <h1>Set New Password</h1>

          <FormRow
            type="password"
            name="password"
            onChange={handleChange}
            value={password.password}
          />
          <FormRow
            type="password"
            name="repeat"
            onChange={handleChange}
            value={password.repeat}
          />

          <button className="btn btn-block">Submit</button>
          <Alert />
        </form>
      </section>
    </Wrapper>
  );
};

export default Reset;
