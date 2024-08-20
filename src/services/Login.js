export const FLogin = async (username, password) => {
  try {
    const response = await fetch('https://acortador-links-api.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Something went wrong')
    }

    const user = await response.json()
    return user
  } catch (err) {
    console.error('Fetch error:', err)
    throw new Error('Usuario o contraseña incorecto')
  }
}
