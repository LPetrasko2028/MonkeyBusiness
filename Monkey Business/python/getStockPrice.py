import sys
import yfinance as yf
ticker = sys.argv[1] if len(sys.argv) > 0 else "SPY"

def get_stock_price(ticker):
  stock = yf.Ticker(ticker)
  price = stock.fast_info['lastPrice']
  return price
if (type(ticker) is not str):
  print("error")
else:
  print(get_stock_price(ticker))
  #print(ticker)
