import styled from "styled-components";

const Wrapper = styled.div`
  font-size: 1.3rem;
  display: flex;
  position: relative;
  flex-direction: column;
  border: 1px solid white;
  border-radius: var(--borderRadius);
  margin: 15px 15px 25px 5px;
  padding: 20px 20px 0px 20px;
  background: var(--primary-400);
  box-shadow: var(--shadow-4);
  width: 300px;


  .heading {
    padding-bottom: 12px;
    border-bottom: 2px solid white;
    display: flex;
    align-items: center;
    justify-content: center;
    
  }

  .arrow {
    position: absolute;
    right: 20px;
    cursor: pointer;
    color:white;
  }

  .arrow:hover{
    color: var(--primary-900);:
  }

   .delete {
    cursor: pointer;
    color: var(--primary-900);
  }

  .delete:hover {
    color: var(--red-dark);
  }

  .itemRow{
    display: flex;
    align-items: center;
    justify-content: space-between;
    text-align: left;


  }
  .check{
    cursor:pointer;
    flex: 0 0 auto;
  
  }
   .checked{
    cursor:pointer;
    flex: 0 0 auto;
    color: black;
  }
  .edit{
    color:white;
    cursor:pointer;
  }
  .edit:hover{
    color: var(--primary-900);
  }
`;

export default Wrapper;
