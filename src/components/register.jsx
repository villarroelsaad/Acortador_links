import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FRegister } from '../services/register'
export const Register = () => {
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [error, SetError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const register = await FRegister(userName, email, password)

      if (register) {
        setUserName('')
        setPassword('')
        setEmail('')
        console.log(register)
        return navigate('/login')
      }
    } catch (err) {
      SetError(err.message)
      setUserName('')
      setPassword('')
      setEmail('')
    }
  }

  return (

    <form onSubmit={handleSubmit} action=''>
      <section className='flex items-center justify-center mt-44  flex-wrap '>
        <div className='bg-zinc-900 flex flex-col rounded-lg p-10 w-96'>
          <h1 className='font-semibold opacity-95  text-3xl mb-8 text-slate-100 text-center'>Registrarse</h1>
          <p className=' opacity-85 text-base text-slate-100 '>Usuario</p>
          <input value={userName} onChange={e => { setUserName(e.target.value) }} required type='text' className='mb-5 opacity-95  rounded-md bg-transparent border border-slate-200 outline-none text-slate-200 p-2 focus:border-violet-400 transition-all' />
          <p className=' opacity-85 text-base text-slate-100 '>Email</p>
          <input value={email} onChange={e => { setEmail(e.target.value) }} required type='text' className='mb-5 opacity-95  rounded-md bg-transparent border border-slate-200 outline-none text-slate-200 p-2 focus:border-violet-400 transition-all' />
          <p className='text-slate-100 opacity-85text-base   '>Password</p>
          <input value={password} onChange={e => { setPassword(e.target.value) }} required type='password' className='p-2 opacity-95  bg-transparent border outline-none rounded-md text-slate-200 border-slate-200 focus:border-violet-400 transition-all' />
          <div className='flex justify-between'>
            <Link to='../login' className='text-slate-100 opacity-85 text-sm hover:text-violet-400'>Ingresar</Link>
            <Link to='../' className='text-slate-100 opacity-85 text-end text-sm hover:text-violet-400' href='./'>Inicio</Link>
          </div>
          <button type='submit' className='bg-violet-500 text-slate-50 w-28 p-2 self-center text-center mt-7 rounded-lg font-semibold active:opacity-85 transition-all'>Registrarse</button>
          {error && <p className='text-center mt-6 font-semibold text-violet-400'>Error: {error}</p>}
        </div>

      </section>
    </form>
  )
}
