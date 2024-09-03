import { UserContext } from '../services/context'
import { useContext, useEffect, useState } from 'react'
import { GetLinks } from '../services/getLinks'
import { Delete } from '../services/delete'
export const Links = () => {
  const { user } = useContext(UserContext)
  const id = user.authUser.UserID

  const [links, setLinks] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchLinks = async () => {
      setError(null)

      try {
        const fetchedLinks = await GetLinks(id)
        setLinks(fetchedLinks)
      } catch (error) {
        console.error('Error fetching links:', error)
        setError(error.message || 'Ha ocurrido un error al obtener los enlaces.')
      }
    }

    if (id) {
      fetchLinks()
    }
  }, [id, links])

  const handleDelete = (id) => {
    const result = window.confirm('¿Estás seguro de que quieres eliminar este elemento?')
    if (result === true) {
      Delete(id)
    }
  }
  return (

    <section className=''>
      <h1 className='text-center font-semibold text-5xl mb-20  mt-20 text-slate-100 opacity-90'>Links</h1>
      <div className='flex flex-wrap justify-center w-full gap-10'>{links.map(url => (
        <li className=' list-none ' key={url.id}>
          <div className=' bg-zinc-900 w-auto border-2 border-zinc-800 text-center rounded-3xl'>
            <div className='flex flex-col p-5 '>
              <p className='text-slate-200  opacity-85 font-semibold'><span className='text-violet-500 opacity-90'>Url Original:</span><br /> {url.OldUrl}</p>
              <br />
              <p className='text-slate-200 opacity-85 font-semibold'><span className='text-violet-500 opacity-90'>Url Acortada:</span><br /> {url.ShortUrl}</p>
              <button
                onClick={() => handleDelete(url.id)}
                className='w-7 flex justify-center mt-2 self-end rounded-full bg-zinc-800 hover:opacity-70'
              >
                <img className='w-5 h-7 ' src='/delete.svg' alt='' />
              </button>
            </div>
          </div>
        </li>))}
      </div>
      {error && <p className='text-center  font-semibold text-violet-400'>Error: {error}</p>}
    </section>

  )
}
