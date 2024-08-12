import { useState, useContext } from 'react'
import { ShortenUrl } from '../services/shortener'
import { UserContext } from '../services/context'

export const Shortener = () => {
  const [url, setUrl] = useState('')
  const [shortenedUrl, setShortenedUrl] = useState('')
  const [error, SetError] = useState('')

  const { user } = useContext(UserContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (user) {
        const id = user.authUser.UserID
        const shortUrl = await ShortenUrl(url, id)
        setShortenedUrl(shortUrl)
      } else {
        const shortUrl = await ShortenUrl(url)
        setShortenedUrl(shortUrl)
      }
    } catch (err) {
      SetError(err.message)
      setShortenedUrl('')
    }
  }

  return (

    <form onSubmit={handleSubmit}>
      <section className='flex h-96 items-center justify-evenly flex-wrap'>
        <div className='mt-36'>
          <h1 className='mb-6 opacity-95 text-slate-200 text-5xl p-10 font-bold text-center'>Acortador de Links</h1>
          <div className='flex justify-center flex-wrap mb-6'>
            <input
              value={url}
              onChange={e => { setUrl(e.target.value) }} required
              className='h-10 p-3 w-96 text-slate-200 opacity-90 font-semibolda transition-all bg-zinc-900 rounded-s-lg outline-none focus:border-2 border-violet-500' type='text' placeholder='Ingrese la url'
            />
            <button type='submit' className=' font-semibold p-2 rounded-e-lg bg-violet-500 text-slate-100  text-center  active:opacity-85 transition-all'>Acortar</button>
          </div>
          <div className='flex justify-center'>
            <div>
              <p className='bg-zinc-900 text-slate-200 opacity-90 mb-8 text-center p-1 h-10 w-56 rounded-lg font-semibold'>
                {shortenedUrl}
              </p>
              {error && <p className='text-center  font-semibold text-violet-400'>Error: {error}</p>}
            </div>
          </div>
        </div>
      </section>
    </form>
  )
}
