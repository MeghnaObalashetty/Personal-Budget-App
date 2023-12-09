  //for unit Testing
  //exceeded value if expense more than budget 
 export const getExceededValue = (totalBudget, expense) => {
    const exceededValue = expense - totalBudget;
    return exceededValue > 0 ? exceededValue : 0;
  };
