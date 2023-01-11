import { Quote } from "./quote-manager/Quote.js";
import { QuoteManager } from "./quote-manager/QuoteManager.js";

//   {Price: 1.0, Volume: 1,000, AvailableVolume: 750}
const quote1 = new Quote("TBMG", 1.0, 750, new Date(2077, 1, 1));
//   {Price: 2.0, Volume: 1,000, AvailableVolume: 1,000}
const quote2 = new Quote("TBMG", 2.0, 1000, new Date(2077, 1, 1));

const quoteManager = new QuoteManager();

quoteManager.addOrUpdateQuote(quote1);
quoteManager.addOrUpdateQuote(quote2);

quoteManager.executeTrade("TBMG", 500);
quoteManager.printQuotes("TBMG");
// And After calling this a second time for 500 volume, the quotes are:
//   {Price: 1.0, Volume: 1,000, AvailableVolume: 0}
//   {Price: 2.0, Volume: 1,000, AvailableVolume: 750}
quoteManager.executeTrade("TBMG", 500);
quoteManager.printQuotes("TBMG");

quoteManager.removeAllQuotes("TBMG");
quoteManager.printQuotes("TBMG");
