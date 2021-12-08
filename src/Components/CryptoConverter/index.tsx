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
  const [selectedOutCoin, setSelectedOutCoin] = React.useState('USD')
  return (
    <Item>
      <div className="cryptoInput">
        <TextField id="outlined-search" label="Amount" type="search" value={1 || ''}/>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Curr</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={stores.ConverterStore.selectedCoin.name || coinsName[0] || ''}
            label="Curr">
              {coinsName.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <div className="cryptoInput">
        <TextField id="outlined-search" label="Amount" type="search" />
        <FormControl sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="demo-simple-select-helper-label">Curr</InputLabel>
          <Select
            labelId="demo-simple-select-helper-label"
            id="demo-simple-select-helper"
            value={selectedOutCoin || ''}
            label="Curr"
            onChange={(e) => setSelectedOutCoin(e.target.value)}>
              <MenuItem value='USD'>USD</MenuItem>
              {coinsName.map(name => <MenuItem key={name} value={name}>{name}</MenuItem>)}
          </Select>
        </FormControl>
      </div>
      <Typography variant="h5" gutterBottom component="div">
        77.24 Белорусский рубль
      </Typography>
    </Item>
  );
})

export default CryptoConverter;
