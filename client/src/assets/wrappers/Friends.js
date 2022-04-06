import styled from "styled-components";

const Wrapper = styled.main`
  .addFriend {
    margin-top: 20px;
  }

  .friends {
    max-height: 300px;
    overflow: auto;
    padding: 10px;
    margin-bottom: 40px;
  }

  .delete {
    margin-right: 20px;
  }

  .delete:hover {
    color: var(--red-dark);
    cursor: pointer;
  }

  .subHeading {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .arrow {
    margin-left: 20px;
  }

  .infoContainer {
    display: flex;
    flex-direction: column;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  hr {
    color: white;
    border-top: transparent;
    width: 120px;
    margin-bottom: 20px;
  }
`;

export default Wrapper;
