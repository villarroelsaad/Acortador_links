import { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FLogin } from '../services/Login'
import { UserContext } from '../services/context'
export const Login = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [error, SetError] = useState('')

  const { setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await FLogin(userName, password)
      setUser(user)
      setUserName('')
      setPassword('')
      console.log(user.authUser.Username)
      return navigate('/home')
    } catch (err) {
      SetError(err.message)
      setUserName('')
      setPassword('')
    }
  }
  return (
    <form onSubmit={handleSubmit}>
      <section className='flex justify-center  items-center '>
        <div className='bg-zinc-900 flex flex-col border-2 border-zinc-800 mt-44 rounded-lg p-10 w-96'>
          <h1 className='font-semibold opacity-90 text-3xl mb-8 text-slate-100 text-center'>Ingresar</h1>
          <p className=' opacity-85 text-base text-slate-200 '>Usuario</p>
          <input value={userName} onChange={e => { setUserName(e.target.value) }} required type='text' className='mb-5 opacity-85 rounded-md bg-transparent border-2 border-zinc-500 outline-none text-slate-200 p-2 focus:border-violet-400 transition-all' />
          <p className='text-slate-200 opacity-85 text-base   '>Password</p>
          <input value={password} onChange={e => { setPassword(e.target.value) }} required type='password' className='p-2 opacity-85 bg-transparent border-2 border-zinc-500 outline-none rounded-md text-slate-200 focus:border-violet-400 transition-all' />
          <div className='flex mt-1 justify-between'>
            <Link to='../register' className='text-slate-200 opacity-75  text-sm hover:text-violet-400'>Registrarse</Link>
            <Link to='../' className='text-slate-200 opacity-75 text-end text-sm hover:text-violet-400'>Inicio</Link>
          </div>
          <button type='submit' className='bg-violet-500 bg-opacity-90 text-slate-200 mt-7 w-28 p-2 self-center text-center rounded-lg font-semibold active:opacity-85 transition-all'>Iniciar sesion</button>
          {error && <p className='text-center mt-6 font-semibold text-violet-400'>Error: {error}</p>}
        </div>
      </section>
    </form>
  )
}
