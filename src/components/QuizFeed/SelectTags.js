import { faFolderOpen } from '@fortawesome/free-regular-svg-icons';
import { faMinusCircle, faPlus, faPlusCircle, faTag, faTags } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useHistory, useLocation, useParams } from 'react-router';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import useUser from '../../hooks/useUser';

const Container = styled.div`
  grid-column: 1 / -1;
  animation: ${fadeIn} 0.4s linear;
  display: grid;
  grid-template-columns: 4fr 1fr;
  grid-template-rows: auto auto;
  gap: 30px;
`

const SelectedTags = styled.div`
  grid-column: 1 / 2;
  grid-row: 1 / 2;
  display: grid;
  grid-template-columns: auto auto 1fr;
  column-gap: 10px;
  align-items: flex-start;
  .registerMsg {
    align-self: center;
    color: tomato;
    font-size: 14px;
  }
`

const SelectedTagsList = styled.ul`
  align-self: center;
  display: flex;
  flex-wrap: wrap;
  font-size: 14px;
`

const SelectedTagsItem = styled.li`
  align-self: flex-start;
  margin-right: 10px;
  background-color: rgb(201, 102, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  animation: ${fadeIn} 0.3s linear;
  svg {
    margin-left: 5px;
    cursor: pointer;
  }
`

const RegisterTag = styled.div`
  grid-column: 2 / 3;
  grid-row: 1 / -1;
  align-self: flex-start;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 10px;
`

const RegisterTitle = styled.div`
  justify-self: flex-end;
  svg {
    margin-left: 5px;
  }
`

const RegisterBox = styled.div`
  background-color: rgb(200, 200, 200, 0.2);
  border-radius: 5px;
  display: grid;
  grid-template-columns: 1fr auto;
  column-gap: 10px;
  padding: 10px 20px;
  svg {
    cursor: pointer;
  }
  form, input{
    width: 130px;
  }
  input {
  ::placeholder {
    transition: color 1s ease, background-color 1s ease;
    color: ${props => props.theme.fontColor};
    opacity: 0.8;
    }
  }
`

const FollowTags = styled.div`
  grid-column: 1 / 2;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto auto;
`

const FollowTagTitle = styled.div`
  display: flex;
  svg {
    margin-right: 10px;
  }
`

const FollowTagsMsg = styled.div`
  margin-left: 10px;
  font-size: 14px;
  color: tomato;
  align-self: flex-end;
`

const FollowTagBox = styled.div`
  margin-top: 5px;
  padding: 5px 20px 0px 20px;
  border-radius: 5px;
  display: flex;
  flex-wrap: wrap;
`

const FollowTagItem = styled.div`
  font-size: 14px;
  margin-right: 10px;
  background-color: rgb(201, 102, 255, 0.2);
  padding: 5px 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  animation: ${fadeIn} 0.3s linear;
  svg {
    cursor: pointer;
  }
`

const SelectTags = ({ setTagsArr, tagsArr, refetch }) => {
  const { type, seeType, sort, page } = useParams()
  const location = useLocation()
  const history = useHistory()
  const { register, handleSubmit, getValues, setValue } = useForm()
  const user = useUser()
  const onSubmit = () => {
    const tag = getValues("tag")
    if (tagsArr.includes(tag)) {
      setValue("tag", "")
      return
    }
    const newTagsArr = [...tagsArr, tag]
    localStorage.setItem("searchTag", JSON.stringify(newTagsArr))
    setTagsArr(newTagsArr)
    if (location.search === "") {
      history.push(`/feed/${type}/${seeType}/${sort}/1`)
    } else {
      history.push(`/feed/${type}/${seeType}/${sort}/1${location.search}`)
    }
    setValue("tag", "")
  }
  const onClickDelTag = (tag) => {
    const newTagsArr = tagsArr.filter((item) => item !== tag)
    localStorage.setItem("searchTag", JSON.stringify(newTagsArr))
    setTagsArr(newTagsArr)
    if (location.search === "") {
      history.push(`/feed/${type}/${seeType}/${sort}/1`)
    } else {
      history.push(`/feed/${type}/${seeType}/${sort}/1${location.search}`)
    }
  }
  const checkTag = (tag) => {
    if (tagsArr.includes(tag)) {
      return true
    } else {
      return false
    }
  }
  const onClickAddTag = (tag) => {
    const newTagsArr = [...tagsArr, tag]
    localStorage.setItem("searchTag", JSON.stringify(newTagsArr))
    setTagsArr(newTagsArr)
    if (location.search === "") {
      history.push(`/feed/${type}/${seeType}/${sort}/1`)
    } else {
      history.push(`/feed/${type}/${seeType}/${sort}/1${location.search}`)
    }
  }
  return (<Container>
    <SelectedTags>
      <FontAwesomeIcon icon={faTags} />
      <div>등록된 태그</div>
      {tagsArr.length === 0 ? <div className="registerMsg">태그를 등록해 주세요.</div> :
        <SelectedTagsList>
          {tagsArr.map((item, index) => {
            return <SelectedTagsItem key={index}>
              {item}
              <FontAwesomeIcon icon={faMinusCircle} onClick={() => onClickDelTag(item)} />
            </SelectedTagsItem>
          })}
        </SelectedTagsList>
      }
    </SelectedTags>
    <RegisterTag>
      <RegisterTitle>태그 등록하기<FontAwesomeIcon icon={faTag} /></RegisterTitle>
      <RegisterBox>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            {...register("tag")}
            type="text"
            autoComplete="off"
            placeholder="태그 입력"
          />
        </form>
        <FontAwesomeIcon icon={faPlus} onClick={handleSubmit(onSubmit)} />
      </RegisterBox>
    </RegisterTag>
    {user && <FollowTags>
      <FollowTagTitle>
        <FontAwesomeIcon icon={faFolderOpen} />
        팔로우 태그
        {user.tags.length === 0 && <FollowTagsMsg>팔로우한 태그가 없습니다.</FollowTagsMsg>}
      </FollowTagTitle>
      <FollowTagBox>
        {user.tags.map((item, index) => {
          if (checkTag(item.name) === true) {
            return
          }
          return <FollowTagItem key={index}>
            {item.name}
            <FontAwesomeIcon icon={faPlusCircle} onClick={() => onClickAddTag(item.name)} />
          </FollowTagItem>
        })}
      </FollowTagBox>
    </FollowTags>}
  </Container>);
}

export default SelectTags;