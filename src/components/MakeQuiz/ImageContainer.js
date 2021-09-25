import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { faImage, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';

const ImageLabel = styled.label`
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
`

const PreviewMsg = styled.div`
  text-align: center;
  padding: 10px 0px;
  border-radius: 5px;
  background-color: rgb(200, 200, 200, 0.4);
  svg {
    margin-left: 10px;
  }
`

const PreviewImageBox = styled.div`
  grid-column: 2 / 3;
  margin-top: 10px; 
  position: relative;
  svg {
    position: absolute;
    top: 10px;
    left: 10px;
    font-size: 20px;
    color: tomato;
    cursor: pointer;
  }
`

const PreviewImage = styled.img`
  width: 100%;
  animation: ${fadeIn} 1s linear forwards;
`

const ImageContainer = ({ register, setValue, setImage, nextMode, imageId, previewImg, setPreviewImg }) => {

  const onChangeImage = ({ target: { files } }) => {
    if (files.length) {
      const file = files[0]
      setImage(file)
      let reader = new FileReader();
      reader.onload = function (e) { setPreviewImg(e.target.result); }
      reader.readAsDataURL(file);
    }
  }
  const onClickRemoveImage = () => {
    setPreviewImg(undefined)
    setValue("image", null)
  }
  const [questionMark, setQuestionMark] = useState(false)
  const onClickQuestionMark = () => {
    setQuestionMark(prev => !prev)
  }
  return (<React.Fragment>
    <span className="inputTitle">
      이미지 <FontAwesomeIcon onClick={onClickQuestionMark} icon={faQuestionCircle} />
      {questionMark && <span className="subMsg">이미지가 필요한가요? 박스를 눌러 이미지를 불러오세요.(복수선택 불가능)</span>}
    </span>
    {nextMode === "" ? <ImageLabel htmlFor={imageId}>
      이미지 선택하기<FontAwesomeIcon icon={faImage} />
    </ImageLabel> :
      <PreviewMsg>이미지 미리보기<FontAwesomeIcon icon={faImage} /></PreviewMsg>
    }
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
      {nextMode === "" && <FontAwesomeIcon icon={faTimesCircle} onClick={onClickRemoveImage} />}
    </PreviewImageBox>}
  </React.Fragment>);
}

export default ImageContainer;