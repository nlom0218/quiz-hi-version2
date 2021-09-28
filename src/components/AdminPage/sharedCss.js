import styled from "styled-components"

export const SetTypeBtn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 60px;
`

export const Type = styled.div`
  text-align: center;
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  opacity: ${props => props.selected ? 1 : 0.6};
  padding: 10px;
  border-radius: 5px;
  transition: opacity 0.6s ease, color 1s ease, background-color 1s ease;
  cursor: pointer;
`