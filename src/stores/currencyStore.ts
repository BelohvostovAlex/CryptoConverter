import { makeAutoObservable } from "mobx";
import { tCoin } from "../types";
import axios from "axios";

class CurrencyStore {
    items: tCoin[] = []
    constructor() {
        makeAutoObservable(this)
    }
    getItems() {
        return this.items
    }
    async fetchItems(): Promise<any> {
        const { data } = await axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=20&tsym=USD')
        const { Data } = await data
    
        this.items = Data.map((coin: any) => {
          const obj: tCoin = {
            fullname: coin.CoinInfo.FullName,
            imgUrl: `https://www.cryptocompare.com/${coin.CoinInfo.ImageUrl}`, 
            name: coin.CoinInfo.Name,
            price: (coin.RAW.USD.PRICE).toFixed(3),
            volume: parseInt(coin.RAW.USD.VOLUME24HOUR)
          }
          return obj
        })
    }
};

export default new CurrencyStore()