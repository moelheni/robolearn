import styled from "styled-components"

export const SubTopicNavWrapper = styled.div`
  padding: 10px;
  h1 {
    line-height: 1;
    margin: 4px 0;
    font-size: 28px;
    text-align: center;
    color: #222;
    strong {
      color: #000;
      text-decoration: underline;
    }
  }
`

export const SubTopicWrapper = styled.div`
  margin-top: 37px;
`

export const NavVideosWrapper = styled.div`
  display: flex;
`

export const NavVideoWrapper = styled.div`
  width: 50%;
  padding: 10px;
  text-align: center;
  cursor: pointer;
  &:hover{
    background: #eee;
  }

  img {
    max-width: 100px;
    height: 100px;
    background: red;
  }

  h3 {
    font-weight: normal;
  }
`

export const ContentWrapper = styled.div``

export const VideoWrapper = styled.div``

export const AgentSpace = styled.div`
  padding: 10px;
  height: calc(100% - 20px);
  overflow: auto;
`

export const SubTopicList = styled.div`
  ul {
    margin: 0;
  }
`