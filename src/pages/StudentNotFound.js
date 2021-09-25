import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { logOutUser } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Title from '../components/Home/Title';
import LinkBtn from '../components/LinkBtn';
import StudentHeader from '../components/StudentHeader';
import useTitle from '../hooks/useTitle';
import useUser from '../hooks/useUser';

const Layout = styled.div`
  grid-column: 2 / -2;
  margin-top: 60px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 400px;
`

const Wrapper = styled.div`
  background-color: rgb(146, 248, 185, 0.2);
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  justify-items: center;
  align-content: center;
  box-shadow: 0px 17px 6px -14px rgba(0,0,0,0.2);
  padding: 0px 40px;
`

const WrongMsg = styled.div`
  color: rgb(255, 99, 80);
  svg {
    font-size: 180px;
  }
`

const Link = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
`

const Box = styled.div``


const StudentNotFound = () => {
  const titleUpdataer = useTitle("QUIZ HI | Not Found")
  const user = useUser()
  return (<React.Fragment>
    <StudentHeader />
    <BasicContainer>
      <Layout>
        <Title
          title="Wrong Access"
          msg="요청한 페이지를 찾을 수 없거나 요청한 페이지에 접근이 불가능 합니다."
          left={true} />
        <Wrapper>
          <WrongMsg>
            <FontAwesomeIcon icon={faBan} />
          </WrongMsg>
          <Link>
            <Box>
              <LinkBtn route={`profile/${user.username}/info`} text="돌아가기" />
            </Box>
          </Link>
        </Wrapper>
      </Layout>
    </BasicContainer>
  </React.Fragment>);
}

export default StudentNotFound;