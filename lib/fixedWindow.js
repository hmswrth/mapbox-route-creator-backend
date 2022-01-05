function fixedWindow(func, windowSize, threshold) {
   let ranFunctions = 0;

   setInterval(() => {
      ranFunctions=0;
   }, windowSize);

   return function rateLimitedFunc(...args){
      if(ranFunctions >=  threshold) return false;

      ranFunctions++;
      func(...args);
      return true;
   }
}

module.exports.fixedWindow = fixedWindow;