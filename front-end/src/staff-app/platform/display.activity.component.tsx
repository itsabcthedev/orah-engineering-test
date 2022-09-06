import React, { useEffect } from 'react'
import { useApi } from 'shared/hooks/use-api'
import { Activity } from 'shared/models/activity'
import { Person, PersonHelper } from 'shared/models/person'
import './grid.scss';

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
    return (
        <section className="p-2">
            <div className="flex-table">
                <div className="ft-header">
                    <div className="ft-cell">Name</div>
                    {/* <div className="ft-cell">Date</div> */}
                    <div className="ft-cell">Roll State</div>
                    <div className="ft-cell">Student Name</div>
                </div>
                <div className="ft-body-wrap" id="scrollbar">
                    <div className="ft-body">
                        {activityData.map(x =>
                           !!x.entity.student_roll_states.length && <>
                                <div>{convertDateToISo(x.date)[0]} {convertDateToISo(x.date)[1]}</div>
                                <div className="ft-row">
                                    <div className="ft-cell">{x.entity.name}</div>
                                    {/* <div className="ft-cell">{convertDateToISo(x.entity.completed_at)[0]} {convertDateToISo(x.entity.completed_at)[1]}</div> */}
                                    {x.entity.student_roll_states.map(y => <>
                                        <div className="ft-cell">{y.roll_state}</div>
                                        <div className="ft-cell">{studentsData && PersonHelper.getFullName(studentsData.students.filter(s => s.id === y.student_id).map(n => n)[0])}</div>
                                    </>)}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    )
}