import React from 'react';

import { CryptoTable, CryptoConverter } from './Components';

import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import { tCoin } from './types';
import stores from './stores';
import { observer } from 'mobx-react-lite';



const App = observer(() => {
const [coins, setCoins] = React.useState<tCoin[]>([])

React.useEffect(() => {
 fetchCoins()
}, [])

async function fetchCoins() {
  try {
    await stores.CurrencyStore.fetchItems()
    setCoins(stores.CurrencyStore.items)
  } catch (error) {
    alert(error)
  }
}

  return (
    <Container maxWidth="lg" className="container">
      <Grid container spacing={2}>
        <Grid item xs={8}>
         <CryptoTable items={coins}/>
        </Grid>
        <Grid item xs={4}>
          <CryptoConverter items={coins}/>
        </Grid>
      </Grid>
    </Container>
  );
})

export default App;
