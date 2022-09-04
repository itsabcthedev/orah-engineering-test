import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { PopUp } from "shared/components/popup/popup.component"
import { SwitchSort } from "shared/components/switch-sort/switch-sort.component"
import ToolTip from "shared/components/tooltip/tooltip.component"
import { useApi } from "shared/hooks/use-api"
import { Person, PersonHelper, sortData, SortDataModel } from "shared/models/person"
import { Spacing } from "shared/styles/styles"
import { ActiveRollAction, ActiveRollOverlay } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { Toolbar, ToolbarAction } from "staff-app/components/header/toolbar.component"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import styled from "styled-components"

export type SortMode = "asc" | "des"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [isSortMode, setIsSortMode] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>("asc")
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [studentsData, setStudentsData] = useState<Person[]>([])
  const [sortType, setSortType] = useState<SortDataModel[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [sortByTitle, setSortByTitle] = useState("Full Name");

  useEffect(() => {
    getStudents()
  }, [getStudents])

  useEffect(() => {
    if (!!data?.students) {
      setStudentsData(data.students)
    }
  }, [data?.students])

  useEffect(() => {
    setSortType(sortData);
    setIsCheck(sortType.map((li) => li.id));
  }, [sortType]);

  useEffect(() => {
    if (isCheck.length === sortType.length) {
      setIsCheckAll(true);
      setSortByTitle("Full Name")
    }
    else {
      setIsCheckAll(false);
      setSortByTitle(sortType.filter(x => x.id === isCheck.map((li) => li).toString()).map(y => y.title).toString())
    }
    if (!isCheck.length) {
      setSortByTitle("Full Name")
    }
  }, [isCheck, sortType]);

  const handleSelectAll = () => {
    setIsCheckAll(!isCheckAll);
    setIsCheck(sortType.map((li) => li.id));
    if (isCheckAll) {
      setIsCheck([]);
    }
  };

  const handleChangeSortType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target;
    setIsCheck([...isCheck, id]);
    if (!checked) {
      setIsCheck(isCheck.filter((item) => item !== id));
    }
  };


  const onToolbarAction = (action: ToolbarAction) => {
    switch (action) {
      case "sort":
        setIsSortMode(true)
        setIsRollMode(false)
        setIsSearchMode(false)
        onSortStudents()
        break
      case "search":
        setIsSortMode(false)
        setIsRollMode(false)
        setIsSearchMode(true)
        break
      case "roll":
        setIsRollMode(true)
        setIsSortMode(false)
        setIsSearchMode(false)
        break
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
    if (!!data?.students) setStudentsData(data.students.filter((x) => PersonHelper.getFullName(x).toLowerCase().includes(search.toLowerCase())))
  }

  const onSortStudents = () => {
    if (data?.students) {
      if (sortMode === "asc") {
        let AscData = data.students.sort((x, y) => {
          let a = PersonHelper.getFullName(x).toUpperCase(),
            b = PersonHelper.getFullName(y).toUpperCase()
          return a == b ? 0 : a > b ? 1 : -1
        })
        setStudentsData(AscData)
        setSortMode("des")
      } else {
        let DescData = data.students.sort((x, y) => {
          let a = PersonHelper.getFullName(x).toUpperCase(),
            b = PersonHelper.getFullName(y).toUpperCase()
          return a == b ? 0 : a > b ? -1 : 1
        })
        setStudentsData(DescData)
        setSortMode("asc")
      }
    }
  }

  return (
    <>
      <S.PageContainer>
        <PopUp Icon={<ToolTip toolTipText="Click to switch between sort by first name or last name"><FontAwesomeIcon icon="plus-circle" size={"lg"} /></ToolTip>}>
          <SwitchSort isCheckAll={isCheckAll}
            handleSelectAll={handleSelectAll}
            sortType={sortType}
            isCheck={isCheck}
            handleClick={handleChangeSortType}
          />
        </PopUp>
        <Toolbar sortByTitle={sortByTitle} onItemClick={onToolbarAction} isSearchMode={isSearchMode} searchStudents={searchStudents} isSortMode={isSortMode} sortMode={sortMode} />
        {loadState === "loading" && (
          <CenteredContainer>
            <FontAwesomeIcon icon="spinner" size="2x" spin />
          </CenteredContainer>
        )}

        {loadState === "loaded" && data?.students && (
          <>
            {studentsData.map((s) => (
              <StudentListTile key={s.id} isRollMode={isRollMode} student={s} isCheckedAll={isCheckAll} isChecked={isCheck.map((li) => li).toString()} />
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

const S = {
  PageContainer: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 140px;
  `,
}
