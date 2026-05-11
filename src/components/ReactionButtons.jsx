import api from '../services/api'

export default function ReactionButtons({
  postId,
}) {

  const react =
    async (reaction) => {

      try {

        const token =
          localStorage.getItem('token')

        await api.post(

          '/announcement/react',

          {
            targetId: postId,
            targetType: 'POST',
            reaction,
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        )

        alert('Reaction updated')

      } catch (error) {

        console.log(error)
      }
  }



  return (

    <div className='flex gap-4 mb-4'>

      <button
        onClick={() =>
          react('LOVE')
        }
        className='bg-pink-500 text-white px-3 py-1 rounded'
      >
        ❤️ Love
      </button>


      <button
        onClick={() =>
          react('KNOWLEDGE')
        }
        className='bg-yellow-500 text-white px-3 py-1 rounded'
      >
        💡 Knowledge
      </button>

    </div>
  )
}