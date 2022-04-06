import { Wrapper } from "../assets/wrappers/FormRowItems";

const FormRowItems = ({ name, onChange, items }) => {
  return (
    <Wrapper>
      <label className="form-label" htmlFor="item1">
        {name}
      </label>

      <div className="item-list">
        {items.map((item, index) => {
          return (
            <input
              className="form-input"
              type="text"
              autoComplete="off"
              onChange={onChange}
              value={item}
              id={index}
              key={index}
            ></input>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default FormRowItems;
