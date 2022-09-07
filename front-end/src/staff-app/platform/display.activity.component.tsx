import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect } from 'react';
import { CenteredContainer } from 'shared/components/centered-container/centered-container.component';
import { ModalComponent } from 'shared/components/popup/modal.component';
import ToolTip from 'shared/components/tooltip/tooltip.component';
import { useApi } from 'shared/hooks/use-api';
import { Activity } from 'shared/models/activity';
import { Person, PersonHelper } from 'shared/models/person';
import { Colors } from 'shared/styles/colors';
import { BorderRadius, FontWeight, Spacing } from 'shared/styles/styles';
import styled from "styled-components";
import './activity.scss';

interface GridProps {
    activityData: Activity[]
}

export const DisplayActivity = (props: GridProps) => {
    const [getStudents, studentsData] = useApi<{ students: Person[] }>({ url: "get-homeboard-students" })

    useEffect(() => {
        getStudents()
    }, [getStudents])

    const convertDateToISo = (date: Date) => {
        return new Date(date).toLocaleString().replaceAll('/', '-').split(',')
    }

    const { activityData } = props
    return (<div className="cardContainer overflowY h-v-75" id="scrollbar">
        {activityData.map(x =>
            <div className="card cardBg">
                <div className="cardName cardNameBg">{x.entity.name}</div>
                <div className="flex cardTitle">Completed At</div>
                <div className="flex cardText">{convertDateToISo(x.date)[0]} {convertDateToISo(x.date)[1]}</div>
                {!!x.entity.student_roll_states.length && <ModalComponent title={<S.Title>Roll info as of {convertDateToISo(x.date)[0]} {convertDateToISo(x.date)[1]}</S.Title>} Icon={<ToolTip toolTipText={`Click to see the students roll state`}><FontAwesomeIcon icon="plus-circle" size={"lg"} /></ToolTip>}>
                    <CenteredContainer>
                        <S.ToolbarContainer>
                            <S.Title>
                                Student Name
                            </S.Title>
                            <S.Title>
                                Roll State
                            </S.Title>
                        </S.ToolbarContainer>
                        <div className='overflow'>                            {x.entity.student_roll_states.map(y =>
                            <S.Container>
                                <S.Content>{studentsData && PersonHelper.getFullName(studentsData.students.filter(s => s.id === y.student_id).map(n => n)[0])}</S.Content>
                                <S.Content>{y.roll_state}</S.Content>
                            </S.Container>
                        )}
                        </div>

                    </CenteredContainer>
                </ModalComponent>}
            </div>)
        }
    </div >
    )
}

const S = {
    ToolbarContainer: styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width:50%;
    color: #fff;
    background-color: ${Colors.blue.base};
    padding: 6px 14px;
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
    margin:auto;
  `,
    Title: styled.span`
  && {
    padding: ${Spacing.u2};
    font-weight: ${FontWeight.strong};
    border-radius: ${BorderRadius.default};
    color: #fff;
  }`,
    Container: styled.div`
  display: flex;
  width:50%;
  justify-content: space-between;
  height: 40px;
  border-radius: ${BorderRadius.default};
  background-color: #fff;
  margin:${Spacing.u3} auto;
  box-shadow: 0 2px 7px rgba(5, 66, 145, 0.13);
  transition: box-shadow 0.3s ease-in-out;
  padding: 6px 14px;

  &:hover {
    box-shadow: 0 2px 7px rgba(5, 66, 145, 0.26);
  }
`,
    Content: styled.div`
color: ${Colors.dark.base};
font-weight: ${FontWeight.strong};
margin:auto 0;
padding: ${Spacing.u2};
`
}