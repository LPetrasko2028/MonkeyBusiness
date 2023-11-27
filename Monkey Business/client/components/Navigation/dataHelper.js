export async function logout() {
  try {
    // Send an AJAX request to our movieBrowseJSON endpoint
    const response = await fetch('http://localhost:3000/api/logout')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    // Parse the response from JSON into an object and return it
    return await response.json()
  } catch (err) {
    // something went wrong so return an empty array
    console.error('Failed to retrieve array of stocks')
    console.error(err)
    return []
  }
}
