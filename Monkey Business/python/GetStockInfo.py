import yfinance as yf
import sys  # added after
names = sys.argv[1]  # added after pass in an array of stock names
#when given  the stock name, returns:
#stock name, current price, the high for the day, the volume, and the percent change for the day
def getStockInfo(names):
    stockArray=[]  # added after
    for name in names:  # added after
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
    return stockArray

print(getStockInfo(names))  # added after
#print(getStockInfo(names)) # added after
