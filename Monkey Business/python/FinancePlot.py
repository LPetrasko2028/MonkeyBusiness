import numpy as np
import pandas as pd
import matplotlib as plt
import yfinance as yf
import plotly.express as px
import datapane as dp
import seaborn as sns
#Pulling Tesla stokc price data using Tesla ticker TSLA and store it under tsla
tsla = yf.download('TSLA', period='MAX', interval='1d')

tsla_price_chart = px.line(tsla['Close'], 
                           title='Tesla Daily Close Price', 
                           color_discrete_map={'Close':'green'}, 
                           width=800, height=800)
tsla_price_chart.show()

gme = yf.download('GME', period='1y', interval='1d')

gme_price_chart = px.line(gme['Open'], 
                           title='Gamestop Daily Close Price', 
                           color_discrete_map={'Close':'green'}, 
                           width=800, height=300)
gme_price_chart.show()