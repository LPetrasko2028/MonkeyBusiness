import random
import sys

quant = int(sys.argv[1])


def reccomendStocks(quant):

    russel1000=["A","AA","AAL","AAP","AAPL","ABBV","ABNB","ABT","ACGL","ACHC","ACI","ACM","ACN","ADBE","ADC","ADI","ADM","ADP","ADSK","ADT","AEE","AEP","AES","AFG","AFL","AFRM","AGCO","AGL","AGNC","AGO","AGR","AIG","AIRC","AIZ","AJG","AKAM","AL","ALB","ALGM","ALGN","ALK","ALL","ALLE","ALNY","ALSN","AM","AMAT","AMBP","AMC","AMCR","AMD","AME","AMED","AMG","AMGN","AMH","AMP","AMT","AMZN","AN","ANET","ANSS","AON","AOS","APA","APD","APH","APLS","APO","APP","APTV","AR","ARE","ARES","ARMK","ARW","ASH","ATO","ATR","AVB","AVGO","AVT","AVTR","AVY","AWI","AWK","AXON","AXP","AXS","AXTA","AYI","AYX","AZEK","AZO","AZPN","AZTA","BA","BAC","BAH"]
    list2=["BALL","BAX","BBWI","BBY","BC","BDX","BEN","BEPC","BERY","BF.A","BFAM","BF.B","BG","BHF","BIIB","BILL","BIO","BJ","BK","BKNG","BKR","BLD","BLDR","BLK","BMRN","BMY","BOKF","BPOP","BR","BRK.B","BRKR","BRO","BRX","BSX","BSY","BURL","BWA","BWXT","BX","BXP","BYD","C","CABE","CACC","CACI","CAG","CAH","CAR","CARR","CASY","CAT","CAVA","CB","CBOE","CBRE","CBSH","CC","CCCS","CCI","CCK","CCL","CDAY","CDNS","CDW","CE","CEG","CELH","CERT","CF","CFG","CFLT","CFR","CG","CGNX","CHD","CHDN","CHE","CHH","CHK","CHPT","CHRW","CHTR","CI","CIEN","CINF","CL","CLF","CLH","CLVT","CLX","CMA","CMCSA","CME","CMG","CMI","CMS","CNA","CNC","CNHI","CNM"]
    list3=["CNP","CNXC","COF","COHR","COIN","COLB","COLD","COLM","COO","COP","COR","COST","COTY","CPB","CPNG","CPRI","CPRT","CPT","CR","CRI","CRL","CRM","CROX","CRUS","CRWD","CSCO","CGSP","CSL","CSX","CTAS","CTLT","CTRA","CTSH","CTVA","CUBE","CUZ","CVS","CVX","CW","CWEN","CWE.A","CXT","CZR","D","DAL","DAR","DASH","DBX","DCI","DD","DDOG","DE","DECK","DFS","DG","DGX","DHI","DHR","DINO","DIS","DISH","DKNG","DKS","DLB","DLR","DLTR","DNA","DNB","DOCS","DOCU","DOV","DOW","DOX","DPZ","DRI","DRVN","DT","DTE","DTM","DUK","DV","DVA","DVN","DXC","DXC","DXCM","EA","EBAY","ECL","ED","EEFT","EFX","EG","EGP","EHC","ETX","EL","ELAN","ELS","ELV","EME"]
    list4=["EMN","EMR","ENOV","ENPH","ENTG","EOG","EPAM","EPR","EQH","EQIX","EQR","EQT","ES","ESAB","ESI","ESS","ESCT","ETN","ETR","ETSY","EVR","EVRG","EW","EWBC","EXAS","EXC","EXEL","EXP","EXPD","EXPE","EXR","F","FAF","FANG","FAST","FBIN","FCN","FCNCA","FCX","FDS","FE","FERG","FFIV","FHB","FI","FICO","FIS","FITB","FIVE","FLO","FLS","FLT","FMC","FNB","FND","FNF","FOUR","FOX","FOXA","FR","FRPT","FRT","FSLR","FTI","FTNT","FTRE","FTV","FWONA","FWONK","FYBR","G","GD","GDDY","GE","GEHC","GEN","GFS","GGG","GILD","GIS","GL","GLOB","GLPI","GLW","GM","GME","GMED","GNTX","GO","GOOG","GOOGL","GPC","GPK","GPN","GPS","GRMN"]
    list5=["GS","GTES","GTLB","GWRE","GWW","GXO","H","HAL","HAS","HAYW","HBAN","HCA","HCP","HD","HE","HEI","HEI.A","HES","HHH","HIG","HII","HIW","HLI","HLT","HOG","HOLX","HON","HOOD","HPE","HPQ","HR","HRB","HRL","HSIC","HST","HSY","HTZ","HUBB","HUBS","HUM","HUN","HWN","HXL","IAC","IART","IBKR","IBM","ICE","ICLR","ICUI","IDA","IDXX","IEX","IFF","IMLN","INCY","INFA","INGR","INSP","INTC","INTU","INVH","IONS","IP","IPG","IPGP","IQV","IR","IRDM","IRM","ISRG","IT","ITT","ITW","IVZ","J","JAZZ","JHBT","JBL","JCI","JEF","JHG","JKHY","JLL","JNJ","JNPR","JPM","JWN","K","KBR","KD","KDP","KEX","KEY","KEYS","KHC","KIM","KKR","KLAC","KLG"]
    list6=["KMB","KMI","KMPR","KMX","KNSL","KNX","KO","KR","KRC","KRTX","KSS","KVUE","L","LAD","LAMR","LAZ","LBRDA","LBRDK","LCID","LDOS","LEA","LECO","LEG","LEN","LEN.B","LFUS","LH","LHX","LII","LIN","LKQ","LLY","LLYVA","LLYVK","LMT","LNC","LNG","LNT","LOPE","LOW","LPLA","LPX","LRCX","LSCC","LSTR","LSXMA","LSXMK","LULU","LUV","LVS","LW","LYB","LYFT","LYV","M","MA","MAA","MAN","MANH","MAR","MAS","MASI","MAT","MCD","MCHP","MCK","MCO","MCW","MDB","MDLZ","MDT","MDU","MEDP","MET","META","MGM","MHK","MIDD","MKC","MKL","MKSI","MKTX","MLM","MMC","MMM","MNST","MO","MOH","MORN","MOS","MP","MPC","MPW","MPWR","MRCY","MRK","MRNA","MRO","MRTX"]
    list7=["MRVI","MRVL","MS","MSA","MSCI","MSFT","MSGS","MSI","MSM","MTB","MTCH","MTD","MTG","MTN","MTZ","MU","MUSA","NATL","NBIX","NCLH","NCNO","NDAQ","NDSN","NEE","NEM","NET","NEU","NFE","NFG","NFLX","NI","NKE","NLOP","NLY","NNN","NOC","NOV","NOW","NRG","NSA","NSC","NTAP","NTNX","NTRA","NTRS","NU","NUE","NVCR","NVDA","NVR","NVST","NVT","NWL","NWS","NWSA","NXST","O","OC","ODFL","OGE","OGN","OHI","OKE","OKTA","OLED","OLLI","OLN","OLPX","OMC","OMF","ON","ORCL","ORI","ORLY","OSK","OTIS","OVV","OWL","OXY","OZK","PAG","PANW","PARA","PARAA","PATH","PAYC","PAYX","PB","PCAR","PCG","PCOR","PCTY","PEAK","PEG","PEGA","PEN","PENN","PEP"]
    list8=["PFE","PFG","PFGC","PG","PGR","PH","PHIN","PHM","PII","PINC","PINS","PK","PKG","PLD","PLNT","PLTK","PLTR","PLUG","PM","PNC","PNFP","PNR","PNW","PODD","POOL","POST","PPC","PPG","PPL","PRGO","PRI","PRU","PSA","PSTG","PSX","PTC","PTON","PVH","PWR","PXD","PYCR","PYPL","QCOM","QDEL","QGEN","QRVO","QS","R","RARE","RBA","RBC","RBLX","RCL","RCM","REG","REGN","REXR","REYN","RF","RGA","RGEN","RGLD","RH","RHI","RITM","RIVN","RJF","RKT","RL","RLI","RMD","RNG","RNR","ROIV","ROK","ROKU","ROL","ROP","ROST","RPM","RPRX","RRC","RRX","RS","RSG","RTX","RUN","RVTY","RYAN","RYN","S","SAIA","SAIC","SAM","SBAC","SBUX","SCCO","SCHW","SCI","SEB"]
    list9=["SEE","SEIC","SF","SGEN","SHC","SHW","SIRI","SITE","SJM","SKX","SLB","SLGN","SLM","SMAR","SMG","SNA","SNDR","SNOW","SNPS","SNV","SNX","SO","SOFI","SON","SPB","SPG","SPGI","SPLK","SPOT","SPR","SQ","SRC","SRCL","SRE","SRPT","SSNC","SSRM","ST","STAG","STE","STLD","STT","STWD","STZ","SUI","SWAV","SWK","SWKS","SWN","SYF","SYK","SYY","T","TAP","TDC","TDG","TDOC","TDY","TEAM","TECH","TER","TFC","TFSL","TFX","TGT","THC","THG","THO","TJX","TKO","TKR","TMO","TMUS","TNDM","TNL","TOL","TOST","TPG","TPL","TPR","TPX","TREX","TRGP","TRIP","TRMB","TROW","TRU","TRV","TSCO","TSLA","TSN","TT","TTC","TTD","TTEK","TTWO","TW","TWLO","TXG","TXN"]
    list10=["TXRH","TXT","TYL","U","UA","UAA","UAL","UBER","UDR","UGI","UHAL","UHA.B","UHS","UI","ULTA","UNH","UNM","UNP","UPS","URI","USB","USFD","UTHR","UWMC","V","VAC","VEEV","VFC","VICI","VIRT","VLO","VLTO","VMC","VMI","VNO","VNT","VOYA","VRSK","VRSN","VRT","VRTX","VSAT","VSCO","VST","VSTS","VTR","VTRS","VVV","VYX","VZ","W","WAB","WAL","WAT","WBA","WBD","WBS","WCC","WDAY","WDC","WEC","WELL","WEN","WEX","WFC","WH","WHR","WING","WLK","WM","WMB","WMS","WMT","WOLF","WOOF","WPC","WRB","WRK","WSC","WSM","WSO","WST","WTFC","WTM","WTRG","WTW","WU","WWD","WY","WYNN","X","XEL","XOM","XP","XPO","XRAY","XYL","YETI","YUM","Z","ZBH","ZBRA","ZG","ZI","ZION","ZM","ZS","ZTS"]

    russel1000+=list2+list3+list4+list5+list6+list7+list8+list9+list10

    
    russel100=["AAPL","MSFT","GOOG","GOOGL","AMZN","NVDA","TSLA","META","V","JPM","UNH","XOM","LLY","WMT","JNJ","AVGO","PG","HD","ORCL","CVX","MRK","KO","PEP","COST","ABBV","COST","ABBV","ABDE","BAC","CRM","MCD","CSCO","PFE","TMO","ACN","NFLX","ABT","LIN","AMD","DHR","CMCSA","MKE","TMUS","DIS","WFC","TXN","UPS","PM","NEE","MS","RTX","QCOM","COP","SPGI","HON","INTU","LOW","INTC","VZ","BA","BMY","CAT","AXP","UNP","IBM","GE","DE","LMT","MDT","AMGN","SBUX","ISRG","AMAT","NOW","PLD","SYK","T","GS","BLK","SCHW","BKNG","ADI","ELV","MDLZ","TJX","GILD","ADP","MMC","CVS","AMT","UBER","LRCX","SLB","CI","MO","HCA","ETN","PYPL"]
    # print(russel)

    
    input=russel100 #change THIS variable to switch to the 1000 mode
    output=[]
    if (isinstance(quant, int)):
        if (quant>=len(input)):
            quant=len(input)-1
        if (quant>=100):
            quant=100
        if (quant<=0):
            quant=0
    else:
        quant=0
    # i=0
    while(len(output)<quant):
        temp=random.randint(0,len(input)-1)
        if (input[temp] not in output):
            output.append(input[temp])
            # i+=1
    return output

print(reccomendStocks(quant))
