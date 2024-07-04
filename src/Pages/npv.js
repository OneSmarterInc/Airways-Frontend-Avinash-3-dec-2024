// Example cash flow object
const cashFlows = {
    discountRate: 0.1, // Replace this with your discount rate
    values: [100, 200, 300, 400, 500] // Replace this with your cash flow values
  };
  
  // Function to calculate NPV
  function calculateNPV(cashFlows) {
    const { discountRate, values } = cashFlows;
    let npv = 0;
  
    for (let i = 0; i < values.length; i++) {
      npv += values[i] / Math.pow(1 + discountRate, i + 1);
    }
  
    return npv;
  }
  
  // Calculate NPV
  const resultNPV = calculateNPV(cashFlows);
  console.log('Net Present Value (NPV):', resultNPV);
  