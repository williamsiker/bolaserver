const express = require('express');
const router = express.Router();

const Task = require('../models/task');

router.get('/getAll', async (req, res) => {
    const tasks = await Task.find()
    console.log(tasks);
    res.json(tasks);
})

router.post('/save', async(req, res) => {
    const { 
        "01. symbol": symbol,
        "02. open": open,
        "03. high": high,
        "04. low": low,
        "05. price": price,
        "06. volume": volume,
        "07. latest trading day": latestTradingDay,
        "08. previous close": previousClose,
        "09. change": change,
        "10. change percent": changePercent
      } = req.body['Global Quote'];
      
    //const {symbol, open, high, low,price,volume,latestTradingDay,previousClose,change,changePercent} = req.body;
    const task = new Task({symbol, open, high, low,price,volume,latestTradingDay,previousClose,change,changePercent});
    //console.log(task);
    await task.save();
    //res.json("siuuuuu")
})

module.exports = router;