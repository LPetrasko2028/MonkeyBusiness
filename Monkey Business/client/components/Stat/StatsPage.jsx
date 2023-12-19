import React, {useState} from 'react';
import StockChart from './StockChart.jsx';

function StatsPage() {
  return (
    <div>
      <div>
        <h1>Stats Page</h1>
      </div>

      <div>
        <form>
        <label>Enter a Stock:  
          <input type="text" name="stockField" value={"AAPL"} readOnly></input>
        </label>
        <button type="submit">Submit</button>
        </form>
        <StockChart stockName={"AAPL"} months={4}></StockChart>
        
        
         
        
      </div>
    </div>
  )
}

export default StatsPage;
