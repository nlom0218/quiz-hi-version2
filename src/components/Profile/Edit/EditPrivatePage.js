import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faBlog, faCheck, faChevronDown, faChevronUp, faIcons, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import EditInput from './EditInput';
import EditProfileBox from './EditProfileBox';
import { fadeIn } from '../../../animation/fade';
import { faFacebook, faGithub, faInstagram, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import SaveBtn from './SaveBtn';
import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';
import { useParams } from 'react-router';

const EditPageForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
  .EditBtn {
    padding: 10px 20px;
    border-radius: 5px;
    background-color: rgb(200, 200, 200, 0.2);
    cursor: pointer;
    transition: background-color 0.2s linear;
    svg {
      margin-left: 10px;
    }
    :hover {
      background-color: rgb(200, 200, 200, 0.4);
    }
  }
`

const AdviceMsg = styled.div`
  grid-column: 1 / -1;
`

const EditPageItem = styled.div`
  display: grid;
  grid-template-columns: 30px 1fr;
  column-gap: 20px;
  align-items: center;
`

const PageType = styled.div`
   justify-self: center;
   svg {
     font-size: 24px;
   }
`

const SaveMsg = styled.div`
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`


const EDIT_PERSONAL_PAGE_MUTATION = gql`
  mutation editPersonalPage($username: String!, $pageString: String!) {
    editPersonalPage(username: $username, pageString: $pageString) {
      ok
      error
    }
  }
`

const EditPrivatePage = ({ personalPage, id }) => {
  const { username } = useParams()
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
  const [saveMsg, setSaveMsg] = useState(undefined)
  const [newPersonalPage, seteNewPersonalPage] = useState(null)
  const update = (cache, result) => {
    const { data: { editPersonalPage: { ok } } } = result
    if (ok) {
      const UserId = `User:${id}`
      cache.modify({
        id: UserId,
        fields: {
          personalPage() { return newPersonalPage },
        }
      })
      setSaveMsg("개인 홈페이지가 수정 되었습니다.")
    }
  }
  const [editPersonalPage, { loading }] = useMutation(EDIT_PERSONAL_PAGE_MUTATION, {
    update
  })
  const findUrl = (page) => {
    return personalPageArr.findIndex((item) => item.page === page)
  }
  const { register, handleSubmit, formState: { isValid }, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      ...(findUrl("인스타그램") !== -1 && { 인스타그램: personalPageArr[findUrl("인스타그램")].url }),
      ...(findUrl("페이스북") !== -1 && { 페이스북: personalPageArr[findUrl("페이스북")].url }),
      ...(findUrl("유튜브") !== -1 && { 유튜브: personalPageArr[findUrl("유튜브")].url }),
      ...(findUrl("깃허브") !== -1 && { 깃허브: personalPageArr[findUrl("깃허브")].url }),
      ...(findUrl("트위터") !== -1 && { 트위터: personalPageArr[findUrl("트위터")].url }),
      ...(findUrl("블로그") !== -1 && { 블로그: personalPageArr[findUrl("블로그")].url }),
      ...(findUrl("기타") !== -1 && { 기타: personalPageArr[findUrl("기타")].url }),
    }
  })
  const onSubmit = (data) => {
    if (loading) {
      return
    }
    const pageArr = []
    if (data.인스타그램 !== "") {
      if (!data.인스타그램.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "인스타그램", url: data.인스타그램 })
    }
    if (data.페이스북 !== "") {
      if (!data.페이스북.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "페이스북", url: data.페이스북 })
    }
    if (data.유튜브 !== "") {
      if (!data.유튜브.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "유튜브", url: data.유튜브 })
    }
    if (data.깃허브 !== "") {
      if (!data.깃허브.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "깃허브", url: data.깃허브 })
    }
    if (data.트위터 !== "") {
      if (!data.트위터.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "트위터", url: data.트위터 })
    }
    if (data.블로그 !== "") {
      if (!data.블로그.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "블로그", url: data.블로그 })
    }
    if (data.기타 !== "") {
      if (!data.기타.startsWith("https://")) {
        setSaveMsg("https:// 또는 http:// 가 포함된 주소를 입력해주세요")
        return
      }
      pageArr.push({ page: "기타", url: data.기타 })
    }
    const newPageString = pageArr.map((item) => `${item.page}^^${item.url}`).join("!@#");
    if (newPageString === "") {
      seteNewPersonalPage(null)
    } else {
      seteNewPersonalPage(newPageString)
    }
    editPersonalPage({
      variables: {
        username,
        pageString: newPageString
      }
    })
  }
  return (<EditProfileBox>
    <EditPageForm onSubmit={handleSubmit(onSubmit)}>
      {/* <AdviceMsg>https:// 또는 http:// 가 포함된 주소를 입력해 주세요. </AdviceMsg> */}
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faInstagram} /></PageType>
        <EditInput
          {...register("인스타그램")}
          placeholder="인스타그램 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faFacebook} /></PageType>
        <EditInput
          {...register("페이스북")}
          placeholder="페이스북 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faYoutube} /></PageType>
        <EditInput
          {...register("유튜브")}
          placeholder="유튜브 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faGithub} /></PageType>
        <EditInput
          {...register("깃허브")}
          placeholder="깃허브 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faTwitter} /></PageType>
        <EditInput
          {...register("트위터")}
          placeholder="트위터 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faBlog} /></PageType>
        <EditInput
          {...register("블로그")}
          placeholder="블로그 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      <EditPageItem>
        <PageType><FontAwesomeIcon icon={faIcons} /></PageType>
        <EditInput
          {...register("기타")}
          placeholder="기타 홈페이지 주소를 입력해 주세요."
          autoComplete="off"
        />
      </EditPageItem>
      {saveMsg && <SaveMsg>{saveMsg}</SaveMsg>}
      <SaveBtn type="submit" value={loading ? "저장중..." : "저장하기"} disabled={!isValid} />
    </EditPageForm>
  </EditProfileBox>);
}

export default EditPrivatePage;