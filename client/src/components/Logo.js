import Wrapper from "../assets/wrappers/Logo";

const Logo = ({ register }) => {
  return (
    <Wrapper>
      <div className={register ? "box register" : "box"}>
        <div>
          <p>ToDo</p>
          <p>OrNot</p>
          <p>ToDo</p>
        </div>
      </div>
    </Wrapper>
  );
};

export default Logo;
