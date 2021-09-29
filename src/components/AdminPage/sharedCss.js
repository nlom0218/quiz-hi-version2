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

export const TotalNum = styled.div``

export const PageBar = styled.div`
  justify-self: flex-end;
  align-self: flex-end;
  border: 1px solid rgb(200, 200, 200, 0.6);
  background-color: ${props => props.theme.bgColor};
  border-radius: 5px;
  display: flex;
  position: relative;
  transition: background-color 1s ease;
`

export const PageBarBtn = styled.div`
  padding: 8px 20px;
  transition: background-color 0.2s linear;
  :hover {
    background-color: rgb(200, 200, 200, 0.2);
  }
  :first-child {
    border-right: 1px solid rgb(200, 200, 200, 0.6);
    opacity: ${props => props.firstPage ? "0.4" : "1"};
    cursor: ${props => props.firstPage ? "not-allowd" : "pointer"};
  }
  :nth-child(2) {
    opacity: ${props => props.lastPage ? "0.4" : "1"};
    cursor: ${props => props.lastPage ? "not-allowd" : "pointer"};
  }
`

export const QuizQuestionList = styled.ul`
display: grid;
grid-template-columns: 1fr;
background-color: rgb(200, 200, 200, 0.8);
row-gap: 1px;
border: 1px solid rgb(200, 200, 200, 0.8);
.detail_content {
    justify-self: center;
  }
.sortItem {
  padding: 15px 20px;
  background-color: ${props => props.theme.blueColor};
  color: ${props => props.theme.bgColor};
  transition: background-color 1s ease, color 1s ease;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 4fr 1fr;
  column-gap: 10px;
  div {
    font-weight: 600;
  }
}
`

export const ContentItem = styled.div`
  padding: 17px 20px;
  line-height: 160%;
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
  display: grid;
  grid-template-columns: 1fr 1.5fr 1.5fr 4fr 1fr;
  column-gap: 10px;
  :hover {
    background-color: ${props => props.theme.grayColor};
  }
`