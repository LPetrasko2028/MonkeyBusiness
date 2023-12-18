import React, { useEffect, useRef, useState } from 'react'
import * as d3 from 'd3'
import { retrieveStockDetails } from '../../mbdataHelper'
import PropTypes from 'prop-types'

// stockDetails = await retrieveStockDetails(stockName);

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
  //const [data, setData] = useState([])

  useEffect(() => {
    async function getStock () {
      const stockData = await retrieveStockDetails(stockName, months)
      setStockDetails(stockData)
    }
    if(stockDetails.length == 0) getStock()
    //console.log(stockDetails)
    //console.log(typeof stockDetails)
  }, [])//* /
  //dataArray = []
  for (let i = 0; i < stockDetails.length; i++) {
    const stock = { date: Date.parse(stockDetails[i][0]), close: stockDetails[i][5] }
    data.push(stock)
  }
  //setData(dataArray)
  console.log('data: ')
  console.log(data)
  console.log(typeof data)
  console.log('stockDetails: ')
  console.log(stockDetails)//*/
  //const gx = useRef()
  //const gy = useRef()
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

  //useEffect(() => void d3.select(gx.current).call(d3.axisBottom(x)), [gx, x])
  //useEffect(() => void d3.select(gy.current).call(d3.axisLeft(y)), [gy, y])
  /*return (
    <svg width={width} height={height} viewport={[0, 0, width, height]}>
      <g ref={gx} transform={`translate(0,${height - marginBottom})`} />
      <g ref={gy} transform={`translate(${marginLeft},0)`} />
      <path fill="none" stroke="steelBlue" strokeWidth="1.5" d={line(data)} />
      <g fill="white" stroke="currentColor" strokeWidth="1.5">
        {data.map((d, i) => (<circle key={i} cx={x(i)} cy={y(d)} r="2.5" />))}
      </g>
    </svg>
  )//*/
  
  const ref = useRef()
  // Create the SVG container.
  //useEffect(() => {
  const svg  = d3.select(ref.current)
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
  //},[])
  return(
    <svg
    viewBox="0 0 100 50"  
    ref={ref}
    />
  )// */
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
