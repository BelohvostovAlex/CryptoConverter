import CurrencyStore from "./currencyStore";
import ConverterStore from "./converterStore";

const stores = {
    currencyStore: new CurrencyStore(),
    converterStore: new ConverterStore()
}

export default stores;