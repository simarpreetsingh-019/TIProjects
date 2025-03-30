#import "Counter.mligo" "Contract"

// Define your initial storage values as a list of LIGO variable definitions, the first of which will be considered the default value to be used for origination later on
let initial_count = 42
let another_count: Contract.Counter.storage = 23 + 18 + 1