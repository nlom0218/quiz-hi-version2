import styled from "styled-components"

const EditInput = styled.input`
  align-self: flex-start;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
 }
 ::placeholder {
   color: ${props => props.theme.fontColor};
   opacity: 0.6;
 }
`

export default EditInput