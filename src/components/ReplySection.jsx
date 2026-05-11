import {
  useEffect,
  useState,
} from 'react'

import api from '../services/api'

export default function ReplySection({
  announcementId,
}) {

  const [replies, setReplies] =
    useState([])

  const [replyText, setReplyText] =
    useState('')


  useEffect(() => {

    fetchReplies()

  }, [])



  const fetchReplies =
    async () => {

      try {

        const token =
          localStorage.getItem('token')

        const res =
          await api.get(

            `/announcement/reply/${announcementId}`,

            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        setReplies(res.data)

      } catch (error) {

        console.log(error)
      }
  }



  const addReply =
    async () => {

      try {

        const token =
          localStorage.getItem('token')

        await api.post(

          '/announcement/reply',

          {
            announcementId,
            body: replyText,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        setReplyText('')

        fetchReplies()

      } catch (error) {

        console.log(error)
      }
  }



  return (

    <div className='mt-4'>

      <h3 className='font-semibold mb-2'>
        Replies
      </h3>


      <div className='space-y-2 mb-4'>

        {
          replies.map((reply) => (

            <div
              key={reply._id}
              className='bg-gray-100 p-2 rounded'
            >

              <p>
                {reply.body}
              </p>

              <div className='text-xs text-gray-500'>

                {reply.authorId?.name}

              </div>

            </div>
          ))
        }

      </div>



      <div className='flex gap-2'>

        <input
          type='text'
          placeholder='Write reply...'
          className='flex-1 border p-2 rounded'
          value={replyText}
          onChange={(e) =>
            setReplyText(e.target.value)
          }
        />

        <button
          onClick={addReply}
          className='bg-black text-white px-4 py-2 rounded'
        >
          Reply
        </button>

      </div>

    </div>
  )
}