import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Button from "@material-ui/core/Button"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Spacing, BorderRadius, FontWeight } from "shared/styles/styles"
import { Colors } from "shared/styles/colors"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { Person, PersonHelper } from "shared/models/person"
import { useApi } from "shared/hooks/use-api"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import { ActiveRollOverlay, ActiveRollAction } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { SortAscIcon } from "staff-app/components/icons/sort-icons/sort-asc-icon.component"
import { SortDescIcon } from "staff-app/components/icons/sort-icons/sort-desc-icon.component"


export type SortMode = "asc" | "des"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [isSortMode, setIsSortMode] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>("asc")
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [studentsData, setStudentsData] = useState<Person[]>([]);

  useEffect(() => {
    getStudents()
  }, [getStudents])

  useEffect(() => {
    if (!!data?.students) {
      setStudentsData(data.students)
    }
  }, [data?.students])

  const onToolbarAction = (action: ToolbarAction) => {
    switch (action) {
      case "sort":
        setIsSortMode(true)
        setIsRollMode(false)
        setIsSearchMode(false)
        onSortStudents()
        break;
      case "search":
        setIsSortMode(false)
        setIsRollMode(false)
        setIsSearchMode(true)
        break;
      case "roll":
        setIsRollMode(true)
        setIsSortMode(false)
        setIsSearchMode(false)
        break;
      default:
        setIsRollMode(false)
        setIsSortMode(false)
        setIsSearchMode(false)
    }
  }

  const onActiveRollAction = (action: ActiveRollAction) => {
    if (action === "exit") {
      setIsRollMode(false)
    }
  }

  const searchStudents = (search: string) => {
    if (!!data?.students)
      setStudentsData(data.students.filter(x => PersonHelper.getFullName(x).toLowerCase().includes(search.toLowerCase())))
  }

  const onSortStudents = () => {
    if (data?.students) {
      if (sortMode === "asc") {
        let AscData = data.students.sort((x, y) => {
          let a = PersonHelper.getFullName(x).toUpperCase(),
            b = PersonHelper.getFullName(y).toUpperCase();
          return a == b ? 0 : a > b ? 1 : -1;
        });
        setStudentsData(AscData);
        setSortMode("des");
      }
      else {
        let DescData = data.students.sort((x, y) => {
          let a = PersonHelper.getFullName(x).toUpperCase(),
            b = PersonHelper.getFullName(y).toUpperCase();
          return a == b ? 0 : a > b ? -1 : 1;
        });
        setStudentsData(DescData);
        setSortMode("asc");
      }
    }
  }

  return (
    <>
      <S.PageContainer>
        <Toolbar onItemClick={onToolbarAction} isSearchMode={isSearchMode} searchStudents={searchStudents} isSortMode={isSortMode} sortMode={sortMode} />
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {studentsData.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} />
    </>
  )
}

type ToolbarAction = "roll" | "sort" | "search"
interface ToolbarProps {
  onItemClick: (action: ToolbarAction, value?: string) => void;
  isSearchMode: boolean;
  isSortMode: boolean;
  searchStudents: (search: string) => void;
  sortMode: SortMode;
}

const Toolbar: React.FC<ToolbarProps> = (props) => {
  const { onItemClick, isSearchMode, searchStudents, isSortMode, sortMode } = props
  return (
    <S.ToolbarContainer>
      <S.Button onClick={() => onItemClick("sort")}>First Name {isSortMode && (sortMode === "des" ? <SortAscIcon onClick={() => { }} /> : <SortDescIcon onClick={() => { }} />)}
      </S.Button>
      {isSearchMode ? <input placeholder="Search..." type={"text"} onChange={(e) => { e.preventDefault(); searchStudents(e.target.value) }} /> : <S.Button onClick={() => onItemClick("search")}>Search</S.Button>}
      <S.Button onClick={() => onItemClick("roll")}>Start Roll</S.Button>
    </S.ToolbarContainer>
  )
}

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
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
      color:#fff
    }
  `,
}
