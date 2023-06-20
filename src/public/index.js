var simulationInterval = setInterval(updateStockPrices, 1000);
var apiKey = 'IE6F252F3FWX1UUO'; // Reemplaza con tu clave de API
var maxQueries = 5; // Número máximo de consultas a realizar
var queryCount = 0; // Contador de consultas realizadas
var stockData = {}

// Función para obtener datos de precios de una acción específica en tiempo real
function getStockData(symbol) {
    var apiUrl = 'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=' + symbol + '&apikey=' + apiKey;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data['Global Quote']) {
                console.log(data);
                var stockPrice = parseFloat(data['Global Quote']['05. price']);

                const Datos = data['Global Quote'];
                const simbolo = Datos['01. symbol']
                const precio = parseFloat(Datos['05. price']);
                const openPrice = parseFloat(Datos['02. open']);
                const highPrice = parseFloat(Datos['03. high']);
                const lowPrice = parseFloat(Datos['04. low']);
                const volume = parseInt(Datos['06. volume']);
                const latestTradingDay = Datos['07. latest trading day'];
                const previousClose = parseFloat(Datos['08. previous close']);
                const change = parseFloat(Datos['09. change']);
                const changePercent = Datos['10. change percent'];


                console.log('Precio de la acción ' + symbol + ': ' + stockPrice);
                // Realiza las operaciones que necesites con el precio de la acción
                // Actualiza el precio en el elemento HTML correspondiente
                if (!stockData[symbol]) {
                    stockData[symbol] = [];
                }

                stockData[symbol].push(stockPrice);
                var stockPriceElement = document.getElementById(symbol).getElementsByClassName('stock-price')[0];
                stockPriceElement.textContent = stockPrice;
            } else {
                console.error('No se encontraron datos para la acción ' + symbol);
            }

            queryCount++;
            if (queryCount >= maxQueries) {
                clearInterval(simulationInterval);
                console.log("Maximo de consultas");
                generateChart();
            }
        })
        .catch(error => {
            queryCount++;
            console.error('Error al obtener los datos de la acción ' + symbol + ': ' + error);
            if (queryCount >= maxQueries) {
                clearInterval(simulationInterval);
                console.log('Se alcanzó el número máximo de consultas. Simulación detenida.');
                generateChart();
            }
        });
}


function generateChart() {
    var stockSymbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'META'];
    var stockChartElement = document.getElementById('stock-chart');
    var stockChartCanvas = stockChartElement.getContext('2d');

    // Prepara los datos del gráfico
    var labels = Object.keys(stockData); // Etiquetas de las acciones
    var data = Object.values(stockData); // Valores de los precios

    // Crea los datasets para el gráfico
    var datasets = stockSymbols.map(symbol => {
        return {
            label: symbol,
            data: stockData[symbol],
            backgroundColor: getRandomColor(),
            //fill: false
        };
    });

    // Crea el gráfico
    var stockChart = new Chart(stockChartElement, {
        type: 'bar',
        data: {
            labels: Array.from(Array(stockData[stockSymbols[0]].length).keys()), // Etiquetas de tiempo (0, 1, 2, ...)
            datasets: datasets
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Tiempo'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Precio'
                    }
                }
            }
        }
    });
}

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Función para generar un número aleatorio entre un rango dado
function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
}

// Función para simular la actualización de los precios de las acciones
function updateStockPrices() {
    // Detiene la simulación si se alcanza el límite de consultas
    if (queryCount >= maxQueries) {
        clearInterval(simulationInterval);
        console.log('Se alcanzó el límite de consultas. Simulación detenida.');
        generateChart();
        return;
    }

    // Obtén los elementos HTML para mostrar los precios
    var stockMarketElement = document.getElementById('stock-market');
    var stockElements = stockMarketElement.getElementsByClassName('stock');

    // Itera sobre cada elemento de acción y actualiza el precio
    for (var i = 0; i < stockElements.length; i++) {
        var stockElement = stockElements[i];
        var stockSymbolElement = stockElement.getElementsByClassName('stock-symbol')[0];
        var stockSymbol = stockSymbolElement.textContent;

        // Utiliza la función para obtener los datos de la acción en tiempo real
        getStockData(stockSymbol);
    }
}

// Función para iniciar la simulación
function startSimulation() {
    // Crea las acciones iniciales con precios aleatorios
    var stocks = [
        { symbol: 'AAPL', name: 'Apple Inc.' },
        { symbol: 'GOOGL', name: 'Alphabet Inc.' },
        { symbol: 'MSFT', name: 'Microsoft Corporation' },
        { symbol: 'AMZN', name: 'Amazon.com Inc.' },
        { symbol: 'META', name: 'Meta Inc.' }
        // Agrega más acciones si lo deseas
    ];

    var stockMarketElement = document.getElementById('stock-market');

    // Crea los elementos HTML para mostrar las acciones y sus precios
    // Crea los elementos HTML para mostrar las acciones y sus precios
    for (var i = 0; i < stocks.length; i++) {
        var stock = stocks[i];

        var stockElement = document.createElement('div');
        stockElement.className = 'stock';

        var stockSymbolElement = document.createElement('span');
        stockSymbolElement.className = 'stock-symbol';
        stockSymbolElement.textContent = stock.symbol;

        var stockNameElement = document.createElement('span');
        stockNameElement.className = 'stock-name';
        stockNameElement.textContent = stock.name;

        var stockPriceElement = document.createElement('span');
        stockPriceElement.className = 'stock-price';
        stockPriceElement.id = stock.symbol; // El ID debe ser el mismo que el símbolo de la acción

        stockElement.appendChild(stockSymbolElement);
        stockElement.appendChild(stockNameElement);
        stockElement.appendChild(stockPriceElement);

        stockMarketElement.appendChild(stockElement);

        // Utiliza la función para obtener los datos de la acción en tiempo real
        getStockData(stock.symbol);
        //getHistoricalStockData(stock.symbol, '2023-01-01', '2023-01-31');
    }

    //generateChart();
}

// Inicia la simulación cuando se carga la página
window.addEventListener('load', startSimulation);