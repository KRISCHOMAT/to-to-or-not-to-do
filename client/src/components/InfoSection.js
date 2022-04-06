import { Collapse } from "@mui/material";
import React, { useState } from "react";
import { GoTriangleDown, GoTriangleUp } from "react-icons/go";
import FormRow from "./formRow";

const InfoSection = ({ title, fields, onChange, onClick, onDefault }) => {
  const [isToggle, setIsToggle] = useState(onDefault);

  return (
    <div className="setupField">
      <div className="firstRow">
        <h4>{title}</h4>
        {!isToggle ? (
          <GoTriangleDown
            size={26}
            className="toggler"
            onClick={() => {
              setIsToggle(!isToggle);
            }}
          />
        ) : (
          <GoTriangleUp
            size={26}
            className="toggler"
            onClick={() => {
              setIsToggle(!isToggle);
            }}
          />
        )}
      </div>
      <Collapse in={isToggle}>
        {fields.map((field, i) => {
          return (
            <FormRow
              key={i}
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={onChange}
            />
          );
        })}

        <button type="button" className="btn" onClick={onClick}>
          save
        </button>
      </Collapse>
    </div>
  );
};

export default InfoSection;
