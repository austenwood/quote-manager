# quote-manager

## Data Structure Tradeoffs
There are tradeoffs betweens using an Array as the container for quotes or using a Linked List or Heap. This depends on which function calls are most frequent. A Linked List would have a constant time complexity when it comes to deleting quotes and a heap would be more effecient at maintaining the best priced quote. However, because of time constraints I decided to use an Array. In a production environment the quotes would be stored in a relational database and indexed by something like the price.