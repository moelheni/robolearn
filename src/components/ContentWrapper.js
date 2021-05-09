import styled from "styled-components"

export default styled.div`
  padding: 30px;

  ${({ center }) => center && `
    padding: 0;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
  `}

`

export const ContentButtonWrapper = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
`