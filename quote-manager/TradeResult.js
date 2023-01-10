import { v4 as uuidv4 } from "uuid";

export class TradeResult {
  constructor(symbol, volumeWeightedAveragePrice, volumeRequested) {
    this.id = uuidv4();
    this.symbol = symbol;
    this.volumeWeightedAveragePrice = volumeWeightedAveragePrice;
    this.volumeRequested = volumeRequested;
  }

  setId(id) {
    this.id = id;
  }
  getId() {
    return this.id;
  }
  setSymbol(symbol) {
    this.symbol = symbol;
  }
  getSymbol() {
    return this.symbol;
  }
  setVolumeWeightedAveragePrice(avgPrice) {
    this.volumeWeightedAveragePrice = avgPrice;
  }
  getVolumeWeightedAveragePrice() {
    return this.volumeWeightedAveragePrice;
  }
  setVolumeRequested(volume) {
    this.volumeRequested = volume;
  }
  getVolumeRequested() {
    return this.volumeRequested;
  }
}
