import styled from "styled-components";

const Wrapper = styled.main`
  .register {
    position: relative;
    left: 50px;
    bottom: 50px;
    float: right;
  }
  .box {
    background-color: var(--primary-700);
    width: 70px;
    height: 90px;
    border: 1px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    border-radius: var(--borderRadius);
    transition: 1s;
  }
  .box:hover {
    background-color: var(--primary-500);
  }
  p {
    display: block;
    color: white;
    margin: 0;
  }
`;

export default Wrapper;
