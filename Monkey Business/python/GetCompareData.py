import yfinance as yf
import sys

stockArr = sys.argv[1].split(',')
#print(stockArr)
#stockArr = [ 'AMZN', 'MSFT' ]

def getCompareData(arr):
    finalStockArr = []
    for name in arr:
        ticker = yf.Ticker(name)
        #print(ticker)
        output = []

        # may need other info about stocks (percentage change) -----TO DO-----
        output.append(name)
        #output.append(ticker.fast_info['yield'])
        output.append(ticker.fast_info['lastPrice'])
        #output.append((ticker.fast_info['dividendRate']))

        finalStockArr.append(output)
    return finalStockArr
print(getCompareData(stockArr))
