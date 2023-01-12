# quote-manager

## Data Structure Tradeoffs

There are tradeoffs between using an Array for storing the quotes and using a Linked List or Heap. This depends on which function calls are most frequent. A Linked List would have a constant time complexity for deleting quotes and a heap would be more efficient at maintaining the best priced quote. But, because of time constraints I decided to use an Array. In a production environment the quotes would be stored in a relational database and indexed by something like the price.
