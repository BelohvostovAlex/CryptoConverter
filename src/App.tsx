import React from 'react';
import axios from 'axios';

import { CryptoTable, CryptoConverter } from './Components';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { tCoin } from './types';



function App() {
const [coins, setCoins] = React.useState<tCoin[]>([])
React.useEffect(() => {
  async function getData () {
    const { data } = await axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
    const { Data } = await data

    const dataCoins: tCoin[] = Data.slice(1).map((coin: any) => {
      const obj: tCoin = {
        fullname: coin.CoinInfo.FullName,
        imgUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`, 
        name: coin.CoinInfo.Name,
        price: (coin.RAW.USD.PRICE).toFixed(2),
        volume: parseInt(coin.RAW.USD.VOLUME24HOUR)
      }
      return obj
    })
    setCoins(dataCoins)
  }
  getData()
}, [])

  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={8}>
         <CryptoTable items={coins}/>
        </Grid>
        <Grid item xs={4}>
          <CryptoConverter />
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
