import React from "react";
import { Wrapper } from "../../assets/wrappers/UserInfo";
import { InfoSection } from "../../components";
import { useAppContext } from "../../context/appContext";
import { useState, useEffect } from "react";
import { Alert } from "../../components";
import { useNavigate } from "react-router-dom";

const UserInfo = () => {
  const navigate = useNavigate();
  const { user, updateUser, showAlert, updatePassword } = useAppContext();
  const [userInfo, setUserInfo] = useState(user);
  const [password, setPassword] = useState({
    password: "",
    repeat: "",
  });

  const changeUserInfo = (e) => {
    const { name, value } = e.target;
    setUserInfo((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const saveInfo = () => {
    updateUser(userInfo);
  };

  const changePassword = (e) => {
    const { name, value } = e.target;
    setPassword((prevValues) => {
      return {
        ...prevValues,
        [name]: value,
      };
    });
  };

  const savePassword = () => {
    updatePassword(password);
    setPassword({ password: "", repeat: "" });
  };

  useEffect(() => {
    if (showAlert) {
      setTimeout(() => {
        setUserInfo(user);
        navigate("");
      }, 2000);
    }
  });

  return (
    <Wrapper>
      <h1 className="mainHeading">user info</h1>

      <InfoSection
        title="User Info"
        fields={[
          { type: "text", name: "name", value: userInfo.name },
          { type: "text", name: "email", value: userInfo.email },
        ]}
        onChange={changeUserInfo}
        onClick={saveInfo}
        onDefault={true}
      />

      <InfoSection
        title="Change Password"
        fields={[
          { type: "password", name: "password", value: password.password },
          { type: "password", name: "repeat", value: password.repeat },
        ]}
        onChange={changePassword}
        onClick={savePassword}
        onDefault={false}
      />
      <Alert />
    </Wrapper>
  );
};

export default UserInfo;
