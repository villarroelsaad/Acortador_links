import { Shortener } from './shortener'
export const Sorten = () => {
  return (
    <section className='flex justify-evenly items-center'>
      <Shortener />
      <div className='bg-slate-50 flex justify-center items-center flex-wrap h-60'>
        <img src='./buffer.svg' className='h-96 bg-back w-full mb-10' />
        <a href='/Login' className='bg-violet-500 text-slate-100  w-28 p-2 text-center rounded-lg font-semibold'>Iniciar sesion</a>
      </div>
    </section>
  )
}
