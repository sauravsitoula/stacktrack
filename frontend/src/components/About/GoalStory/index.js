import React from "react";
import {
  GSContainer,
  GSWrapper,
  GSRow,
  Column1,
  Column2,
  TextWrapper,
  Topline,
  Description,
  ImgWrap,
  Img,
  GSH1,
} from "./GoalStoryElements";

const index = ({
  id,
  lightBg,
  topline,
  description,
  imgStart,
  img,
  alt,
  darkText,
  heading,
}) => {
  return (
    <div>
      <GSContainer lightBg={lightBg} id={id}>
        <GSH1 darkText={darkText}>{heading}</GSH1>
        <GSWrapper>
          <GSRow imgStart={imgStart}>
            <Column1>
              <TextWrapper>
                <Topline>{topline}</Topline>
                <Description darkText={darkText}>{description}</Description>
              </TextWrapper>
            </Column1>
            <Column2>
              <ImgWrap>
                <Img src={img} alt={alt} />
              </ImgWrap>
            </Column2>
          </GSRow>
        </GSWrapper>
      </GSContainer>
    </div>
  );
};

export default index;
