import { makeAutoObservable } from "mobx";
import { tCoin } from "../types";

type TSelectedCoin = {
    name: string;
    price: number;
}

class ConverterStore {
    selectedCoin: TSelectedCoin = {
        name: '',
        price: 0
    }
    constructor() {
        makeAutoObservable(this)
    }

    setSelectedCoin(coin:tCoin) {
        this.selectedCoin = {
            name: coin.name,
            price: coin.price
        }
    }

}

export default new ConverterStore()