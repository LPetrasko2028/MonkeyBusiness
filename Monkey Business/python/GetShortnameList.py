import yfinance as yf
import json
import urllib
import sys  # added after

# query = sys.argv[1] # added after
# startRange = int(sys.argv[2]) # added after
# endRange = int(sys.argv[3]) # added after

query = "msft"
startRange = 0
endRange = 7



#query: string, the search term
#startRange: int, the earliest value to display, typical value is 0
#endrange: int, the final value to display, to to restrictions with yahoo finance search, the maximum value is 7
def getShortnameList(query, startRange, endRange):
    if (endRange<startRange):
        return "Error, invalid inputs, end < start"
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={query}')
    content = response.read()
    output=[]
    for i in range(startRange, endRange):
        data = json.loads(content.decode('utf8'))['quotes'][i]['shortname']
        output.append(data)
    return output
print(getShortnameList(query, startRange, endRange)) # added after
