function getHistoricalStockData(symbol, startDate, endDate) {
    var apiUrl = 'https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=' + symbol + '&outputsize=full&apikey=' + apiKey;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        var stockPrices = data['Time Series (Daily)'];
        console.log(data);
        var historicalData = [];

        for (var date in stockPrices) {
          if (date >= startDate && date <= endDate) {
            var stockPrice = parseFloat(stockPrices[date]['4. close']);
            historicalData.push({ date: date, price: stockPrice });
          }
        }

        //console.log('Datos históricos de la acción ' + symbol + ':', historicalData);
        // Realiza las operaciones que necesites con los datos históricos
        if (!stockData[symbol]) {
          stockData[symbol] = [];
        }

        historicalData.forEach(item => {
          stockData[symbol].push(item.price);
        });

        generateChart();
      })
      .catch(error => {
        console.error('Error al obtener los datos históricos de la acción ' + symbol + ':', error);
      });
}
