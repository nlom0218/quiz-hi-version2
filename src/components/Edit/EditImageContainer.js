import { faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const ImageContainer = styled.div`
  grid-column: 2 / 3;
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
  column-gap: 20px;
  .label, .delBtn {
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

const PreviewImageBox = styled.div`
  grid-column: 1 / -1;
  margin-top: 10px; 
`

const PreviewImage = styled.img`
  width: 100%;
  animation: ${fadeIn} 1s linear forwards;
`

const EditImageContainer = ({ register, setNewImage, imageId, previewImg, setPreviewImg, setDelImg, delImg }) => {
  const onChangeImage = ({ target: { files } }) => {
    if (files.length) {
      const file = files[0]
      if (delImg) {
        setDelImg(false)
      }
      setNewImage(file)
      let reader = new FileReader();
      reader.onload = function (e) { setPreviewImg(e.target.result); }
      reader.readAsDataURL(file);
    }
  }
  const onClickRemoveImage = () => {
    setPreviewImg(undefined)
    setDelImg(true)
    setNewImage(undefined)
  }
  return (<ImageContainer>
    <ImageLabel htmlFor={imageId} className="label">
      이미지 선택하기<FontAwesomeIcon icon={faImage} />
    </ImageLabel>
    <DelImgBtn className="delBtn" onClick={onClickRemoveImage}>
      이미지 삭제하기<FontAwesomeIcon icon={faTrashAlt} />
    </DelImgBtn>
    <input
      {...register("image")}
      type="file"
      id={imageId}
      style={{ display: "none" }}
      accept="image/jpeg, image/jpg, image/png"
      onChange={onChangeImage}
    />
    {previewImg && <PreviewImageBox>
      <PreviewImage src={previewImg} />
    </PreviewImageBox>}
  </ImageContainer>);
}

export default EditImageContainer;