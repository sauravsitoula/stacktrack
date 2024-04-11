import styled from "styled-components";

export const GSContainer = styled.div`
  height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ lightBg }) => (lightBg ? "#f9f9f9" : "#010606")};
  @media screen and (max-width: 768px) {
    height: 1100px;
    padding: 100px 0;
  }
  @media screen and (max-width: 480px) {
    height: 800px;
    padding: 100px 0;
  }
`;

export const GSWrapper = styled.div`
    display: grid;
    z-index = 1;
    height: 550px;
    width: 100%;
    max-width: 1100px;
    margin-right: auto;
    margin-left: auto;
    padding: 0 24px;
    justify-content: center; 
`;
export const GSRow = styled.div`
  display: grid;
  grid-auto-columns: minmax(auto, 1fr);
  align-items: center;
  grid-template-areas: ${({ imgStart }) =>
    imgStart ? `'col2 col1'` : `'col1 col2'`};
  @media screen and (max-width: 768px) {
    grid-template-areas: ${({ imgStart }) =>
      imgStart ? `'col2 col2' 'col1 col1' ` : `'col1 col1' 'col2 col2'`};
  }
`;

export const Column1 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col1;
`;

export const Column2 = styled.div`
  margin-bottom: 15px;
  padding: 0 15px;
  grid-area: col2;
`;
export const TextWrapper = styled.div`
  max-width: 540px;
  padding-top: 0;
`;

export const Topline = styled.p`
  color: #01bf71;
  font-size: 25px;
  line-height: 16px;
  font-weight: 700;
  letter-spacing: 1.4px;
  text-transform: uppercase;
  margin-bottom: 16px;
`;

export const Description = styled.p`
    max-width: 440px;
    margin:bottom: 35px;
    font-size 18px;
    line-height: 24px;
    text-align: justify;
    color: ${({ darkText }) => (darkText ? "#010606" : "#fff")};
`;

export const ImgWrap = styled.div`
  maxwidth: 555px;
  height: 100%;
`;

export const Img = styled.img`
  width: 100%;
  margin: 0 0 10px 0;
  padding-right: 0;
`;

export const GSH1 = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 64px;
  color: ${({ darkText }) => (darkText ? "#010606" : "#fff")};
  @media screen and (max-width: 480px) {
    font-size: 2rem;
  }
`;
