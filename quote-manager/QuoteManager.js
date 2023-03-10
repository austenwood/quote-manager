import { TradeResult } from "./TradeResult.js";

// Please create your own quote manager using the class below.
//
// Please adhere to good Object Oriented Programming concepts, and create whatever support code you feel is necessary.
//
// Efficiency counts think about what data structures you use and how each method will perform.
//
// Though not required, feel free to includes any notes on any areas of this interface that you would improve, or which you
// feel don't adhere to good design concepts or implementation practices.
export class QuoteManager {
  constructor() {
    this.quotes = new Map();
  }

  // Add or update the quote (specified by Id) in symbol's book.
  // If quote is new or no longer in the book, add it. Otherwise update it to match the given price, volume, and symbol.
  addOrUpdateQuote(quote) {
    if (this.quotes.has(quote.symbol)) {
      const symbolBook = this.quotes.get(quote.symbol);
      symbolBook.push(quote);
      this.quotes.set(quote.symbol, symbolBook);
    } else {
      this.quotes.set(quote.symbol, [quote]);
    }
  }

  // Remove quote by Id, if quote is no longer in symbol's book do nothing.
  removeQuote(id) {
    for (const [symbol, symbolBook] of this.quotes) {
      this.quotes.set(
        symbol,
        symbolBook.filter((quote) => quote.id !== id)
      );
    }
  }

  // Remove all quotes on the specifed symbol's book.
  removeAllQuotes(symbol) {
    this.quotes.delete(symbol);
  }

  // Get the best (i.e. lowest) price in the symbol's book that still has available volume.
  // If there is no quote on the symbol's book with available volume, return null.
  // Otherwise return a Quote object with all the fields set.
  // Don't return any quote which is past its expiration time, or has been removed.
  getBestQuoteWithAvailableVolume(symbol) {
    if (!this.quotes.has(symbol)) {
      return null;
    }

    const quotes = Array.from(this.quotes.get(symbol).values());
    const now = new Date();
    const validQuotes = quotes.filter((quote) => {
      return quote.availableVolume > 0 && quote.expiration > now;
    });

    if (validQuotes.length === 0) {
      return null;
    }

    // O(n log(n)) time complexity to maintain price order.
    validQuotes.sort((a, b) => a.price - b.price);

    return validQuotes[0];
  }

  // Request that a trade be executed. For the purposes of this interface, assume that the trade is a request to BUY, not sell. Do not trade an expired quotes.
  // To Execute a trade:
  //   * Search available quotes of the specified symbol from best price to worst price.
  //   * Until the requested volume has been filled, use as much available volume as necessary (up to what is available) from each quote, subtracting the used amount from the available amount.
  // For example, we have two quotes:
  //   {Price: 1.0, Volume: 1,000, AvailableVolume: 750}
  //   {Price: 2.0, Volume: 1,000, AvailableVolume: 1,000}
  // After calling once for 500 volume, the quotes are:
  //   {Price: 1.0, Volume: 1,000, AvailableVolume: 250}
  //   {Price: 2.0, Volume: 1,000, AvailableVolume: 1,000}
  // And After calling this a second time for 500 volume, the quotes are:
  //   {Price: 1.0, Volume: 1,000, AvailableVolume: 0}
  //   {Price: 2.0, Volume: 1,000, AvailableVolume: 750}
  executeTrade(symbol, volumeRequested) {
    let volume = volumeRequested;
    let volumeWeightedAveragePrice = 0;
    while (volume > 0) {
      const quote = this.getBestQuoteWithAvailableVolume(symbol);
      if (!quote) {
        break;
      }
      const availableVolume = quote.availableVolume;
      const price = quote.price;
      // VWAP = (Cumulative (Price * Volume)) / (Cumulative Volume)
      if (volume >= availableVolume) {
        volumeWeightedAveragePrice += availableVolume * price;
        volume -= availableVolume;
        quote.availableVolume = 0;
      } else {
        volumeWeightedAveragePrice += volume * price;
        quote.availableVolume -= volume;
        volume = 0;
      }
    }
    return new TradeResult(
      symbol,
      volumeWeightedAveragePrice / volumeRequested,
      volumeRequested
    );
  }

  // Used for testing the QuoteManager class.
  printQuotes(symbol) {
    const quotes = this.quotes.get(symbol);
    if (!quotes) {
      console.log(`No quotes found for symbol ${symbol}`);
      return;
    }

    console.log(`Quotes for symbol ${symbol}:`);
    for (const quote of quotes) {
      console.log(
        `  id: ${quote.id}, price: ${quote.price}, available volume: ${quote.availableVolume}, expiration: ${quote.expiration}`
      );
    }
  }
}
