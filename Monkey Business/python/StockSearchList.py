import yfinance as yf
import json
import urllib
import sys   

# query = sys.argv[1] # added after
query = "microsoft"
# startRange = int(sys.argv[2]) # added after
startRange = 0
# endRange = int(sys.argv[3]) # added after
endRange = 7

#This function intakes a search query and returns with the search results
#query, string, the search term
#startRange, the first values to be shown also known as the top result, typically this value is zero
#endrange, the final value to display, due to restrictions with finance.yahoo, the maximum value for this input is 7 
def stockSearchList(query, startRange, endRange):
    response = urllib.request.urlopen(f'https://query2.finance.yahoo.com/v1/finance/search?q={query}')
    content = response.read()
    output=[]
    for i in range(startRange, endRange):
        data = json.loads(content.decode('utf8'))['quotes'][i]['symbol']
        output.append(data)
    return output

print(stockSearchList(query, startRange, endRange)) # added after
