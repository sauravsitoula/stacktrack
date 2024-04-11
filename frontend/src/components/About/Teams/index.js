import React from "react";
import {
  TeamsContainer,
  TeamsH1,
  TeamsWrapper,
  TeamsCard,
  TeamsIcon,
  TeamsH2,
  TeamsP,
} from "./TeamElements";

const Teams = () => {
  return (
    <TeamsContainer style={{ display: "flex" }}>
      <TeamsH1>Our Team</TeamsH1>
      <TeamsWrapper style={{ display: "flex" }}>
        <TeamsCard>
          <TeamsIcon src={"Images/saurav.jpg"} />
          <TeamsH2>Saurav Sitoula</TeamsH2>
          <TeamsP>Full Stack Developer</TeamsP>
        </TeamsCard>
        <TeamsCard>
          <TeamsIcon src={"Images/mukesh.jpg"} />
          <TeamsH2>Mukesh Upadhya</TeamsH2>
          <TeamsP>ML Developer</TeamsP>
        </TeamsCard>
        <TeamsCard>
          <TeamsIcon src={"Images/nino.png"} />
          <TeamsH2>Nino Mirskhulava</TeamsH2>
          <TeamsP>Frontend Developer</TeamsP>
        </TeamsCard>
      </TeamsWrapper>
    </TeamsContainer>
  );
};

export default Teams;
