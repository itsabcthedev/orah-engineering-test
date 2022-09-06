import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import React, { useEffect, useState } from "react"
import { CenteredContainer } from "shared/components/centered-container/centered-container.component"
import { useApi } from "shared/hooks/use-api"
import { Activity } from "shared/models/activity"
import { Person, PersonHelper } from "shared/models/person"
import { Spacing } from "shared/styles/styles"
import styled from "styled-components"
import { DisplayActivity } from "./display.activity.component"

export const ActivityPage: React.FC = () => {
  const [getActivities, data, loadState] = useApi<{ activity: Activity[] }>({ url: "get-activities" })
  const [getStudents, studentsData] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })
  useEffect(() => {
    getActivities()
  }, [getActivities])

  useEffect(() => {
    getStudents()
  }, [getStudents])


  return <S.Container>

    {loadState === "loading" && (
      <CenteredContainer>
        <FontAwesomeIcon icon="spinner" size="2x" spin />
      </CenteredContainer>
    )}

    {loadState === "loaded" && (
      <CenteredContainer>
        {/* {data?.activity.map(x =>
          <>
            Roll Name: <div>{x.entity.name}</div>
            Roll Date:<div></div>
            {x.entity.student_roll_states.map(y => <>
              Roll State:<div>{y.roll_state}</div>
              Name: <div>{studentsData && PersonHelper.getFullName(studentsData.students.filter(s => s.id === y.student_id).map(n => n)[0])}</div>
            </>)}
          </>
        )} */}
        {!!data?.activity.length && <DisplayActivity activityData={data.activity} />}
      </CenteredContainer>
    )}

    {loadState === "error" && (
      <CenteredContainer>
        <div>Failed to load</div>
      </CenteredContainer>
    )}

  </S.Container>
}

const S = {
  Container: styled.div`
    display: flex;
    flex-direction: column;
    width: 50%;
    margin: ${Spacing.u4} auto 0;
  `,
}
