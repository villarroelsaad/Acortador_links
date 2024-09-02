import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './navBar'
import { Shortener } from './shortener'
import { UserContext } from '../services/context'
import { useContext } from 'react'

export const Home = () => {
  const location = useLocation()
  const { user } = useContext(UserContext)
  return (
    <section className='flex w-full flex-wrap'>
      <p className='text-slate-200  w-full opacity-85 text-base self-end text-end'>Bienvenido {user.authUser.Username}</p>
      <div className='w-1/4'>
        <NavBar />
      </div>

      <article className='flex justify-center w-3/4'>
        <Outlet />
        {location.pathname === '/home' && <Shortener />}

      </article>

    </section>
  )
}
