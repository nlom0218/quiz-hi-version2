import styled from "styled-components";

export const FollowTitle = styled.div`
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  align-items: center;
`

export const FollowList = styled.div`
  background-color: rgb(200, 200, 200, 0.8);
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1px;
  border: 1px solid rgb(200, 200, 200, 0.8);
  box-shadow: ${props => props.theme.boxShadow};
`

export const NoUserMsg = styled.div`
  color: tomato;
`