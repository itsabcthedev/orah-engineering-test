import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import styled from "styled-components"

interface Props {
  onClick: () => void
}
export const SortDescIcon: React.FC<Props> = (props) => {
  const { onClick } = props
  return (
    <S.Icon clickable={Boolean(onClick)} onClick={onClick}>
      <FontAwesomeIcon icon="sort-down" size={"lg"} inverse />
    </S.Icon>
  )
}

const S = {
  Icon: styled.div<{ clickable: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: ${({ clickable }) => (clickable ? "pointer" : undefined)};
    padding:0.5rem
  `,
}
