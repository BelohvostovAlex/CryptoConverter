import React from 'react';

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import { tCoin } from '../../types';

import { observer } from 'mobx-react-lite';

import stores from '../../stores';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ICryptoConverter {
  items: tCoin[]
}

const CryptoConverter = observer(({items}:ICryptoConverter) => {
  const coinsName:string[] = items.map(item => item.name)
  const [selectedOutCoin, setSelectedOutCoin] = React.useState<string>('ETH')


  const [amountIn, setAmountIn] = React.useState<string>('')
  const [amountOut,setAmountOut] = React.useState<string>('')
  
  function handleAmountOut() {
    const sum:number = +amountIn * stores.ConverterStore.selectedCoin.price
    const sumOut:tCoin = JSON.parse(JSON.stringify(items.find(item => item.name === selectedOutCoin)))
    const result:string = (sum / sumOut.price).toFixed(3)
    setAmountOut(result)
  }

  function handleSelectedCoinIn(e: any) {
    stores.ConverterStore.setSelectedCoinOnChange({
      name: e.target.value,
      price: JSON.parse(JSON.stringify(items.find(item => item.name === e.target.value))).price
    })
    console.log(stores.ConverterStore.selectedCoin)
  }

  React.useEffect(() => {
    if(amountIn) {
      handleAmountOut()
    }

  }, [stores.ConverterStore.selectedCoin.name, selectedOutCoin, amountIn])
  return (
    <Item className="converter">
      <div className="cryptoInput">
        <TextField id="outlined-search" label="Amount" type="number" value={amountIn} onChange={(e) => setAmountIn(e.target.value)}/>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Curr</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={stores.ConverterStore.selectedCoin.name}
            label="Curr"
            onChange={(e) => handleSelectedCoinIn(e)}>
              {coinsName.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className="cryptoInput">
        <TextField id="outlined-search" label="Amount" type="text" value={amountOut}/>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Curr</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedOutCoin}
            label="Curr"
            onChange={(e) => setSelectedOutCoin(e.target.value)}>
              {coinsName.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <Typography variant="h5" gutterBottom component="div" className="outPutText">
       {amountIn ? 
        `${(stores.ConverterStore.selectedCoin.price * +amountIn).toFixed(2)} USD`
      : 'total in USD'}
      </Typography>
    </Item>
  );
})

export default CryptoConverter;
