/**
 * Asynchronously retrieve the movies from our data endpoint and return them as an array
 * @returns {Promise} Resolves to an array of movies on success or an empty array on failure
 */
export async function retrieveStocks () {
  try {
    // Send an AJAX request to our movieBrowseJSON endpoint
    const response = await fetch('http://localhost:3000/api/stocksTemp')
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
export async function retrieveStockDetail (stock) {
  try {
    // Send an AJAX request to our movieBrowseJSON endpoint
    const response = await fetch('http://localhost:3000/api/stocksDetail/', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stock)
    })
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
