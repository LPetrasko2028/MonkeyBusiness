import yfinance as yf
import random
import sys  # added after
# import GetClosingPriceList as g

input= sys.argv[1]


#input: list[string], the list of stock shortnames such as "AMZN" or "MSFT"
def getPortfolio(input):
    if len(input<=0):
        input=['AMZN', 'MSFT', 'AAPL', 'GOOG']
    pricelist=[]
    for i in range(len(input)):
        name=input[i]
        stock=yf.Ticker(name)
        pricelist.append(stock.fast_info['lastPrice'])
    stocklist2=[]
    pricelist2 = []
    temp=0
    lengthThing=len(input)
    for i in range(lengthThing):
        temp=pricelist.index(max(pricelist))
        stocklist2.append(input[temp])
        pricelist2.append(pricelist[temp])
        pricelist.remove(pricelist[temp])
        input.remove(input[temp])
    return [stocklist2,pricelist2]
# input=[]
print(getPortfolio(input))

# testlist=['AMZN', 'MSFT', 'AAPL', 'GOOG']
# print(getPortfolio(testlist))

    