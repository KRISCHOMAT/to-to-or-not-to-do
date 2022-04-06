import React from "react";
import { useAppContext } from "../context/appContext";

const Alert = () => {
  const { alertText, alertType } = useAppContext();
  return (
    <div className={`alert alert-${alertType}`}>
      <p className="alert-text">{alertText}</p>
    </div>
  );
};

export default Alert;
