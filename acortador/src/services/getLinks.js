export const GetLinks = async (id) => {
  try {
    const response = await fetch(`http://localhost:1234/links/${id}`, {
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
    throw err // Re-lanza el error original
  }
}
