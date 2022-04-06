import styled from "styled-components";

export const Wrapper = styled.div`
  @media (min-width: 600px) {
    display: none;
  }
  position: absolute;
  z-index: 99;
  /*  backdrop-filter: blur(5px); */
  .mobileMenue {
    /* opacity: 0.8; */
    height: calc(100vh - 110px);
    padding: 100px;
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: var(--primary-600);
  }

  .linkContainer {
    display: flex;
    flex-direction: column;
    align-items: left;
  }

  .icon {
    margin-right: 9px;
  }

  .link {
    color: grey;
    margin: 10px;
    display: flex;
    align-items: center;
  }

  .active,
  .link:hover {
    color: white;
  }

  @media (min-width: 600px) {
    .menueContainer {
      display: none;
    }
  }
`;
