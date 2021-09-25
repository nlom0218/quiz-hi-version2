import React from 'react';
import styled from 'styled-components';
import useUser from '../../hooks/useUser';
import LevelStep from '../LevelStep';
import LinkBtn from '../LinkBtn';
import HomeLayout from './HomeLayout';

const Box = styled.div`
  grid-row: 2 / 3;
  background-color: rgb(207, 255, 175, 0.2);
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1.5fr;
  
`

const LevelIcons = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-self: center;
  align-items: center;
  justify-items: center;
  padding: 0px 40px;
`

const Wrapper = styled.div`
  justify-self: center;
  align-self: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const MainMsg = styled.div`
  margin: 20px 0px;
  font-size: 24px;
`

const SubMsg = styled.div`
  font-size: 18px;
  margin-bottom: 50px;
`

const Level = () => {
  const user = useUser()
  return (<HomeLayout
    className="levelLayout"
    layout="levelLayout"
    title="Level"
    msg="Level up by earning points"
    left={false}
  >
    <Box>
      <LevelIcons>
        <LevelStep level={1} />
        <LevelStep level={2} />
        <LevelStep level={3} />
        <LevelStep level={4} />
        <LevelStep level={5} />
        <LevelStep level={6} />
        <LevelStep level={7} />
        <LevelStep level={8} />
        <LevelStep level={9} />
        <LevelStep level={10} />
      </LevelIcons>
      <Wrapper>
        <MainMsg>
          어떻게 하면 레벨을 올릴 수 있을까요?
        </MainMsg>
        <SubMsg>
          선생님들은 퀴즈를 만들고 공유를 할수록 학생들은 퀴즈를 풀고 점수를 많이 받을수록 레벨은 올라갑니다!
        </SubMsg>
        <LinkBtn route={`profile/${user?.username}/info`} text="나의 레벨 확인하기" />
      </Wrapper>
    </Box>
  </HomeLayout>);
}

export default Level;