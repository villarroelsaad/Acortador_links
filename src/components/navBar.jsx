import { useState } from 'react'
import { LogOut } from '../services/logOut'
import { Link, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(true)

  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleLogout = async () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      try {
        await LogOut()
        navigate('/login')
      } catch (error) {
        console.error('Error al cerrar sesión:', error)
      }
    }
  }
  return (

    <section className='fixed left-0 top-0 bottom-0 z-50 flex flex-col bg-zinc-950 text-white'>
      <button onClick={toggleMenu} className='absolute top-5 left-5'>
        <svg width='30px' height='25px' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' stroke='#ffffff'>
          <g id='SVGRepo_bgCarrier' strokeWidth='0' />
          <g id='SVGRepo_tracerCarrier' strokeLinecap='round' strokeLinejoin='round' />
          <g id='SVGRepo_iconCarrier'> <path d='M4 6H20M4 12H14M4 18H9' stroke='#ffffff' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' /> </g>
        </svg>
      </button>
      <nav className={`flex flex-col mt-20 h-full overflow-y-auto transition-all ${isOpen ? 'w-56' : 'w-0'}`}>
        <Link to='/home' className='flex items-center m-2 gap-4 rounded-lg text-sm font-semibold text-slate-200  opacity-80 p-3 hover:bg-zinc-900'> <img className='w-6 ' src='./github.svg' />Acortar</Link>
        <Link to='home/links' className='flex items-center m-2 gap-4 rounded-lg text-sm font-semibold text-slate-200  opacity-80 p-3 hover:bg-zinc-900'> <img className='w-6  ' src='./github.svg' />Links</Link>
        <a onClick={() => handleLogout()} href='/' className='flex items-center m-2 gap-4 rounded-lg text-sm font-semibold text-slate-200  opacity-80 p-3 hover:bg-zinc-900'> <img className='w-6 ' src='./github.svg' />Cerrar Sesion</a>
      </nav>
    </section>
  )
}
