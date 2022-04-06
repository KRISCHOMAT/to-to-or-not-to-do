import styled from "styled-components";

const Wrapper = styled.main`
  contain: paint;
  .main {
    display: flex;
    flex-direction: column;
  }
  @media (min-width: 600px) {
    .main {
      flex-direction: row;
    }
  }
  .pages {
    width: 100vw;
    margin-left: auto;
    margin-right: auto;
    overflow: auto;
    height: calc(100vh - 110px);
    display: flex;
    justify-content: center;
  }
  .mainHeading {
    margin-top: 20px;
  }
`;

export default Wrapper;
