import { faQuestionCircle } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';
import styled from 'styled-components';
import { fadeIn } from '../../animation/fade';
import ImageContainer from './ImageContainer';
import InputLayout from './InputLayout';
import TagContainer from './TagContainer';

const Option = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  animation: ${fadeIn} 0.4s ease;
  row-gap: 60px;
`

const QuestionOption = (
  { register, getValues, setValue, questionTags, setQuestionTags, setImage, nextMode, imageId, previewImg, setPreviewImg, updateQuestion }
) => {
  const [questionMark, setQuestionMark] = useState(false)
  const onClickQuestionMark = () => {
    setQuestionMark(prev => !prev)
  }
  return (<Option>
    <InputLayout updateQuestion={updateQuestion}>
      <span className="inputTitle">
        힌트 <FontAwesomeIcon onClick={onClickQuestionMark} icon={faQuestionCircle} />
        {questionMark && <span className="subMsg">힌트가 있나요? 힌트를 작성하세요.</span>}
      </span>
      <input
        {...register("hint")}
        type="text"
        readOnly={nextMode !== "" && "readOnly"}
        autoComplete="off"
      />
    </InputLayout>
    <InputLayout updateQuestion={updateQuestion}>
      <ImageContainer
        setValue={setValue}
        register={register}
        setImage={setImage}
        nextMode={nextMode}
        imageId={imageId}
        previewImg={previewImg}
        setPreviewImg={setPreviewImg}
      />
    </InputLayout>
    <InputLayout updateQuestion={updateQuestion}>
      <TagContainer
        getValues={getValues}
        setValue={setValue}
        register={register}
        tags={questionTags}
        setTags={setQuestionTags}
        nextMode={nextMode}
        question={true}
        subMsg1="해당 문제에만 해당되는 태그가 있나요? 태그를 입력하고 + 버튼을 눌러주세요."
      />
    </InputLayout>
  </Option>);
}

export default QuestionOption;