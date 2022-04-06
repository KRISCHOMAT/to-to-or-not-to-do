import styled from "styled-components";

const Wrapper = styled.main`
  text-align: center;
  .listContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
  }
  .arrow {
    cursor: pointer;
    color: white;
    margin-left: 15px;
  }
  .heading {
    padding-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .subHeading {
    cursor: pointer;
  }
`;

export default Wrapper;
