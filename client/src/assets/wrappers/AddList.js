import styled from "styled-components";

export const Wrapper = styled.main`
  .buttonContainer {
    display: flex;
    flex-direction: column;
  }

  .setItems {
    display: flex;
    align-self: center;
    align-items: center;
    justify-content: center;
  }
  .margin {
    margin: 8px;
  }
  .friends {
    max-height: 300px;
    overflow: auto;
    padding: 10px;
    
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

  .check {
    cursor: pointer;
  }
`;
