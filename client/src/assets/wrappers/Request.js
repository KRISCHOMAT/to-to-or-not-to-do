import styled from "styled-components";

const Wrapper = styled.main`
  .request {
    display: flex;
    justify-content: space-between;
  }

  .accept {
    margin-right: 10px;
    margin-left: 20px;
  }

  .accept:hover {
    color: black;
    cursor: pointer;
  }
  .deny {
  }

  .deny:hover {
    color: var(--red-dark);
    cursor: pointer;
  }
`;

export default Wrapper;
