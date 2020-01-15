export const dateDMY = (date) => date.split("-").reverse().join("-");
export const toPersent = (one, all) => all === 0 ? '0%' : `${(one*100/all).toFixed(2)}%`;
