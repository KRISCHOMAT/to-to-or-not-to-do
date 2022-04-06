import styled from "styled-components";

export const Wrapper = styled.nav`
  position: sticky;
  top: 0;
  height: 110px;
  padding-left: 20px;
  padding-right: 50px;
  background: var(--primary-600);
  display: flex;
  width: 100vw;
  align-items: center;
  justify-content: space-between;
  box-shadow: var(--shadow-4);
  z-index: 99;

  .buttonContainer {
    display: flex;
    flex-direction: column;
    position: relative;
  }

  .logout {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    background: var(--primary-100);
    box-shadow: var(--shadow-2);
    padding: 0.5rem;
    text-align: center;
    visibility: hidden;
    border-radius: var(--borderRadius);
  }

  .showLogout {
    visibility: visible;
  }

  .userName {
    margin-right: 4px;
    margin-left: 8px;
  }
  .userButton {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .burger {
    display: block;
    color: black;
  }

  .notification {
    color: var(--red-dark);
  }
  .burgerContainer {
    cursor: pointer;
    display: flex;
  }

  @media (min-width: 600px) {
    .burgerContainer {
      display: none;
    }
  }
`;
