const express = require('express');
const app = express();
const slidingWindow = require('./lib/slidingWindow');
const fixedWindow = require('./lib/fixedWindow')

const cors = require('cors')
app.use(cors())

const rateLimitedFunction = fixedWindow.fixedWindow(() => console.log('function called'),10000,1);

app.get('/', (req, res) => {
   const isAccepted = rateLimitedFunction();
   if(isAccepted){
      res.status(200).json({message : 'Accepted!'});
   }
   else{
      res.status(429).json({message : 'Rate Limited'});
   }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
   console.log(`App listening on PORT ${PORT}`);
})