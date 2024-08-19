export const FRegister = async (username, email, password) => {
  try {
    const response = await fetch('https://acortador-links-api.vercel.app/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Something went wrong')
    }

    const id = await response.json()
    return id
  } catch (err) {
    console.error('Fetch error:', err)
    throw new Error('error')
  }
}
