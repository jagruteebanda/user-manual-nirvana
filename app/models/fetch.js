import {
      AsyncStorage
} from 'react-native';

function get(url, headers, cb) {
      fetch(url, {
            method: "GET",
            headers: {
                  ...headers,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': window.UserManualNirvana.getUserDetails().accessToken
            }
      })
            .then(response => response.json())
            .then(response => {
                  // console.log('HTTP GET Response:: ', response);
                  if (response.statusCode === 401) {
                        // Expired refresh token
                        refreshToken((err, res) => {
                              if (res) {
                                    get(url, headers, cb);
                              } else {
                                    cb(err, null);
                              }
                        })
                  } else if (response.statusCode === 403) {
                        cb(error, null);
                  } else if (response.statusCode === 500) {
                        // Internal server error occurred
                        cb(error, null);
                  } else if (response.statusCode === 200) {
                        cb(null, response);
                  } else {
                        cb(null, response);
                  }
            })
            .catch(error => {
                  console.log("upload error", error);
                  cb(error, null);
            });
}

function post(url, headers, payload, cb) {
      fetch(url, {
            method: "POST",
            headers: {
                  ...headers,
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                  'Authorization': window.UserManualNirvana.getUserDetails().accessToken
            },
            body: JSON.stringify(payload)
      })
            .then(response => response.json())
            .then(response => {
                  // console.log('HTTP POST Response:: ', response);
                  if (response.statusCode === 401) {
                        // Expired refresh token
                        refreshToken((err, res) => {
                              if (res) {
                                    httpPost(url, headers, cb);
                              } else {
                                    cb(err, null);
                              }
                        })
                  } else if (response.statusCode === 403) {
                        cb(error, null);
                  } else if (response.statusCode === 500) {
                        // Internal server error occurred
                        cb(error, null);
                  } else if (response.statusCode === 200) {
                        cb(null, response);
                  } else {
                        cb(null, response);
                  }
            })
            .catch(error => {
                  // console.log("upload error", error);
                  cb(error, null);
            });
}

function refreshToken(cb) {
      post(
            'https://az19fgwa01t.azurewebsites.net/login/refresh-token',
            null,
            {
                  token: window.UserManualNirvana.getUserDetails().accessToken,
                  refreshToken: window.UserManualNirvana.getUserDetails().refreshToken
            },
            (err, res) => {
                  // console.log('REFRESH TOKEN callback:: ', err, res);
                  if (res) {
                        AsyncStorage.setItem('userDetails', JSON.stringify(res));
                        window.UserManualNirvana.setUserDetails(res);
                  }
                  cb(err, res);
            }
      )
}

module.exports = {
      get,
      post
}