import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { retrieveStockDetails } from '../../mbdataHelper'
import PropTypes from 'prop-types'

/*
This page uses a lot of modules from d3. It's based on the public template provided by d3 for displaying stock information: https://observablehq.com/@d3/line-chart/2?intent=fork
D3 is a sadistic module and noone can seem to agree on 1 way to implement things. If you're trying to expand this graph, be prepared to dig through countless articles and tips that 
give you contradicting advice! -DF
*/
export default function StockChart ({
  stockName,
  months,
  data = [],
  width = 928,
  height = 200,
  marginTop = 20,
  marginRight = 30,
  marginBottom = 30,
  marginLeft = 40

}) {
  const [stockDetails, setStockDetails] = useState([])
  useEffect(() => {
    async function getStock () {
      const stockData = await retrieveStockDetails(stockName, months)
      setStockDetails(stockData)
    }
    if(stockDetails.length == 0) getStock()
    
  }, [stockName])
  data=[]
  for (let i = 0; i < stockDetails.length; i++) {
    const stock = { date: Date.parse(stockDetails[i][0]), close: stockDetails[i][5] }
    data.push(stock)
  }
  
  // Declare the x (horizontal position) scale.
  const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight])

  // Declare the y (vertical position) scale.
  const yscale = d3.extent(data, d => d.close)
  yscale[0] = yscale[0] * 0.99
  yscale[1] = yscale[1] * 1.01
  const y = d3.scaleLinear(yscale, [height - marginBottom, marginTop])

  // Declare the line generator.
  const line = d3.line()
    .x(d => x(d.date))
    .y(d => y(d.close))
  
  const ref = useRef()
  // Create the SVG container.
  //useEffect(() => {
  const svg  = d3.select(ref.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; height: intrinsic;");
  
  d3.selectAll("g > *").remove() //THIS LINE DOES NOT PLAY NICE. It will mess up other graphs on the same page as it. You've been warned.

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

  const path = svg.selectAll('path').data(data)
  path.attr('d', line(data))
      .style('stroke-width', 1.5)
      .style('stroke', 'steelblue')
      .attr("fill", "none");
  path.enter().append('svg:path').attr('d', line(data))
      .style('stroke-width', 1.5)
      .style('stroke', 'steelblue')
      .attr("fill", "none");
  path.exit().remove()
  
  
  
  return(
    <svg
    viewBox="0 0 100 50"  
    ref={ref}
    />
  )
}
StockChart.propTypes = {
  stockName: PropTypes.string,
  data: PropTypes.array,
  width: PropTypes.number,
  height: PropTypes.number,
  marginTop: PropTypes.number,
  marginRight: PropTypes.number,
  marginBottom: PropTypes.number,
  marginLeft: PropTypes.number
}
StockChart.defaultProps = {
  stockName: '',
  data: [],
  width: 928,
  height: 500,
  marginTop: 20,
  marginRight: 30,
  marginBottom: 30,
  marginLeft: 40
}
