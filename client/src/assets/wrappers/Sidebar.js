import styled from "styled-components";

export const Wrapper = styled.aside`
  .sidebarContainer {
    display: none;
  }
  @media (min-width: 600px) {
    .sticky {
      position: sticky;
      top: 110px;
      z-index: 99;
    }
    .sidebarContainer {
      overflow: auto;
      box-shadow: var(--shadow-4);
      display: flex;
      flex-direction: column;
      align-items: center;
      width: 240px;
      height: calc(100vh - 110px);
      background: var(--primary-600);
    }

    .open {
      margin: 10px;
      background: transparent;
      border: 0;
      margin-right: 10px;
      cursor: pointer;
      align-self: flex-start;
    }

    .close {
      margin: 10px;
      background: transparent;
      border: 0;
      margin-right: 10px;
      cursor: pointer;
      align-self: flex-end;
    }

    .menue {
      display: flex;
      flex-direction: column;
      margin-top: 40px;
    }

    .icon {
      margin-right: 9px;
    }

    .link {
      color: grey;
      margin: 10px;
      display: flex;
      align-items: center;
      transition: 1s;
    }

    .active,
    .link:hover {
      color: white;
    }
  }
`;
