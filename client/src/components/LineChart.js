import React, { useContext } from 'react'
import { Context } from '../contexts/DataContext'
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, registerables } from 'chart.js'
import { ThemeContext } from '../contexts/ThemeContextSet'
ChartJS.register(...registerables)


export default function LineChart({ name, number}) {

  const {check, theme, toggleTheme } = useContext(ThemeContext)

  let bgColor = 'rgba(0, 104, 249, 0.5)'
  let fgColor = 'rgba(29,29,29,.25)'
  let redColor = 'rgba(231,71,92,1)'
  let greenColor = 'rgba(134,190,69,1)'
  let chartColor = 'rgba(0,104,249.1)'
  let chartColorThin = 'rgba(0,104,249,.5)'
  let fontColor = 'rgba(29,29,29,1)'

  if(theme === 'dark'){
    fontColor = 'rgba(240,240,240,.7)'
    bgColor = 'rgb(29,29,29)'
    fgColor = 'rgba(240,240,240,.15)'
  }

  let nameNoDash = name.replaceAll('-', ' ')

  const [{ coinData, currentNames, sortState, setSortState, topCoin} , setState] = useContext(Context)

  let allChartRanks = coinData[number].rank
  let rLength = allChartRanks.length
  let allChartDates = coinData[number].date
  let dLength = allChartDates.length
  let allChartPrices = coinData[number].current_price
  let pLength = allChartPrices.length

  //If I want to increase the fetch frequency, and therefor increase the length of ranks, dates, and prices arrays in the future, I will implement either a scroll bar (easier), add a date range selector (harder), or make a feature like CoinGecko has and take the average price of, for example, 7 consecutive days to make one data point. This will allow showing higher ranges without the need for thousands of data points. 

  //Right now, a coin's date, rank, or price array won't get to over 100 for a few years. 

  let toChartRanks = rLength > 100 ? allChartRanks.slice(rLength - 100, dLength) : allChartRanks
  let toChartDates = dLength > 100 ? allChartDates.slice(dLength - 100, dLength) : allChartDates
  let toChartPrices = pLength > 100 ? allChartPrices.slice(pLength - 100, pLength) : allChartPrices

  const labels = toChartDates
    const data = {
      labels,
      datasets: [
        {
          label: name + ' price',
          pointStyle: 'circle',
          pointHoverRadius: 6,
          pointHoverBackgroundColor: chartColorThin,
          pointHoverBorderColor: chartColor,
          pointRadius: 2,
          data: toChartPrices,
          borderColor: (context) => {
            const chart = context.chart
            const { ctx, chartArea, data, scales } = chart
            if(!chartArea){
              return null
            }
            return getGradient(ctx, chartArea, data, scales)
          },
          backgroundColor: bgColor,
          tension: 0.3,
          pointHitRadius: 8,
          pointHitDetectionRadius: 8,
        }
      ],
    }
    const options = {
      scales: {
        x: {
          title: {
            color: 'rgb(222,2,2)'
          },
          grid: {
            color: fgColor
          },
          ticks: {
            color: fontColor,
            maxRotation: 0,
            maxTicksLimit: 7
          }
        },
        y: {
          ticks: {
            color: fontColor,
            callback: function(value, index, ticks) {
              value = +value.toFixed(5)
              return "$" + value
            }
          },
          grid: {
            color: fgColor
          }
        }
      },
      responsive: true,
      interaction: {
        intersect: false,
        mode: 'index',
      },
      maintainAspectRatio: false,
      plugins: {
        tooltip: {
          displayColors: false,
          titleSpacing: 0,
          bodySpacing: 6,
          footerSpacing: 0,
          callbacks: {
            afterBody: function(context){
              return `Rank: ${toChartRanks[context[0].dataIndex]}`
            }
          },
          caretSize: 10,
          caretPadding: 5,
          padding: 15
        },
        legend: {
          display: false
        },
        title: {
          display: true,
          text: `${nameNoDash}'s performance history while ranked in the top 10 coins of the day`,
          color: fontColor,
          font: {
            weight: 'bold',
            size: '18px'
          }
        },
      },
    }

    function getGradient(ctx, chartArea, data, scales){
      const { left, right, top, bottom, width, height } = chartArea
      const {x, y} = scales
      const gradientBorder = ctx.createLinearGradient(0,0,0,bottom)
      const shift = y.getPixelForValue(data.datasets[0].data[0]) / bottom
      gradientBorder.addColorStop(0,greenColor)
      gradientBorder.addColorStop(shift,greenColor)
      gradientBorder.addColorStop(shift,redColor)
      gradientBorder.addColorStop(1,redColor)
      return gradientBorder
    }

    return (
      <Line id='myChart' className='priceChart' options={options} data={data}/>
    )
}