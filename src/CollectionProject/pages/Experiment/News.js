import React from 'react';
import styled from 'styled-components';
import { customMedia } from '../../../styles';

const Container = styled.div`
 display: grid;
 row-gap: 30px;
 row-gap: 1.875rem;
 ${customMedia.greaterThan("tablet")`
    align-self: center;
    grid-template-columns: 1fr 1fr;
    `}
   ${customMedia.greaterThan("desktop")`
    align-self: flex-end;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
  `}
`

const SNews = styled.div`
  padding: 0px 20px;
  padding: 0px 1.25rem;
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 1fr;
  ${customMedia.greaterThan("tablet")`
    grid-template-columns: 1fr;
    `}
   ${customMedia.greaterThan("desktop")`
    grid-template-columns: 1fr;
  `}
`

const Image = styled.div`
  height: 200px;
  height: 12.5rem;
  background: url("http://ojsfile.ohmynews.com/STD_IMG_FILE/2021/1109/IE002894242_STD.JPG");
  background-size: cover;
  background-position: center;
  border: 5px;
  border-radius: 0.3125rem;
  ${customMedia.greaterThan("tablet")`
    height: 300px;
    height: 18.75rem;
  `}
  ${customMedia.greaterThan("desktop")`
    height: 150px;
    height: 9.375rem;
  `}
`

const News = () => {
  const onMouseEnter = () => { }
  return (<Container>
    <SNews>
      <Image onMouseEnter={onMouseEnter} />
    </SNews>
    <SNews>
      <Image />
    </SNews>
    <SNews>
      <Image />
    </SNews>
    <SNews>
      <Image />
    </SNews>
    <SNews>
      <Image />
    </SNews>
    <SNews>
      <Image />
    </SNews>
  </Container>);
}

export default News;