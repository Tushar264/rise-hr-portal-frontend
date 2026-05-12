import { useState } from 'react'
import api from '../services/api'

export default function LeaveForm() {

  const [form, setForm] = useState({
    leaveType: 'PTO',
    startDate: '',
    endDate: '',
    reason: '',
  })

  const handleChange = (e) => {

    const { name, value } = e.target

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    console.log('FORM DATA:')
    console.log(form)

    try {

      const token =
        localStorage.getItem('token')

      const response = await api.post(
        '/leave',
        form,
        {
          headers: {
            Authorization:
              `Bearer ${token}`,
          },
        }
      )

      console.log(response.data)

      alert('Leave Applied Successfully')

    } catch (error) {

      console.log(error)

      alert(
        error.response?.data?.message
      )
    }
  }

  return (

    <form
      onSubmit={handleSubmit}
      className='space-y-4'
    >

      <select
        name='leaveType'
        value={form.leaveType}
        onChange={handleChange}
        className='w-full border p-2 rounded'
      >

        <option value='FULL_DAY'>
          FULL_DAY
        </option>

        <option value='HALF_DAY'>
          HALF_DAY
        </option>

        <option value='SICK'>
          SICK
        </option>

        <option value='PLANNED'>
          PLANNED
        </option>

        <option value='WFH'>
          WFH
        </option>

      </select>

      <input
        type='date'
        name='startDate'
        value={form.startDate}
        onChange={handleChange}
        className='w-full border p-2 rounded'
      />

      <input
        type='date'
        name='endDate'
        value={form.endDate}
        onChange={handleChange}
        className='w-full border p-2 rounded'
      />

      <textarea
        name='reason'
        value={form.reason}
        onChange={handleChange}
        placeholder='Reason'
        className='w-full border p-2 rounded'
      />

      <button
        type='submit'
        className='bg-black text-white px-4 py-2 rounded'
      >
        Apply Leave
      </button>

    </form>
  )
}