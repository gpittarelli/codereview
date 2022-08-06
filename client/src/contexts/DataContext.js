import React, { useState, useEffect } from "react";
import LoadingScreen from "../components/LoadingScreen";
import axios from "axios";

export const Context = React.createContext()

const DataContext = ({ children }) => {

  const [isLoading, setLoading] = useState(true)
  const [coinData, setCoinData] = useState([])
  const [currentNames, setCurrentNames] = useState([])
  const [sortState, setSortState] = useState('highLow24h')
  const [topCoin, setTopCoin] = useState([])
  const [state, setState] = useState([])
  const [coinDataSorted, setCoinDataSorted] = useState([])
  console.log(sortState)
  
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  // NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT
  //REMOVE FROM HERE


  let url = 'http://localhost:3030/coindata'
  useEffect(() => {

    let coinNames = []
    let coinsUpper = []
    let coinList = []

    axios.get(url)
      .then(data => {
        let initCoinDataSorted = data.data.slice(0,10).sort((a,b) => b.percent_change_24h - a.percent_change_24h)
        let currentNames = []
        initCoinDataSorted.forEach(coin => {
          currentNames.push(coin.name.charAt(0).toUpperCase() + coin.name.slice(1))
        })
          if(sortState === 'highLowPrice'){
            let priceHighToLow = initCoinDataSorted.slice(0,10)
            priceHighToLow.sort((a,b) => b.current_price[b.current_price.length - 1] - a.current_price[a.current_price.length - 1])
            coinList = priceHighToLow
            for(let i=0; i<priceHighToLow.length; i++){
              coinNames.push(priceHighToLow[i].name)
              if(typeof priceHighToLow[i].name.charAt(0) === 'string'){
                priceHighToLow[i].name = priceHighToLow[i].name.charAt(0).toUpperCase() + priceHighToLow[i].name.slice(1)
              }
              coinsUpper.push(priceHighToLow[i].name)
            }
          }
          else if(sortState === 'lowHighPrice'){
            let priceLowToHigh = initCoinDataSorted.slice(0,10)
            priceLowToHigh.sort((a,b) => a.current_price[a.current_price.length - 1] - b.current_price[b.current_price.length - 1])
            coinList = priceLowToHigh
            for(let i=0; i<priceLowToHigh.length; i++){
              coinNames.push(priceLowToHigh[i].name)
              if(typeof priceLowToHigh[i].name.charAt(0) === 'string'){
                priceLowToHigh[i].name = priceLowToHigh[i].name.charAt(0).toUpperCase() + priceLowToHigh[i].name.slice(1)
              }
              coinsUpper.push(priceLowToHigh[i].name)
            }
          }
          else if(sortState === 'highLow24h'){
            let dailyHighLow = initCoinDataSorted.slice(0,10)
            dailyHighLow.sort((a,b) => b.percent_change_24h - a.percent_change_24h)
            coinList = dailyHighLow
            for(let i=0; i<dailyHighLow.length; i++){
              coinNames.push(dailyHighLow[i].name)
              if(typeof dailyHighLow[i].name.charAt(0) === 'string'){
                dailyHighLow[i].name = dailyHighLow[i].name.charAt(0).toUpperCase() + dailyHighLow[i].name.slice(1)
              }
              coinsUpper.push(dailyHighLow[i].name)
            }
          }
          else if(sortState === 'lowHigh24h'){
            let dailyLowToHigh = initCoinDataSorted.slice(0,10)
            dailyLowToHigh.sort((a,b) => a.percent_change_24h - b.percent_change_24h)
            console.log('a', dailyLowToHigh)
            coinList = dailyLowToHigh
            for(let i=0; i<dailyLowToHigh.length; i++){
              coinNames.push(dailyLowToHigh[i].name)
              if(typeof dailyLowToHigh[i].name.charAt(0) === 'string'){
                dailyLowToHigh[i].name = dailyLowToHigh[i].name.charAt(0).toUpperCase() + dailyLowToHigh[i].name.slice(1)
              }
              coinsUpper.push(dailyLowToHigh[i].name)
            }
          }
          else if(sortState === 'highLow7d'){
            let weeklyHighLow = initCoinDataSorted.slice(0,10)
            weeklyHighLow.sort((a,b) => b.percent_change_7d - a.percent_change_7d)
            coinList = weeklyHighLow
            for(let i=0; i<weeklyHighLow.length; i++){
              coinNames.push(weeklyHighLow[i].name)
              if(typeof weeklyHighLow[i].name.charAt(0) === 'string'){
                weeklyHighLow[i].name = weeklyHighLow[i].name.charAt(0).toUpperCase() + weeklyHighLow[i].name.slice(1)
              }
              coinsUpper.push(weeklyHighLow[i].name)
            }
          }
          else if(sortState === 'low2High7d'){
            let weeklyLowHigh = initCoinDataSorted.slice(0,10)
            weeklyLowHigh.sort((a,b) => a.percent_change_7d - b.percent_change_7d)
            coinList = weeklyLowHigh
            for(let i=0; i<weeklyLowHigh.length; i++){
              coinNames.push(weeklyLowHigh[i].name)
              if(typeof weeklyLowHigh[i].name.charAt(0) === 'string'){
                weeklyLowHigh[i].name = weeklyLowHigh[i].name.charAt(0).toUpperCase() + weeklyLowHigh[i].name.slice(1)
              }
              coinsUpper.push(weeklyLowHigh[i].name)
            }
          }
          else{
            coinList = initCoinDataSorted
            for(let i=0; i<initCoinDataSorted.length; i++){
              coinNames.push(initCoinDataSorted[i].name)
              if(typeof initCoinDataSorted[i].name.charAt(0) === 'string'){
                initCoinDataSorted[i].name = initCoinDataSorted[i].name.charAt(0).toUpperCase() + initCoinDataSorted[i].name.slice(1)
              }
              coinsUpper.push(initCoinDataSorted[i].name)
            }
          }
        setCoinData(initCoinDataSorted)
        setTopCoin(initCoinDataSorted[0])
        setCoinData(coinList)
        setCurrentNames(coinNames)
        setState({coinData, currentNames, sortState, setSortState, topCoin})
        setLoading(false)
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

  useEffect(() => {
    let coinNames = []
    let coinsUpper = []
    let coinList = []

    if(isLoading === false){
      if(sortState === 'highLowPrice'){
        let priceHighToLow = coinDataSorted.slice(0,10)
        priceHighToLow.sort((a,b) => b.current_price[b.current_price.length - 1] - a.current_price[a.current_price.length - 1])
        coinList = priceHighToLow
        for(let i=0; i<priceHighToLow.length; i++){
          coinNames.push(priceHighToLow[i].name)
          if(typeof priceHighToLow[i].name.charAt(0) === 'string'){
            priceHighToLow[i].name = priceHighToLow[i].name.charAt(0).toUpperCase() + priceHighToLow[i].name.slice(1)
          }
          coinsUpper.push(priceHighToLow[i].name)
        }
      }
      else if(sortState === 'lowHighPrice'){
        let priceLowToHigh = coinDataSorted.slice(0,10)
        priceLowToHigh.sort((a,b) => a.current_price[a.current_price.length - 1] - b.current_price[b.current_price.length - 1])
        coinList = priceLowToHigh
        for(let i=0; i<priceLowToHigh.length; i++){
          coinNames.push(priceLowToHigh[i].name)
          if(typeof priceLowToHigh[i].name.charAt(0) === 'string'){
            priceLowToHigh[i].name = priceLowToHigh[i].name.charAt(0).toUpperCase() + priceLowToHigh[i].name.slice(1)
          }
          coinsUpper.push(priceLowToHigh[i].name)
        }
      }
      else if(sortState === 'highLow24h'){
        let dailyHighLow = coinDataSorted.slice(0,10)
        dailyHighLow.sort((a,b) => b.percent_change_24h - a.percent_change_24h)
        coinList = dailyHighLow
        for(let i=0; i<dailyHighLow.length; i++){
          coinNames.push(dailyHighLow[i].name)
          if(typeof dailyHighLow[i].name.charAt(0) === 'string'){
            dailyHighLow[i].name = dailyHighLow[i].name.charAt(0).toUpperCase() + dailyHighLow[i].name.slice(1)
          }
          coinsUpper.push(dailyHighLow[i].name)
        }
      }
      else if(sortState === 'lowHigh24h'){
        let dailyLowToHigh = coinDataSorted.slice(0,10)
        dailyLowToHigh.sort((a,b) => a.percent_change_24h - b.percent_change_24h)
        console.log('a', dailyLowToHigh)
        coinList = dailyLowToHigh
        for(let i=0; i<dailyLowToHigh.length; i++){
          coinNames.push(dailyLowToHigh[i].name)
          if(typeof dailyLowToHigh[i].name.charAt(0) === 'string'){
            dailyLowToHigh[i].name = dailyLowToHigh[i].name.charAt(0).toUpperCase() + dailyLowToHigh[i].name.slice(1)
          }
          coinsUpper.push(dailyLowToHigh[i].name)
        }
      }
      else if(sortState === 'highLow7d'){
        let weeklyHighLow = coinDataSorted.slice(0,10)
        weeklyHighLow.sort((a,b) => b.percent_change_7d - a.percent_change_7d)
        coinList = weeklyHighLow
        for(let i=0; i<weeklyHighLow.length; i++){
          coinNames.push(weeklyHighLow[i].name)
          if(typeof weeklyHighLow[i].name.charAt(0) === 'string'){
            weeklyHighLow[i].name = weeklyHighLow[i].name.charAt(0).toUpperCase() + weeklyHighLow[i].name.slice(1)
          }
          coinsUpper.push(weeklyHighLow[i].name)
        }
      }
      else if(sortState === 'low2High7d'){
        let weeklyLowHigh = coinDataSorted.slice(0,10)
        weeklyLowHigh.sort((a,b) => a.percent_change_7d - b.percent_change_7d)
        coinList = weeklyLowHigh
        for(let i=0; i<weeklyLowHigh.length; i++){
          coinNames.push(weeklyLowHigh[i].name)
          if(typeof weeklyLowHigh[i].name.charAt(0) === 'string'){
            weeklyLowHigh[i].name = weeklyLowHigh[i].name.charAt(0).toUpperCase() + weeklyLowHigh[i].name.slice(1)
          }
          coinsUpper.push(weeklyLowHigh[i].name)
        }
      }
      else{
        coinList = coinDataSorted
        for(let i=0; i<coinDataSorted.length; i++){
          coinNames.push(coinDataSorted[i].name)
          if(typeof coinDataSorted[i].name.charAt(0) === 'string'){
            coinDataSorted[i].name = coinDataSorted[i].name.charAt(0).toUpperCase() + coinDataSorted[i].name.slice(1)
          }
          coinsUpper.push(coinDataSorted[i].name)
        }
      }
    }
    if(isLoading === false){
      setCoinData(coinList)
      setCurrentNames(coinNames)
      setState({coinData, currentNames, sortState, setSortState, topCoin})
    }
    console.log(coinData)
}, [sortState])
//TODO ^^^ set to rerender when numbers change
  console.log(coinData)
  return (
    <div>
      {isLoading ? 
        <LoadingScreen></LoadingScreen>
      : 
          <Context.Provider value={ [{ coinData, currentNames, sortState, setSortState, topCoin }, setState] }>{children}</Context.Provider>
      }
    </div>
  )
}

export default DataContext;










// NOTE: MAKE NEW CONTEXT TO UPDATE LIST ORDER CALLED SORTCONTEXT