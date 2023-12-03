import yfinance as yf
import json
import urllib
import sys  # added after

names = ["AMZN", "AAPL", "AMZN.NE"]
#when given  the stock name, returns:
#stock name, current price, the high for the day, the volume, and the percent change for the day
def getStockInfo(names):
    stockArray=[]  # added after
    for name in names:  # added after
      try:
        output=[]
        stock=yf.Ticker(name)
        output.append(name)
        #output.append(stock.info)
        output.append(stock.fast_info['lastPrice'])
        # output.append(stock.info['regularMarketDayHigh'])
        output.append(stock.fast_info['lastVolume'])
        output.append((stock.fast_info['lastPrice']/stock.fast_info['regularMarketPreviousClose'])-1)
        output.append(stock.fast_info['marketCap'])
        # output.append((1-stock.info['currentPrice']/stock.info['regularMarketPreviousClose'])*100)

        stockArray.append(output)  # added after
      except:
        print("error with " + name)

    return stockArray
if(type(names) is list):
  try:
    print(getStockInfo(names))
  except:
    print(f"error")


query = "amz" # added after
startRange = 0 # added after
endRange = 5 # added after

def stockSearchList(query, startRange, endRange):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={query}')
    content = response.read()
    data = json.loads(content.decode('utf8'))['quotes']
    output=[]
    for i in range(startRange, endRange):
        if data[i]['quoteType'] == "EQUITY":
          output.append(data[i]['symbol'])
    return output

print(stockSearchList(query, startRange, endRange)) # added after
