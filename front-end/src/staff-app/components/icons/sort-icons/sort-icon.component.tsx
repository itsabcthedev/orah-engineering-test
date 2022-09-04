import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React from "react"
import { SortMode } from "staff-app/daily-care/home-board.page"
import styled from "styled-components"

interface Props {
  sortMode: SortMode
}
export const SortIcon: React.FC<Props> = (props) => {
  const { sortMode } = props
  return (
    <S.Icon isSortMode={Boolean(sortMode)}>
      <FontAwesomeIcon icon={sortMode === "asc" ? "sort-down" : "sort-up"} size={"lg"} inverse />
    </S.Icon>
  )
}

const S = {
  Icon: styled.div<{ isSortMode: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    cursor: ${({ isSortMode }) => (isSortMode ? "pointer" : undefined)};
    padding: 0 0.5rem;
  `,
}
