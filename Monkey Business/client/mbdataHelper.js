export async function searchStockAPI (stockName, stockPageObj) { // Search for stock by name
  try {
    const response = await fetch(`http://localhost:3000/api/stocks/${stockName}`, {
      body: JSON.stringify(stockPageObj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve stock details')
    console.error(err)
    return null
  }
}
/* stockPageObj is **OPTIONAL** and informs the API of the range of stocks to return
Example of stockPageObj to display the first 5 stocks (page 1):
{
  "start": 0,
  "end": 5
}
*/
export async function retrieveInvestorStocks () { // Failed Authentication should result in a redirect to a landing page or login page
  try {
    const response = await fetch('http://localhost:3000/api/stocks')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve array of stocks')
    console.error(err)
    return []
  }
}

export async function retrieveStockDetails (stockSymbol) { // Examples of stockSymbol: 'GME', 'AMC', 'TSLA', 'AAPL', 'GOOG', 'MSFT', 'AMZN'
  try {
    const response = await fetch(`http://localhost:3000/api/stockDetails/${stockSymbol}`)
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve stock details')
    console.error(err)
    return null
  }
}

export async function postBuySellStock (stockObj) { // add stock to profile
  try {
    const response = await fetch('http://localhost:3000/api/stockChange', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(stockObj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to Buy/Sell Stock')
    console.error(err)
    return false
  }
}
/* stockObj is required and informs the API of the stock to add to the profile
Example of stockObj:
{
  "stockName": "AMZN",
  "stockPrice": 123.45,
  "changeAmount": 1,
  "changeType": "buy"
}
{
  "stockName": "AMZN",
  "stockPrice": 123.45,
  "changeAmount": 1,
  "changeType": "sell"
}
*/

export async function login (username, password) {
  try {
    const response = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to login')
    console.error(err)
    return false
  }
}

export async function signUp (username, password, passwordConfirm, email) {
  try {
    const response = await fetch('http://localhost:3000/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password, passwordConfirm, email })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to sign up')
    console.error(err)
    return false
  }
}

export async function deleteAccount (username) { // Input of password instead ---TO DO---
  try {
    const response = await fetch(`http://localhost:3000/api/account/${username}`, {
      method: 'DELETE'
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to remove stock')
    console.error(err)
    return false
  }
}

export async function resetPassword (accessKey, username, password, confirmPassword) {
  try {
    const response = await fetch('http://localhost:3000/api/resetPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ accessKey, username, password, confirmPassword })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to reset password')
    console.error(err)
    return false
  }
}
export async function forgotPassword (username, email) {
  try {
    const response = await fetch('http://localhost:3000/api/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email })
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to reset password')
    console.error(err)
    return false
  }
}

export async function updatePreferences (preferencesObj) {
  try {
    const response = await fetch('http://localhost:3000/api/preferences', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(preferencesObj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to update preferences')
    console.error(err)
    return false
  }
}

export async function retrievePreferences () {
  try {
    const response = await fetch('http://localhost:3000/api/preferences')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve preferences')
    console.error(err)
    return null
  }
}

export async function getUser () {
  try {
    const response = await fetch('http://localhost:3000/api/user')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return await response.json()
  } catch (err) {
    console.error('Failed to retrieve user')
    console.error(err)
    return null
  }
}

export async function getMonkeyInvestments () {
  try {
    const response = await fetch('http://localhost:3000/api/monkey')
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return response //await response.json()
  } catch (err) {
    console.error('Failed to retrieve monkey investments')
    console.error(err)
    return null
  }
}

export async function updateMonkeyInvestment (monkeyObj) {
  try {
    const response = await fetch('http://localhost:3000/api/monkey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(monkeyObj)
    })
    if (response.status >= 400) {
      throw new Error(`Request failed with response code ${response.status}`)
    }
    return true
  } catch (err) {
    console.error('Failed to update monkey investments')
    console.error(err)
    return false
  }
}
