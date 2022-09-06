import Button from "@material-ui/core/Button"
import React from "react"
import { StudentsRollType } from "shared/models/roll"
import { BorderRadius, Spacing } from "shared/styles/styles"
import { ItemType, RollStateList } from "staff-app/components/roll-state/roll-state-list.component"
import styled from "styled-components"

export type ActiveRollAction = "filter" | "complete" | "exit"

interface Props {
  isActive: boolean
  onItemClick: (action: ActiveRollAction, value?: ItemType) => void
  StudentsRollData: StudentsRollType[];
}

export const ActiveRollOverlay: React.FC<Props> = (props) => {
  const { isActive, onItemClick, StudentsRollData } = props
  return (
    <S.Overlay isActive={isActive}>
      <S.Content>
        <div>Class Attendance</div>
        <div>
          <RollStateList
            stateList={[
              { type: "all", count: StudentsRollData.length },
              { type: "present", count: StudentsRollData.filter(x => x.roll_state === "present").length },
              { type: "late", count: StudentsRollData.filter(x => x.roll_state === "late").length },
              { type: "absent", count: StudentsRollData.filter(x => x.roll_state === "absent").length },
            ]}
            onItemClick={onItemClick}
          />
          <div style={{ marginTop: Spacing.u6 }}>
            <Button color="inherit" onClick={() => onItemClick("exit")}>
              Exit
            </Button>
            <Button classes={{ disabled: "btn-color-disabled" }} disabled={!StudentsRollData.filter(x => !!x.student_id).length} color="inherit" style={{ marginLeft: Spacing.u2 }} onClick={() => onItemClick("complete")}>
              Complete
            </Button>
          </div>
        </div>
      </S.Content>
    </S.Overlay>
  )
}

const S = {
  Overlay: styled.div<{ isActive: boolean }>`
    position: fixed;
    bottom: 0;
    left: 0;
    height: ${({ isActive }) => (isActive ? "120px" : 0)};
    width: 100%;
    background-color: rgba(34, 43, 74, 0.92);
    backdrop-filter: blur(2px);
    color: #fff;
  `,
  Content: styled.div`
    display: flex;
    justify-content: space-between;
    width: 52%;
    height: 100px;
    margin: ${Spacing.u3} auto 0;
    border: 1px solid #f5f5f536;
    border-radius: ${BorderRadius.default};
    padding: ${Spacing.u4};
  `,
}
