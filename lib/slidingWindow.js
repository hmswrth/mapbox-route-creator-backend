function slidingWindow(func, windowSize, threshold){
   let lastWindowFunctions = 0;
   let currentWindowFunctions = 0;
   let startTime = performance.now();

   setInterval(() => {
      lastWindowFunctions = currentWindowFunctions;
      currentWindowFunctions = 0;
      startTime = performance.now();
   },windowSize);

   return function rateLimitedFunc(...args){
      //percentage of how far through the window
      const distance = (performance.now() - startTime) / windowSize;
      const lastRequests = Math.min(1-distance, 0) * lastWindowFunctions;

      const requests = lastRequests + currentWindowFunctions;
      if(requests >= threshold) return false;

      currentWindowFunctions++;
      func(...args);
      return true;

   }
}

module.exports.slidingWindow = slidingWindow;