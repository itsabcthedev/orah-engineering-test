import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { PopUp } from "shared/components/popup/popup.component"
import { SwitchSort } from "shared/components/switch-sort/switch-sort.component"
import ToolTip from "shared/components/tooltip/tooltip.component"
import { useApi } from "shared/hooks/use-api"
import { Person, PersonHelper, sortData, SortDataModel } from "shared/models/person"
import { RollDataModel, RollInput, RolllStateType, StudentsRollType } from "shared/models/roll"
import { Spacing } from "shared/styles/styles"
import { ActiveRollAction, ActiveRollOverlay } from "staff-app/components/active-roll-overlay/active-roll-overlay.component"
import { Toolbar, ToolbarAction } from "staff-app/components/header/toolbar.component"
import { ItemType } from "staff-app/components/roll-state/roll-state-list.component"
import { StudentListTile } from "staff-app/components/student-list-tile/student-list-tile.component"
import styled from "styled-components"

export type SortMode = "asc" | "des"

export const HomeBoardPage: React.FC = () => {
  const [isRollMode, setIsRollMode] = useState(false)
  const [isSortMode, setIsSortMode] = useState(false)
  const [isSearchMode, setIsSearchMode] = useState(false)
  const [sortMode, setSortMode] = useState<SortMode>("asc")
  const [getStudents, data, loadState] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  const [submitRoll] = useApi({ url: "save-roll" })
  const [studentsData, setStudentsData] = useState<StudentsRollType[]>([])
  const [filterStudentsData, setFilterStudentsData] = useState<StudentsRollType[]>([])
  const [sortType, setSortType] = useState<SortDataModel[]>([]);
  const [isCheckAll, setIsCheckAll] = useState(false);
  const [isCheck, setIsCheck] = useState<string[]>([]);
  const [sortByTitle, setSortByTitle] = useState("Full Name");
  const [rollData, setRollData] = useState<RollDataModel[]>([]);
  const [filterKey, setFilterKey] = useState<ItemType>("all");

  useEffect(() => {
    getStudents()
  }, [getStudents])

  useEffect(() => {
    if (!!data?.students)
      setStudentsData(data.students.map((e: any) => {
        let temp = rollData.find(element => element.student_id === e.id)
        if (temp?.roll_state && temp.student_id) {
          e.student_id = temp.student_id,
            e.roll_state = temp.roll_state
        }
        else {
          e.student_id = 0,
            e.roll_state = "unmark"
        }
        return e;
      }))
  }, [data?.students, rollData])

  useEffect(() => {
    if (filterKey === "all") {
      setFilterStudentsData(studentsData)
    }
    else { setFilterStudentsData(studentsData.filter(x => x.roll_state === filterKey)); }
  }, [filterKey, studentsData])


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
        setFilterKey("all")
        onSortStudents()
        break
      case "search":
        setIsSortMode(false)
        setIsRollMode(false)
        setIsSearchMode(true)
        setFilterKey("all")
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

  const onActiveRollAction = (action: ActiveRollAction, value?: ItemType) => {
    if (action === "filter" && !!value) {
      setFilterKey(value)
    }
    else if (action === "exit") {
      setIsRollMode(false)
      setFilterKey("all")
      setRollData([])
    }
    else {
      let param: RollInput = {
        "student_roll_states": rollData
      }
      submitRoll(param);
      setIsRollMode(false)
    }
  }

  const searchStudents = (search: string) => {
    setFilterStudentsData(studentsData.filter((x) => PersonHelper.getFullName(x).toLowerCase().includes(search.toLowerCase())))
  }

  const onSortStudents = () => {
    if (sortMode === "asc") {
      let AscData = filterStudentsData.sort((x, y) => {
        let a = PersonHelper.getFullName(x).toUpperCase(),
          b = PersonHelper.getFullName(y).toUpperCase()
        return a == b ? 0 : a > b ? 1 : -1
      })
      setFilterStudentsData(AscData)
      setSortMode("des")
    } else {
      let DescData = filterStudentsData.sort((x, y) => {
        let a = PersonHelper.getFullName(x).toUpperCase(),
          b = PersonHelper.getFullName(y).toUpperCase()
        return a == b ? 0 : a > b ? -1 : 1
      })
      setFilterStudentsData(DescData)
      setSortMode("asc")
    }
  }

  const rollDetails = (rollType: RolllStateType, id?: number) => {
    if (!!id) {
      let rData = { student_id: id, roll_state: rollType }
      setRollData(prevState => [...prevState.filter(x => x.student_id !== id), rData])
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

        {loadState === "loaded" && filterStudentsData && (
          <>
            {filterStudentsData.map((res) => (
              <StudentListTile student={res} RollData={rollData.filter(x => x.student_id === res.id)[0]} getRoll={(roll: RolllStateType) => rollDetails(roll, res.id)} key={res.id} isRollMode={isRollMode} isCheckedAll={isCheckAll} isChecked={isCheck.map((li) => li).toString()} />
            ))}
          </>
        )}

        {loadState === "error" && (
          <CenteredContainer>
            <div>Failed to load</div>
          </CenteredContainer>
        )}
      </S.PageContainer>
      {isRollMode && <ActiveRollOverlay isActive={isRollMode} onItemClick={onActiveRollAction} StudentsRollData={studentsData} />}
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
