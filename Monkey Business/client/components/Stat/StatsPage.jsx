import React from 'react';
import LinePlot from './LinePlot.jsx';
import StockChart from './StockChart.jsx';

function StatsPage() {
  return (
    <div>
      <div>
        <h1>Stats Page</h1>
      </div>

      <div>
        <p>this is a circle</p>
        
        <StockChart stockName={"AAPL"} months={4}></StockChart>
        
         
        
      </div>
    </div>
  )
}

export default StatsPage;
