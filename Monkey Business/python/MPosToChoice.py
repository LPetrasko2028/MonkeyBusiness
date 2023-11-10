import yfinance as yf
import random
import sys

#This file is the function that takes the monkey tracking input value "X" position and translate that to the stock choice.

# inputList= sys.argv[1]
inputList=['AMZN', 'MSFT', 'AAPL', 'GOOG']
# quantity= sys.argv[2]
quantity = 2
X= sys.argv[1]
# X= random.randint(1080)
screenWidth= sys.argv[2]
# screenWidth=1080

#This function takes in a list of stocks from the user, and displays a subset of them for the monkeyChoice to choose between
#inputList, list[string], a list of stock shortnames such as "AMZN" or "MSFT", if this value is zero the function will return an error
#quantity, int, the number of stocks the monkey is to choose between, if this value is greater than the input list, the function will return an error
#this function returns a list of stock shortnames, culled to the quan tity specified, randomly
def choicePicker(inputList, quantity):
    output=[]
    if(len(inputList)<=0):
        output="error, input stock list non-positive"
        return output
    if (quantity<=0):
        output=["error, non-positive request size"]
        return output
    if (len(inputList)<quantity):
        output = ["error, input list too small to handle request"]
        return output
    while len(output)<quantity:
        #print(quantity)
        r=random.choice(inputList)
        #print(r)
        if r not in output:
            output.append(r)
            #print(output)
    return output

#this function is the actual monkey choice function
#inputList, list[string], a list of stock shortnames, such as "AMZN" or "MSFT"
#x, double, the x-position of the monkey on-screen
#screenwidth, int, the width of the screen upon which the monkey is being tracked

def monkeyChoice(inputList,X,screenWidth):
    choice=0
    for i in range(len(inputList)):
        if X > i*screenWidth/len(inputList) and X <= (i+1)*screenWidth/len(inputList):
            choice=i
    return inputList[choice]


print(monkeyChoice(choicePicker(inputList,quantity),X,screenWidth))


#TESTING
# listA = ["A"]
# listB = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
# listC = []
# listD = []
# blah = ""
# for i in range(len(listB)):
#         for j in range(len(listB)):
#             for k in range(len(listB)):
#                 blah=""
#                 blah=blah+listB[i]+listB[j]+listB[k]
#                 listD.append(blah)
# choiceList=choicePicker(listB,3)
# print(choiceList)
# print(monkeyChoice(choiceList,30.5,1080))
#print(listD)
