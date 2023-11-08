import yfinance as yf
import random



def choicePicker(inputList, quantity):
    output=[]
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

def monkeyChoice(inputList,X,screenWidth):
    choice=0
    for i in range(len(inputList)):
        if X > i*screenWidth/len(inputList) and X <= (i+1)*screenWidth/len(inputList):
            choice=i
    return inputList[choice]


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


# choiceList=choicePicker(listD,300)
# print(choiceList)
# print(monkeyChoice(choiceList,400,1080))
#print(listD)
