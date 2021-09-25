import styled from "styled-components"
import { fadeIn } from "../../animation/fade"

export const PageTitle = styled.div`
font-size: 18px;
font-weight: 600;
svg {
  margin-right: 10px;
}
.navBtn {
  display: flex;
}
display: flex;
justify-content: space-between;
align-items: flex-end;
.delBtn {
  font-size: 16px;
  color: tomato;
  border: 1px solid tomato;
  padding: 5px 10px;
  :hover {
    color: #f4f4f4;
    background-color: tomato;
  }
}
`
export const PrePage = styled.div`
margin-right: 20px;
font-size: 16px;
border: 1px solid ${props => props.theme.fontColor};
padding: 5px 10px;
cursor: pointer;
font-weight: 400;
transition: background-color 0.3s linear, color 0.6s linear;
:hover {
  color: ${props => props.theme.bgColor};
  background-color: ${props => props.theme.fontColor};
}
`

export const EidtMsg = styled.div`
  justify-self: center;
  color: tomato;
  animation: ${fadeIn} 0.4s linear;
`

export const InputTitle = styled.div`
  font-weight: 600;
`