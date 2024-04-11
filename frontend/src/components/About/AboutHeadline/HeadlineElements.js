import styled from "styled-components";
import background from "../Images/bg.jpg";

export const HeadlineContainer = styled.div` 
    background-image: url(${background}); no-repeat;
    background-size: 100% 100%;
    height: 754px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 768px){
        height: 1100px;
    }
    @media screen and (max-width: 480px){
        height: 800px;
    }
`;

export const Headline = styled.h1`
  font-size: 2.5rem;
  color: #01bf71;
  margin-bottom: 64px;
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;

export const Description = styled.p`
    max-width: 500px;
    margin:bottom: 35px;
    font-size: 1.2rem;
    line-height: 24px;
    text-align: justify;
    color: #010606;
    padding: 30px;
`;

export const TextWrapper = styled.div`
  position: absolute;
  background: rgba(255, 255, 255);
  //width: 25%;
  padding: 20px;
  max-width: 540px;
  border-radius: 10%;
`;
