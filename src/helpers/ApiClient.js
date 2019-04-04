import superagent from 'superagent';
import config from 'config';
import cookie from 'react-cookies';

const methods = ['get', 'post', 'put', 'patch', 'del'];

function formatUrl(path) {
  const adjustedPath = path[0] !== '/' ? '/' + path : path;
  if (__SERVER__) {
    // Prepend host and port of the API server to the path.
    return 'http://' + config.apiHost + ':' + config.apiPort + adjustedPath;
  }
  // Prepend `/api` to relative URL, to proxy to API server.
  // if (path.indexOf('http') >= 0) return path;
  return 'http://' + config.apiHost + (config.apiPort != 'none' ? ':' + config.apiPort : '') + adjustedPath;
}

export default class ApiClient {
  constructor(req) {
    methods.forEach((method) =>
      this[method] = (path, { params, data } = {}) => new Promise((resolve, reject) => {
        const request = superagent[method](formatUrl(path));
        let jwtKey = cookie.load('userToken');
        if (params) {
          request.query(params);
        }
        request.set('Authorization', 'Bearer ' + jwtKey);
        if (cookie.load('api_key') !== undefined) {
          request.set('X-API-KEY', cookie.load('api_key'));
        }
        request.set('Content-Type', 'application/json');
        request.withCredentials(false);

        if (__SERVER__ && req.get('cookie')) {
          request.set('cookie', req.get('cookie'));
        }

        if (data) {
          request.send(data);
        }

        request.end((err, res = {}) => {
          if (err) {
            reject(res.text);
          } else {
            try {
              resolve(JSON.parse(res.text));
            } catch (ex) {
              console.error('APIClient: Can not parse json');
              resolve(null);
            }
          }
        });
      }));
  }
  /*
   * There's a V8 bug where, when using Babel, exporting classes with only
   * constructors sometimes fails. Until it's patched, this is a solution to
   * "ApiClient is not defined" from issue #14.
   * https://github.com/erikras/react-redux-universal-hot-example/issues/14
   *
   * Relevant Babel bug (but they claim it's V8): https://phabricator.babeljs.io/T2455
   *
   * Remove it at your own risk.
   */
  empty() {}
}
