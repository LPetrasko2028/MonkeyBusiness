import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { retrieveStockDetails } from '../../mbdataHelper';

//stockDetails = await retrieveStockDetails(stockName);

export default function StockChart({
  stockName,
  data = [],
  stockData,
  width = 928,
  height = 500,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40
  
  
  }) {
  
  //stockData = await retrieveStockDetails(stockName);
  useEffect(() => {
      async function getStock(){
        stockData = await retrieveStockDetails(stockName);
        response = await response.json()
      }
      if(!response) getStock();
  })//*/

  
  for(let i = 0; i < stockData.length; i++){
    stock = {date: stockData[i][0], close: stockData[i][5]};
    data += stock;
  }
  console.log(stockData);
  const gx = useRef();
  const gy = useRef();
  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight]);

  // Declare the y (vertical position) scale.
  const y = d3.scaleLinear([0, d3.max(data, d => d.close)], [height - marginBottom, marginTop]);

  // Declare the line generator.
  const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.close));
  
  useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x]);
  useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y]);
  return (
    <svg width={width} height={height}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="steelBlue" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  );//*/
  /*
  // Create the SVG container.
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");

  // Add the x-axis.
  svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .call(d3.axisBottom(x).ticks(width / 80).tickSizeOuter(0));

  // Add the y-axis, remove the domain line, add grid lines and a label.
  svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .call(d3.axisLeft(y).ticks(height / 40))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line").clone()
          .attr("x2", width - marginLeft - marginRight)
          .attr("stroke-opacity", 0.1))
      .call(g => g.append("text")
          .attr("x", -marginLeft)
          .attr("y", 10)
          .attr("fill", "currentColor")
          .attr("text-anchor", "start")
          .text("↑ Daily close ($)"));

  // Append a path for the line.
  svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));
  
  return svg.node();//*/
}
