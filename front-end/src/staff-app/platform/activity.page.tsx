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
  useEffect(() => {
    getActivities()
  }, [getActivities])

  return <S.Container>

    {loadState === "loading" && (
      <CenteredContainer>
        <FontAwesomeIcon icon="spinner" size="2x" spin />
      </CenteredContainer>
    )}

    {loadState === "loaded" && (
      <CenteredContainer backgroundColor="#bbdefb">
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
    width: 100%;
    height:100%;
    background: #bbdefb;
  `,
}
