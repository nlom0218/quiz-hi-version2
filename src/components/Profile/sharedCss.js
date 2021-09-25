import styled from "styled-components";

export const DetailInfoLayout = styled.div`
  padding: 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

export const Title = styled.div`
padding-bottom: 20px;
border-bottom: 1px solid rgb(200, 200, 200, 0.6);
font-weight: 600;
display: flex;
justify-content: space-between;
`

export const ContentNum = styled.div`
font-weight: 400;
`