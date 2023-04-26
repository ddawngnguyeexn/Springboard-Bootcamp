
it('should calculate the monthly rate correctly', function () {
  // ...
    const values = {amount: 16000, years: 5, rate: 6.2};
  expect(calculateMonthlyPayment(values)).toEqual('310.81')
});


it("should return a result with 2 decimal places", function() {
  // ..
  const values = {amount: 15858, years: 5, rate: 5.1};
  expect(calculateMonthlyPayment(values)).toEqual('299.99')
});

/// etc
