import {
  useEffect,
  useState,
} from 'react'

import api from '../services/api'

import ReactionButtons from '../components/ReactionButtons'

import ReplySection from '../components/ReplySection'

import Navbar from '../components/Navbar'


export default function Announcements() {

  const [posts, setPosts] =
    useState([])

  const [title, setTitle] =
    useState('')

  const [body, setBody] =
    useState('')


  useEffect(() => {

    fetchPosts()

  }, [])



  const fetchPosts =
    async () => {

      try {

        const token =
          localStorage.getItem('token')

        const res =
          await api.get(
            '/announcement',
            {
              headers: {
                Authorization:
                  `Bearer ${token}`,
              },
            }
          )

        setPosts(res.data)

      } catch (error) {

        console.log(error)
      }
  }



  const createPost =
    async (e) => {

      e.preventDefault()

      try {

        const token =
          localStorage.getItem('token')

        await api.post(

          '/announcement',

          {
            title,
            body,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        setTitle('')
        setBody('')

        fetchPosts()

      } catch (error) {

        console.log(error)
      }
  }



  return (

    <>

    <Navbar/>

      <div className='min-h-screen bg-gray-100 p-6'>

      <h1 className='text-3xl font-bold mb-6'>
        Announcements
      </h1>



      {/* CREATE POST */}

      <form
        onSubmit={createPost}
        className='bg-white p-4 rounded shadow mb-6'
      >

        <input
          type='text'
          placeholder='Title'
          className='w-full border p-2 rounded mb-4'
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
        />

        <textarea
          placeholder='Write announcement...'
          className='w-full border p-2 rounded mb-4'
          rows='4'
          value={body}
          onChange={(e) =>
            setBody(e.target.value)
          }
        />

        <button
          className='bg-black text-white px-4 py-2 rounded'
        >
          Post
        </button>

      </form>



      {/* POSTS */}

      <div className='space-y-6'>

        {
          posts.map((post) => (

            <div
              key={post._id}
              className='bg-white p-4 rounded shadow'
            >

              <h2 className='text-2xl font-semibold mb-2'>
                {post.title}
              </h2>

              <p className='text-gray-700 mb-4'>
                {post.body}
              </p>

              <div className='text-sm text-gray-500 mb-4'>

                Posted by
                {' '}
                {post.authorId?.name}

              </div>

              <ReactionButtons
                postId={post._id}
              />

              <ReplySection
                announcementId={post._id}
              />

            </div>
          ))
        }

      </div>

    </div>

    </>
  )
}