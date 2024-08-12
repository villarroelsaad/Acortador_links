import { Outlet, useLocation } from 'react-router-dom'
import { NavBar } from './navBar'
import { Shortener } from './shortener'
export const Home = () => {
  const location = useLocation()
  return (
    <section className='flex'>

      <NavBar />
      <article className='flex justify-evenly w-full'>
        <Outlet />
        {location.pathname === '/home' && <Shortener />}

      </article>

    </section>
  )
}
