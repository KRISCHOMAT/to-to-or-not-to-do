const FormRow = ({ type, name, onChange, value, id }) => {
  return (
    <div>
      <label className="form-label" htmlFor={name}>
        {name}
      </label>
      <input
        type={type}
        className="form-input"
        name={name}
        autoComplete="off"
        onChange={onChange}
        value={value}
        id={id}
      ></input>
    </div>
  );
};

export default FormRow;
