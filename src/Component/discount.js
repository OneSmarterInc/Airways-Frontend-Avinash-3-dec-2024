// function for 0%

export function calculate0(sqft, bopRate, escalator, CRE, numberOfTerms) {
    let firstEMI = bopRate * sqft;
    let firstEMI1 = firstEMI;
    let total = 0;
    let valueArr = [];
    valueArr.push(firstEMI1);

    for (let i = 0; i < numberOfTerms - 1; i++) {
        firstEMI = firstEMI + (firstEMI * escalator);
        valueArr.push(+firstEMI.toFixed(0));
        total += firstEMI;
    }

    total = Math.round(total);
    total = total + firstEMI1;
    total = total.toFixed(0);

    const cashFlows = {
        discountRate: CRE,
        values: valueArr
    };

    let npv = 0;

    for (let i = 0; i < valueArr.length; i++) {
        npv += valueArr[i] / Math.pow(1 + CRE, i + 1);
    }

    npv = npv.toFixed(0);
    // console.log({ total0: total,
    //     npv: npv,
    //     firstEMI0 : firstEMI1});
    return {
        total0: total,
        npv: npv,
        firstEMI0 : firstEMI1
    };
}

// Example usage:
// let sqft = 700000;
// let bopRate = 0.155;
// let escalator = 0.03;
// let CRE = 0.045;
// let numberOfTerms = 10; // Change this to the number of periods you want

// let result = calculate0(sqft, bopRate, escalator, CRE, numberOfTerms);
// console.log('NPV:', result.npv, 'Total:', result.total);




//function for 25%

export function calculate25(resultNPV, escalator, numberOfTerms, prepaymentPercentage, firstEMI1,total0) {
    let prepayment = resultNPV * prepaymentPercentage;
    let total25 = 0;
    let firstEMI = firstEMI1 * (1 - prepaymentPercentage);
    let firstEMI25 = firstEMI;
    let discount = 0;

    for (let i = 0; i < numberOfTerms-1; i++) {
        firstEMI = firstEMI + (firstEMI * escalator);
        total25 += firstEMI;
    }

    total25 = total25 + firstEMI25 + prepayment;
    total25 = total25.toFixed(0);
    discount = ((1 - (total25 / total0)) * 100).toFixed(2);

    return {
        discount25: discount,
        total25: total25,
        firstEMI25: firstEMI25,
        prepayment25 : prepayment
    }
}

// Example usage:
// let resultNPV = 12345; // Replace this with your NPV value
// let prepaymentPercentage = 0.25; // Change this to the desired prepayment percentage
// let discountRate = calculate25(result.npv, escalator, numberOfTerms, prepaymentPercentage, result.firstEMI0, result.total0);
// console.log('Discount Rate:', discountRate);
