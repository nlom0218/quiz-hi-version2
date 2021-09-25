import { faBan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import styled from 'styled-components';
import { logOutUser } from '../apollo';
import BasicContainer from '../components/BasicContainer';
import Header from '../components/Header';
import Title from '../components/Home/Title';
import LinkBtn from '../components/LinkBtn';
import useTitle from '../hooks/useTitle';
import useUser from '../hooks/useUser';

const Layout = styled.div`
  grid-column: 1 / -1;
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
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  align-items: center;
`

const Box = styled.div``

const LogoutBtn = styled.div`
  border: 1px solid ${props => props.theme.fontColor};
  width: 180px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  color: ${props => props.theme.fontColor};
  transition: background-color 0.5s linear, color  0.5s linear;
  :hover {
  background-color: ${props => props.theme.fontColor};   
  color: ${props => props.theme.bgColor};
  }
`

const NotFound = () => {
  const titleUpdataer = useTitle("QUIZ HI | Not Found")
  const user = useUser()
  return (<React.Fragment>
    <Header />
    <BasicContainer>
      <Layout>
        <Title
          title="Wrong Access"
          msg={`${!user ? "로그인이 필요한 페이지이거나 " : ""}요청한 페이지를 찾을 수 없습니다. ${user ? "로그인 상태에서는 로그인, 회원가입 페이지에 접근할 수 없습니다." : ""}`}
          left={true} />
        <Wrapper>
          <WrongMsg>
            <FontAwesomeIcon icon={faBan} />
          </WrongMsg>
          <Link>
            <Box>
              <LinkBtn route="" text="홈으로 돌아가기" />
            </Box>
            {!user ? <React.Fragment>
              <Box>
                <LinkBtn route="login" text="로그인하기" />
              </Box>
              <Box>
                <LinkBtn route="create-account" text="회원가입하기" />
              </Box>
            </React.Fragment>
              : <React.Fragment>
                <Box>
                  <LogoutBtn onClick={() => logOutUser()}>로그아웃하기</LogoutBtn>
                </Box>
              </React.Fragment>
            }
          </Link>
        </Wrapper>
      </Layout>
    </BasicContainer>
  </React.Fragment>);
}

export default NotFound;