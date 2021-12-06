import { observable, computed, action } from "mobx";
import { tCoin } from "../types";

class CurrencyStore {
    constructor(initItems: tCoin[] = []) {
        this.items = initItems
    }
    @observable public items: tCoin[] ;

    @computed 
    get getItems() {
        return this.items
    }

    @action 
    setItems = (items: tCoin[]): void => {
        this.items = items
    }
}

export default CurrencyStore