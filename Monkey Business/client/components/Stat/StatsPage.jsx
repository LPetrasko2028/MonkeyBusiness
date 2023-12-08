import React from 'react';
import StockChart from './StockChart.jsx';

function StatsPage() {
  return (
    <div>
      <div>
        <h1>Stats Page</h1>
      </div>

      <div>
        <p>this is a circle</p>
        <StockChart stockName={"AAPL"}></StockChart>
         
        
      </div>
    </div>
  )
}

export default StatsPage;
