import {
  useEffect,
  useState,
} from 'react'

import FullCalendar from '@fullcalendar/react'

import dayGridPlugin from '@fullcalendar/daygrid'

import api from '../services/api'

export default function CalendarComponent() {

  const [events, setEvents] =
    useState([])

  useEffect(() => {

    fetchCalendar()

  }, [])

  const fetchCalendar = async () => {

    try {

      const res =
        await api.get('/calendar')

      const leaveEvents =
        res.data.leaves.map((leave) => {

          const endDate =
            new Date(leave.endDate)

          // FULLCALENDAR END DATE IS EXCLUSIVE
          endDate.setDate(
            endDate.getDate() + 1
          )

          return {

            title:
              `${leave.userId.name} - ${leave.leaveType}`,

            start: leave.startDate,

            end: endDate,

            allDay: true,
          }
      })

      setEvents(leaveEvents)

    } catch (error) {

      console.log(error)
    }
  }

  return (

    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView='dayGridMonth'
      events={events}
      height='80vh'
    />
  )
}