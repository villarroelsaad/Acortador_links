export const Delete = async (id) => {
  try {
    const response = await fetch(`https://acortador-links-api.vercel.app/delete/${id}`, {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json'
      }
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar enlace: ${response.statusText}`)
    }

    return true
  } catch (err) {
    console.error('Erroel al eliminar el enlace:', err)
    throw err
  }
}
