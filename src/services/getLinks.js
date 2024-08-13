export const GetLinks = async (id) => {
  try {
    const response = await fetch(`https://acortador-links-api.vercel.app/links/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json' // Opcional
      }
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || `Error fetching links: ${response.statusText}`)
    }

    const links = await response.json()
    return links
  } catch (err) {
    console.error('Fetch error:', err)
    throw err
  }
}
