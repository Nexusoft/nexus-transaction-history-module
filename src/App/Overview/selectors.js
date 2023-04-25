const getThresholdDate = (timeSpan) => {
  const now = new Date();
  switch (timeSpan) {
    case 'week':
      return new Date(now.getFullYear(), now.getMonth(), now.getDate() - 7);
    case 'month':
      return new Date(now.getFullYear(), now.getMonth() - 1, now.getDate());
    case 'year':
      return new Date(now.getFullYear() - 1, now.getMonth(), now.getDate());
    default:
      return null;
  }
};

export const GetFilteredTransactions = memoize(
  (transactions, fromQuery, toQuery, timeSpan, operation) =>
    transactions &&
    transactions.filter((element) => {
      if (fromQuery) {
        if (
          !element.from?.address
            ?.toLowerCase()
            .includes(fromQuery.toLowerCase())
        )
          return false;
      }
      if (toQuery) {
        if (!element.to?.toLowerCase().includes(toQuery.toLowerCase()))
          return false;
      }
      if (operation && element.OP && element.OP !== operation) return false;
      if (timeSpan) {
        const pastDate = getThresholdDate(timeSpan);
        if (!pastDate) return true;
        else return element.timestamp * 1000 > pastDate.getTime();
      }
      return true;
    })
);

// Source https://github.com/alexreardon/memoize-one

function memoize(resultFn, isEqual = areInputsEqual) {
  let lastThis;
  let lastArgs = [];
  let lastResult;
  let calledOnce = false;

  // breaking cache when context (this) or arguments change
  function memoized(...newArgs) {
    if (calledOnce && lastThis === this && isEqual(newArgs, lastArgs)) {
      return lastResult;
    }

    // Throwing during an assignment aborts the assignment: https://codepen.io/alexreardon/pen/RYKoaz
    // Doing the lastResult assignment first so that if it throws
    // nothing will be overwritten
    lastResult = resultFn.apply(this, newArgs);
    calledOnce = true;
    lastThis = this;
    lastArgs = newArgs;
    return lastResult;
  }

  return memoized;
}

function areInputsEqual(newInputs, lastInputs) {
  // no checks needed if the inputs length has changed
  if (newInputs.length !== lastInputs.length) {
    return false;
  }
  // Using for loop for speed. It generally performs better than array.every
  // https://github.com/alexreardon/memoize-one/pull/59
  for (let i = 0; i < newInputs.length; i++) {
    // using shallow equality check
    if (newInputs[i] !== lastInputs[i]) {
      return false;
    }
  }
  return true;
}
