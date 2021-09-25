import styled from "styled-components";

const SaveBtn = styled.input`
  text-align: center;
  background-color: rgb(255, 165, 0, 0.6);
  padding: 10px 20px;
  border-radius: 5px;
  opacity: ${props => props.disabled ? 0.6 : 1};
  transition: opacity 0.4s linear;
  cursor: pointer;
`

export default SaveBtn