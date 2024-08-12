export const ShortenUrl = async (url, id) => {
  try {
    const response = await fetch('http://localhost:1234/url/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ url, id })
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.error || 'Something went wrong')
    }

    const data = await response.json()
    const shorten = (data.shortUrl)
    return shorten
  } catch (err) {
    console.error('Fetch error:', err)
    throw new Error('Failed to shorten URL')
  }
}
