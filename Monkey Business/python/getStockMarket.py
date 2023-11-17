import yfinance as yf
import sys

start = int(sys.argv[0]) if len(sys.argv) > 0 else 0
end = int(sys.argv[1]) if len(sys.argv) > 0 else 10

def getStockMarket(start, end):
    data = yf.download("SPY", start=start, end=end)
    data2 = yf

    return data



getStockMarket(start, end)
