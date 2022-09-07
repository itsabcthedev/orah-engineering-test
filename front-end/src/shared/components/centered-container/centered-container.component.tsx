import React from "react"
import styled from "styled-components"
import { Spacing } from "shared/styles/styles"

interface Props {
  padding?: string;
  backgroundColor?: string;
}

export const CenteredContainer: React.FC<Props> = ({ padding = "60px", backgroundColor = "", children }) => (
  <S.Container backgroundColor={backgroundColor}>
    <S.Centered padding={padding}>{children}</S.Centered>
  </S.Container>
)

const S = {
  Container: styled.div <{ backgroundColor: string }>`
    display: flex;
    width:100%;
    height:100%;
    background-color:${({ backgroundColor }) => backgroundColor}
  `,
  Centered: styled.div<{ padding: string }>`
    width: 100%;
    margin: ${Spacing.u4} 0;
    padding: ${({ padding }) => padding};
    text-align: center;
  `,
}
