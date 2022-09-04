import React from "react"
import { SortMode } from "staff-app/daily-care/home-board.page"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { Colors } from "shared/styles/colors"
import { BorderRadius, FontWeight, Spacing } from "shared/styles/styles"
import { SortIcon } from "../icons/sort-icons/sort-icon.component"
import ToolTip from "shared/components/tooltip/tooltip.component"

export type ToolbarAction = "roll" | "sort" | "search"
interface ToolbarProps {
    onItemClick: (action: ToolbarAction, value?: string) => void
    isSearchMode: boolean
    isSortMode: boolean
    searchStudents: (search: string) => void
    sortMode: SortMode,
    sortByTitle: string;
}

export const Toolbar: React.FC<ToolbarProps> = (props) => {
    const { onItemClick, isSearchMode, searchStudents, isSortMode, sortMode, sortByTitle } = props
    return (
        <S.ToolbarContainer>
            <ToolTip toolTipText="Click to sort"><S.Button onClick={() => onItemClick("sort")}>{sortByTitle} {isSortMode && <SortIcon sortMode={sortMode} />}</S.Button></ToolTip>
            {isSearchMode ? (
                <input
                    placeholder="Search..."
                    type={"text"}
                    onChange={(e) => {
                        e.preventDefault()
                        searchStudents(e.target.value)
                    }}
                />
            ) : (
                <ToolTip toolTipText="Click to search"><S.Button onClick={() => onItemClick("search")}>Search</S.Button></ToolTip>
            )}
            <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
        </S.ToolbarContainer>
    )
}

const S = {
    ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
  `,
    Button: styled(Button)`
    && {
      padding: ${Spacing.u2};
      font-weight: ${FontWeight.strong};
      border-radius: ${BorderRadius.default};
      color: #fff;
    }
  `,
}
