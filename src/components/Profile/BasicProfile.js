import { faFacebook, faGithub, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faBlog, faHouseUser, faIcons, faInfoCircle, faPortrait, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { processNextLevelScore, processUserLevel, getCreatedDay } from '../../sharedFn';
import LevelStep from '../LevelStep';
import PopularQuizQuiestion from './PopularQuizQuiestion';
import { ContentNum, DetailInfoLayout, Title } from './sharedCss';
import StudentScoreList from './StudentScoreList';

const Container = styled.div`
  margin-top: 20px;
  display: grid;
  grid-template-columns: 1fr 2fr;
  column-gap: 20px;
  align-items: flex-start;
`

const RigthContents = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const LeftContents = styled.div`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 20px;
`

const BasicInfo = styled.div`
  align-self: flex-start;
  grid-column: 1 / -1;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
  grid-gap: 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const Wrapper = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  .input {
    font-weight: 600;
  }
  .value {
    justify-self: flex-end;
    text-align: end;
  }
`

const DetailInto = styled.div`
  align-self: flex-start;
  grid-column: 1 / -1;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 20px;
  align-items: flex-start;
`

const LevelContainer = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  margin-top: 20px;
`

const Level = styled.div`
  justify-self: center;
  align-self: center;
`

const LevelScore = styled.div`
  margin-left: 30px;
  justify-self: flex-start;
  align-self: center;
  .nextLevel {
    margin-top: 10px;
    color: tomato;
  }
`

const LevelRule = styled.div`
  align-self: center;
  padding: 10px 20px;
  background-color: rgb(255, 165, 0, 0.4);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color linear 0.5s;
  :hover {
    background-color: rgb(255, 165, 0, 0.8);
  }
`

const TagContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;
  margin-top: 20px;
`

const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`

const EmtpyMsg = styled.div`

`

const Tag = styled.div`
  margin-bottom: 5px;
  margin-right: 5px;
  padding: 3px 10px;
  background-color: rgb(201, 102, 255, 0.2);
  border-radius: 5px;
`

const RigthContentLayout = styled.div`
  align-self: flex-start;
  grid-column: 1 / 2;
  padding: 20px;
  border: 1px solid rgb(200, 200, 200, 0.6);
  background-color: ${props => props.theme.boxColor};
  transition: background-color 1s ease;
`

const PageList = styled.div`
  padding-top: 20px;
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  justify-items: center;
  svg {
    font-size: 24px;
  }
`

const UserCaption = styled.textarea`
  margin-top: 16px;
  line-height: 24px;
  width: 100%;
  height: ${props => props.txtHeight}px;
  resize: none;
  border: none;
  font-size: 16px;
  padding: 0px;
  background-color: ${props => props.theme.boxColor};
  color: ${props => props.theme.fontColor};
  transition: background-color 1s ease, color 1s ease;
  :focus {
    outline: none;
  }
`

const BasicProfile = ({ id, nickname, email, totalFollow, totalFollowing, type, totalPublicQuiz, totalPublicQuestion, score, createdAt, tags, personalPage, caption, quizScore }) => {
  const textarea = useRef()
  const [txtHeight, setTxtHeight] = useState(null)
  useEffect(() => {
    if (caption) {
      setTxtHeight(textarea.current.scrollHeight)
    }
  }, [])
  const personalPageArr = personalPage ?
    personalPage
      .split("!@#")
      .map((item) => {
        const division = item.split("^^")
        return {
          page: division[0],
          url: division[1]
        }
      })
    :
    []
  const level = processUserLevel(type, score)
  const processPageIcon = (page) => {
    if (page === "인스타그램") {
      return <FontAwesomeIcon icon={faInstagram} />
    } else if (page === "페이스북") {
      return <FontAwesomeIcon icon={faFacebook} />
    } else if (page === "유튜브") {
      return <FontAwesomeIcon icon={faYoutube} />
    } else if (page === "깃허브") {
      return <FontAwesomeIcon icon={faGithub} />
    } else if (page === "트위터") {
      return <FontAwesomeIcon icon={faTwitter} />
    } else if (page === "블로그") {
      return <FontAwesomeIcon icon={faBlog} />
    } else if (page === "기타") {
      return <FontAwesomeIcon icon={faIcons} />
    }
  }
  return (<Container>
    <RigthContents>
      <BasicInfo>
        <Title><div><FontAwesomeIcon icon={faInfoCircle} /> 기본정보</div></Title>
        <Wrapper>
          <div className="input">닉네임</div>
          <div className="value">{nickname.length > 10 ? `${nickname.substring(0, 10)}...` : nickname}</div>
        </Wrapper>
        {type === "teacher" &&
          <Wrapper>
            <div className="input">이메일</div>
            <div className="value">{email.length > 20 ? `${email.substring(0, 20)}...` : email}</div>
          </Wrapper>}
        <Wrapper>
          <div className="input">가입일</div>
          <div className="value">{getCreatedDay(createdAt)}</div>
        </Wrapper>
        <Wrapper>
          <div className="input">팔로워</div>
          <div className="value">{totalFollow}</div>
        </Wrapper>
        <Wrapper>
          <div className="input">팔로잉</div>
          <div className="value">{totalFollowing}</div>
        </Wrapper>
        {type === "teacher" && <React.Fragment>
          <Wrapper>
            <div className="input">공유한 퀴즈</div>
            <div className="value">{totalPublicQuiz}</div>
          </Wrapper>
          <Wrapper>
            <div className="input">공유한 문제</div>
            <div className="value">{totalPublicQuestion}</div>
          </Wrapper>
        </React.Fragment>}
      </BasicInfo>
      {caption && <RigthContentLayout>
        <Title><div><FontAwesomeIcon icon={faPortrait} /> 자기소개</div></Title>
        <UserCaption
          value={caption}
          readOnly="readOnly"
          rows={1}
          txtHeight={txtHeight}
          ref={textarea}
        ></UserCaption>
      </RigthContentLayout>}
      {personalPage && <RigthContentLayout>
        <Title><div><FontAwesomeIcon icon={faHouseUser} /> 개인 홈페이지</div></Title>
        <PageList>
          {personalPageArr.map((item, index) => {
            return <a href={`${item.url}`} target="_blank" key={index}>
              {processPageIcon(item.page)}
            </a>
          })}
        </PageList>
      </RigthContentLayout>}
    </RigthContents>
    <LeftContents>
      <DetailInto>
        <DetailInfoLayout>
          <Title>Lv 레벨</Title>
          <LevelContainer>
            <Level>
              <LevelStep level={level} />
            </Level>
            <LevelScore>
              <div>현재 점수: {score}점</div>
              <div className="nextLevel">
                {level === 10 ? "최고레벨입니다." : `다음 레벨까지 ${processNextLevelScore(type, level, score)}점 남았습니다.`}
              </div>
            </LevelScore>
            <LevelRule>
              레벨에 대해 알아보기
          </LevelRule>
          </LevelContainer>
        </DetailInfoLayout>
        {type === "teacher" && <DetailInfoLayout>
          <Title>
            <div><FontAwesomeIcon icon={faTags} /> 팔로우 태그</div>
            <ContentNum>{tags.length}개의 팔로우 태그</ContentNum>
          </Title>
          <TagContainer>
            {tags.length !== 0 ? <TagList>
              {tags.map((item, index) => {
                return <React.Fragment key={index}>
                  <Link to={`/detail/tag/${item.id}/quiz/recent/1`}><Tag>{item.name}</Tag></Link>
                </React.Fragment>
              })}
            </TagList>
              :
              <EmtpyMsg>팔로우 태그가 없습니다.</EmtpyMsg>}
          </TagContainer>
        </DetailInfoLayout>}
        {type === "teacher" && <PopularQuizQuiestion userId={id} totalPublicQuiz={totalPublicQuiz} totalPublicQuestion={totalPublicQuestion} />}
        {type === "student" && <StudentScoreList quizScore={quizScore} />}
      </DetailInto>
    </LeftContents>

  </Container>);
}

export default BasicProfile;