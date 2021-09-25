import { useMutation } from '@apollo/client';
import { faImage, faTrashAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../../animation/fade';
import EditInput from './EditInput';
import EditProfileBox from './EditProfileBox';
import SaveBtn from './SaveBtn';

const EditForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 40px;
`

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const EditTextArea = styled.textarea`
  width: 100%;
  resize: none;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  padding: 10px 20px;
  color: ${props => props.theme.fontColor};
  background-color: rgb(200, 200, 200, 0.2);
  transition: box-shadow 0.4s linear, color 1s ease;
  :focus {
    box-shadow: 0 0 1px 0.5px ${props => props.theme.fontColor};
    outline: none;
  }
`

const ProfileImage = styled.div`
  display: grid;
  grid-template-columns: 2.5fr 1fr;
  grid-template-rows: auto auto;
  row-gap: 10px;
`

const PreviewImage = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  justify-self: center;
  align-self: center;
  div {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    background-color: rgb(200, 200, 200, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  svg {
    font-size: 50px;
  }
`

const UserAvatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: fill;
`

const BtnControll = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 20px;
  label, div {
    align-self: flex-start;
    text-align: center;
    padding: 10px 0px;
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

const ImageLabel = styled.label`
`

const DelImgBtn = styled.div`
`

const SaveMsg = styled.div`
  justify-self: center;
  color: tomato;
  font-weight: 600;
  animation: ${fadeIn} 0.4s linear;
`

const EDIT_PROFILE_MUTATION = gql`
  mutation EditProfileMutation($username: String!, $nickname: String!, $caption: String, $delImg: Boolean!, $avatarURL: Upload) {
    editProfile(
      username: $username, 
      nickname: $nickname, 
      caption: $caption, 
      delImg: $delImg, 
      avatarURL: $avatarURL)
      {
      ok
      error
    }
  }
`

const EditBasicInfo = ({ nickname, caption, avatarURL, id }) => {
  const { username } = useParams()
  const [newAvatarURL, setNewAvatarURL] = useState(undefined)
  const [previewImg, setPreviewImg] = useState(avatarURL)
  const [delImg, setDelImg] = useState(false)
  const [saveMsg, setSaveMsg] = useState(undefined)
  const { register, handleSubmit, formState: { isValid }, getValues } = useForm({
    mode: "onChange",
    defaultValues: {
      nickname,
      caption
    }
  })
  const update = (cache, result) => {
    const { data: { editProfile: { ok } } } = result
    if (ok) {
      const UserId = `User:${id}`
      cache.modify({
        id: UserId,
        fields: {
          nickname() { return getValues("nickname") },
          caption() { return getValues("caption") },
          avatarURL() { return previewImg }
        }
      })
      setSaveMsg("기본정보가 수정 되었습니다.")
    }
  }
  const [editProfile, { loading }] = useMutation(EDIT_PROFILE_MUTATION, {
    update
  })
  const onChangeImage = ({ target: { files } }) => {
    if (files.length) {
      const file = files[0]
      if (delImg) {
        setDelImg(false)
      }
      setNewAvatarURL(file)
      let reader = new FileReader();
      reader.onload = function (e) { setPreviewImg(e.target.result); }
      reader.readAsDataURL(file);
    }
  }
  const onClickRemoveImage = () => {
    setPreviewImg(undefined)
    setDelImg(true)
    setNewAvatarURL(undefined)
  }
  const onSubmit = (data) => {
    const { nickname, caption } = data
    if (loading) {
      return
    }
    editProfile({
      variables: {
        username,
        nickname,
        ...(caption !== "" && { caption }),
        delImg,
        ...(newAvatarURL && { avatarURL: newAvatarURL })
      }
    })
  }
  return (<EditProfileBox>
    <EditForm onSubmit={handleSubmit(onSubmit)}>
      <Wrapper>
        <div>닉네임</div>
        <EditInput
          {...register("nickname", { required: true })}
          type="text"
          autoComplete="off"
        />
      </Wrapper>
      <Wrapper>
        <div>자기소개</div>
        <EditTextArea
          cols={20}
          rows={3}
          {...register("caption")}>
        </EditTextArea>
      </Wrapper>
      <ProfileImage>
        <div>프로필 이미지</div>
        <PreviewImage>
          {previewImg ?
            <UserAvatar src={previewImg} />
            : <div><FontAwesomeIcon icon={faUser} /></div>}
        </PreviewImage>
        <BtnControll>
          <ImageLabel htmlFor="userAvatar">
            이미지 선택하기<FontAwesomeIcon icon={faImage} />
          </ImageLabel>
          <DelImgBtn onClick={onClickRemoveImage}>
            이미지 삭제하기<FontAwesomeIcon icon={faTrashAlt} />
          </DelImgBtn>
        </BtnControll>
        <EditInput
          type="file"
          id="userAvatar"
          style={{ display: "none" }}
          accept="image/jpeg, image/jpg, image/png"
          onChange={onChangeImage}
        />
      </ProfileImage>
      {saveMsg && <SaveMsg>{saveMsg}</SaveMsg>}
      <SaveBtn type="submit" value={loading ? "저장중..." : "저장하기"} disabled={!isValid} />
    </EditForm>
  </EditProfileBox>);
}

export default EditBasicInfo;