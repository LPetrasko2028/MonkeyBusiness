import yfinance as yf
import json
import urllib
import sys  # added after

query = sys.argv[1] # added after
startRange = int(sys.argv[2]) # added after
endRange = int(sys.argv[3]) # added after

def stockSearchList(query, startRange, endRange):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={query}')
    content = response.read()
    data = json.loads(content.decode('utf8'))['quotes']
    data = list(filter(lambda x: x['quoteType'] == "EQUITY", data))
    print(type(data))
    output=[]
    for i in range(startRange, endRange if endRange < len(data) else len(data)):
      temp = []
      print(type(data[i]))
      temp.append(data[i]['symbol'])
      temp.append(data[i]['shortname'])
      temp.append(data[i]['quoteType'] if 'quoteType' in data[i] else "Could not find quote type")
      temp.append(data[i]['industry'] if 'industry' in data[i] else "Could not find industry")
      temp.append(data[i]['score'] if 'score' in data[i] else "Could not find score")
      output.append(temp)
    return output

print(stockSearchList(query, startRange, endRange)) # added after
