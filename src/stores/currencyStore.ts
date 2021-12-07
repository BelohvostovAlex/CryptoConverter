import { makeAutoObservable } from "mobx";
import { tCoin } from "../types";
import axios from "axios";

// class CurrencyStore {
//     constructor(initItems: tCoin[] = []) {
//         this.items = initItems
//     }
//     @observable public items: tCoin[] ;

//     @computed 
//     get getItems() {
//         return this.items
//     }

//     @action 
//     setItems = (items: tCoin[]): void => {
//         this.items = items
//     }
// }

// export default CurrencyStore

class CurrencyStore {
    items: tCoin[] = []
    constructor() {
        makeAutoObservable(this)
    }
    getItems() {
        return this.items
    }
    async fetchItems(): Promise<any> {
        const { data } = await axios.get('https://min-api.cryptocompare.com/data/top/totalvolfull?limit=10&tsym=USD')
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