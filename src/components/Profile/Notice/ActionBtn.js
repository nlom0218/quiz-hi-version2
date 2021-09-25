import styled from "styled-components";

export const ActionBtn = styled.div`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  div {
    text-align: center;
    color: #efefef;
    font-weight: 600;
    padding: 3px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 1s ease, color 1s ease;
    :nth-child(1) {
      background-color: ${props => props.theme.blueColor};
      color: ${props => props.theme.boxColor};
    }
    :nth-child(2) {
      background-color: tomato;
    }
  }
`