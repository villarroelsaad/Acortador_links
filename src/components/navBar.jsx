import { useState } from 'react'
import { LogOut } from '../services/logOut'
import { Link, useNavigate } from 'react-router-dom'

export const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false)

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

    <section className='fixed left-0 top-0 bottom-0 z-50 flex justify-between border-r-2 border-zinc-800  bg-zinc-950 text-slate-200'>
      <button onClick={toggleMenu} className='absolute w-10 top-4 left-5'>
        <img src={` ${isOpen ? '/close.svg' : '/menu.svg'}`} className='w-8 h-8 ' alt='menu' />
      </button>
      <nav className={`flex flex-col mt-20 h-full overflow-y-auto transition-all ${isOpen ? 'w-56' : 'w-0'}`}>
        <Link to='/home' className='flex items-center m-2 gap-4 rounded-lg text-sm font-semibold text-slate-200  opacity-80 p-3 hover:bg-zinc-900'> <img className='w-6 ' src='/scissors.svg' />Acortar</Link>
        <Link to='home/links' className='flex items-center m-2 gap-4 rounded-lg text-sm font-semibold text-slate-200  opacity-80 p-3 hover:bg-zinc-900'> <img className='w-6  ' src='/link.svg' />Links</Link>
        <a onClick={() => handleLogout()} href='/' className='flex items-center m-2 gap-4 rounded-lg text-sm font-semibold text-slate-200  opacity-80 p-3 hover:bg-zinc-900'> <img className='w-6 ' src='/logout.svg' />Cerrar Sesion</a>
      </nav>
    </section>
  )
}
