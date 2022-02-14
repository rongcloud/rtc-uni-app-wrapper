
export const isNull = (obj) => {
  return typeof obj == "undefined" || obj == null;
}

export const isEmpty = (str) => {
  return isNull(str) || str.length == 0 || str == '';
}

export const post = (url, params, success, error) => {
  uni.request({
    url: url,
    method: 'POST',
    header: {
      'content-type': 'application/json; charset=utf-8',
    },
    data: params,
    success: (json) => {
      success(json.data);
    },
    fail: (exception) => {
      error(exception);
    }
  })
}

export const get = (url, params, success, error) => {
  uni.request({
    url: url,
    method: 'GET',
    header: {
      'content-type': 'application/json; charset=utf-8',
    },
    data: params,
    success: (json) => {
      success(json.data);
    },
    fail: (exception) => {
      error(exception);
    }
  })
}
