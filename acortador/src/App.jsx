import { Nav } from './components/nav'
import { Sorten } from './components/sorten'
import { Outlet, useLocation } from 'react-router-dom'
function App () {
  const location = useLocation()
  return (
    <>
      <main className=''>
        <header className='flex justify-end w-full bg-zinc-950 items-center'>
          <Nav />
        </header>
        <Outlet />
        {location.pathname === '/' && <Sorten />}

      </main>
    </>
  )
}

export default App
