import yfinance as yf
import random
import GetClosingPriceList as g

#input: the shortname of the stock
def getPortfolio(input):
    pricelist=[]
    for i in range(len(input)):
        name=input[i]
        stock=yf.Ticker(name)
        pricelist.append(stock.info['currentPrice'])
    stocklist2=[]
    pricelist2 = []
    temp=0
    lengthThing=len(input)
    for i in range(lengthThing):
        temp=pricelist.index(max(pricelist))
        stocklist2.append(input[temp])
        pricelist2.append(pricelist[temp])
        input.remove(input[temp])
        pricelist.remove(input[temp])
    return [stocklist2,pricelist2]

testlist=['AMZN', 'MSFT', 'AAPL', 'GOOG']
print(getPortfolio(testlist))

    