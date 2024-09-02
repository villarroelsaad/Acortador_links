import { Shortener } from './shortener'
export const Sorten = () => {
  return (
    <section className='flex flex-wrap flex-col'>
      <Shortener />
      <a href='/Login' className='bg-violet-500 self-center mt-14 text-slate-200 bg-opacity-90 w-28 p-2 text-center rounded-lg font-semibold'>Iniciar sesion</a>
    </section>
  )
}
