export class ApiHelper {
  createUrl(baseUrl, parameters) {
    let url = baseUrl;
    if (parameters) {
      let i = 0;
      for (let property in parameters) {
        if (this._isValidValue(parameters[property])) {
          url += (i === 0 ? '?' : '&');

          let stringToAppend = property + '=' + parameters[property];

          if (Array.isArray(parameters[property])) {
            stringToAppend = '';
            let j = 0;
            for (let item of parameters[property]) {
              if (item !== null && item !== undefined) {
                stringToAppend += (j === 0 ? '' : '&') + property + '=' + item;
                j++;
              }
            }
          }
          url += stringToAppend;
          i++;
        }
      }
    }
    return url;
  }

  _isValidValue(val) {
    if (val === null || val === undefined) {
      return false;
    }
    if (Array.isArray(val) && val.length === 0) {
      return false;
    }
    return true;
  }
}
