import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
 display: grid;
 overflow: scroll;
`

const SNews = styled.div`
  /* padding: 20px; */
  /* background: url("http://ojsfile.ohmynews.com/STD_IMG_FILE/2021/1109/IE002894242_STD.JPG"); */
  width: 100%;
  height: 160px;
  background-size: cover;
  background-position: center;
`

const Image = styled.img``

const News = () => {
  return (<Container>
    <SNews>
      <Image src="http://ojsfile.ohmynews.com/STD_IMG_FILE/2021/1109/IE002894242_STD.JPG" />
    </SNews>
  </Container>);
}

export default News;