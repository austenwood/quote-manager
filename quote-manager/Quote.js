import { v4 as uuidv4 } from "uuid";

export class Quote {
  constructor(symbol, price, availableVolume, expiration) {
    this.id = uuidv4();
    this.symbol = symbol;
    this.price = price;
    this.availableVolume = availableVolume;
    this.expiration = new Date(expiration);
  }

  getId() {
    // UUID
    return this.id;
  }

  setId(id) {
    this.id = id;
  }

  setSymbol(symbol) {
    // string
    this.symbol = symbol;
  }

  getSymbol() {
    return this.symbol;
  }

  setPrice(price) {
    // currency numeric type
    this.price = price;
  }

  getPrice() {
    return this.price;
  }

  setAvailableVolume(volume) {
    //int
    this.availableVolume = volume;
  }

  getAvailableVolume() {
    return this.volume;
  }

  setExpiration(expiration) {
    this.expiration = expiration;
  }

  getExpiration() {
    // date
    return this.expiration;
  }
}
