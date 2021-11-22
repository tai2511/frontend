export default {
  prepareData(stateObj, responseObj) {
    for (var p in stateObj) {
      try {
        if (stateObj[p].constructor==Object) {
          stateObj[p] = prepareData(stateObj[p], responseObj[p]);
        } else {
          stateObj[p] = responseObj[p];
        }
      } catch(e) {
        stateObj[p] = responseObj[p];
      }
    }
    return stateObj;
  }
}