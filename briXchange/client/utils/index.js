export const daysLeft = (deadline) => {
  const difference = new Date(deadline).getTime() - Date.now();
  const remainingDays = difference / (1000 * 3600 * 24);

  return remainingDays.toFixed(0);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
  const percentage = Math.round((raisedAmount * 100) / goal);

  return percentage;
};

export const checkIfImage = (url, callback) => {
  const img = new Image();
  img.src = url;

  if (img.complete) callback(true);

  img.onload = () => callback(true);
  img.onerror = () => callback(false);
};

export const getTopCreators = (creators) => {
  if (!Array.isArray(creators) || creators.length === 0) {
    return [];
  }

  const finalCreators = [];

  const finalResults = creators.reduce((index, currentValue) => {
    if (currentValue && currentValue.owner) {
      (index[currentValue.owner] = index[currentValue.owner] || []).push(
        currentValue
      );
    }
    return index;
  }, {});

  Object.entries(finalResults).forEach((item) => {
    const owner = item[0];
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    finalCreators.push({ owner, total });
  });

  return finalCreators;
};