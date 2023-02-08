// export class ServiceFactory {
//   buildFactory (context) {
//     function requestFactory (body, options) {
//       const { headers, uri, mode, cache, method } = options;
//
//       if (!uri || !method) {
//         return null;
//       }
//
//       const requestInit = {
//         method,
//         mode: mode || DEFAULT_NO_CORS,
//         cache: cache || DEFAULT_NO_CACHE
//       };
//
//       const customHeaders = getCustomHeaders(headers);
//
//       requestInit.headers = customHeaders;
//
//       if (method !== DEFAULT_HTTP_METHOD) {
//         if (CONTENT_TYPES.includes(customHeaders.get(DEFAULT_CONTENT_TYPE_HEADER_NAME))) {
//           const formData = new FormData();
//
//           for (const name in body) {
//             formData.append(name, body[name]);
//           }
//
//           requestInit.body = formData;
//         } else if (DEFAULT_CONTENT_TYPE_HEADER_VALUE === customHeaders.get(DEFAULT_CONTENT_TYPE_HEADER_NAME)) {
//           requestInit.body = JSON.stringify(body);
//         } else {
//           requestInit.body = body;
//         }
//       }
//
//       return new Request(`${context || process.env.VUE_APP_ROOT_VERSION_API}${uri}`, requestInit);
//     }
//
//     function getCustomHeaders (headers) {
//       const customHeaders = new Headers();
//
//       if (headers && headers instanceof Array) {
//         headers
//           .forEach(header =>
//             customHeaders.append(header.name, header.value));
//
//         if (!headers.filter(header => header.name === DEFAULT_ACCEPT_HEADER_NAME).length) {
//           customHeaders.append(DEFAULT_ACCEPT_HEADER_NAME, DEFAULT_ACCEPT_HEADER_VALUE);
//         }
//
//         if (!headers.filter(header => header.name === DEFAULT_CONTENT_TYPE_HEADER_NAME).length) {
//           customHeaders.append(DEFAULT_CONTENT_TYPE_HEADER_NAME, DEFAULT_CONTENT_TYPE_HEADER_VALUE);
//         }
//       } else {
//         customHeaders.append(DEFAULT_ACCEPT_HEADER_NAME, DEFAULT_ACCEPT_HEADER_VALUE);
//         customHeaders.append(DEFAULT_CONTENT_TYPE_HEADER_NAME, DEFAULT_CONTENT_TYPE_HEADER_VALUE);
//       }
//
//       if (StorageService.getItem('user')?.id) {
//         customHeaders.append(
//           DEFAULT_X_USER_ID_CODE_HEADER_NAME,
//           StorageService.getItem('user').id
//         );
//       }
//
//       customHeaders.append(DEFAULT_X_LANG_CODE_HEADER_NAME, DEFAULT_X_LANG_CODE_HEADER_VALUE);
//       customHeaders.append(DEFAULT_AUTHORIZATION_HEADER_NAME, `${DEFAULT_ACCESS_TOKEN_HEADER_VALUE} ${StorageService.getItem('idToken')}`);
//
//       return customHeaders;
//     }
//
//     function serviceFactory (endpoints) {
//       const service = {};
//
//       function builder (options) {
//         if (options && options instanceof Array) {
//           service[options[0]] = (data) => Promise
//             .race([
//               new Promise((resolve, reject) => {
//                 LoadObserver.beforeStarting(options[1] ? options[1].naming : options[0]);
//
//                 if (!(data?.isNotLoading)) {
//                   LoadObserver.starting(options[1] ? options[1].naming : options[0]);
//                 }
//
//                 return fetch(requestFactory(data, mappingOptions(data, options[1])))
//                   .then(response => {
//                     if (response.status === DEFAULT_HTTP_UNAUTHORIZED_CODE) {
//                       return location.replace(process.env.VUE_APP_SIGN_IN_HOST);
//                     } else if (response.status >= DEFAULT_HTTP_BAD_REQUEST_CODE) {
//                       Promise
//                         .resolve(response.headers)
//                         .then(headers => {
//                           if (!(data?.isNotLoading)) {
//                             CatchErrorObserver.reject(headers);
//                           }
//
//                           return reject(response);
//                         });
//                     } else {
//                       const contentType = response.headers.get(DEFAULT_CONTENT_TYPE_HEADER_NAME);
//
//                       if (contentType?.includes(DEFAULT_CONTENT_TYPE_HEADER_VALUE)) {
//                         return Promise
//                           .all([
//                             Promise.resolve(response.status),
//                             Promise.resolve(response.headers),
//                             response
//                               .json()
//                               .then(json => Promise.resolve(json))
//                               .catch(() => Promise.resolve({}))
//                           ])
//                           .then(replay => resolve({
//                             status: replay[0],
//                             headers: replay[1],
//                             data: replay[2]
//                           }));
//                       } else if (contentType && DEFAULT_CONTENT_TYPE_HEADER_VALUES.includes(contentType)) {
//                         return Promise
//                           .all([
//                             Promise.resolve(response.status),
//                             Promise.resolve(response.headers),
//                             response
//                               .blob()
//                               .then(blob => Promise.resolve(blob))
//                               .catch(() => Promise.resolve({}))
//                           ])
//                           .then(replay => resolve({
//                             status: replay[0],
//                             headers: replay[1],
//                             data: replay[2]
//                           }));
//                       } else {
//                         return Promise
//                           .all([
//                             Promise.resolve(response.status),
//                             Promise.resolve(response.headers),
//                             response
//                               .arrayBuffer()
//                               .then(buffer => Promise.resolve(buffer))
//                               .catch(() => Promise.resolve({}))
//                           ])
//                           .then(replay => resolve({
//                             status: replay[0],
//                             headers: replay[1],
//                             data: replay[2]
//                           }));
//                       }
//                     }
//                   })
//                   .catch(response =>
//                     Promise
//                       .resolve(response.headers)
//                       .then(headers => {
//                         if (!(data.isNotLoading)) {
//                           CatchErrorObserver.reject(headers);
//                         }
//
//                         return reject(response);
//                       })
//                   )
//                   .finally(() => LoadObserver.stopping(options[1] ? options[1].naming : options[0]));
//               }),
//               new Promise((resolve, reject) =>
//                 setTimeout(
//                   reject,
//                   DEFAULT_TIME_OUT_REQUEST,
//                 `Timed out in ${DEFAULT_TIME_OUT_REQUEST} ms.`
//                 )
//               )
//             ]);
//         }
//       }
//
//       if (endpoints && endpoints instanceof Object) {
//         Object
//           .entries(endpoints)
//           .forEach(builder);
//       }
//
//       return service;
//     }
//
//     function mappingOptions (data, options) {
//       const optionsDeque = { ...options };
//
//       return data ? addRequestOptions(optionsDeque, data) : optionsDeque;
//     }
//
//     function addRequestOptions (optionsDeque, data) {
//       if (data.headers) {
//         optionsDeque.headers = data.headers;
//
//         delete data.headers;
//       }
//
//       if (data.path) {
//         const paths = data.path.filter(p => ['number', 'string'].includes(typeof p));
//
//         if (paths.length) {
//           optionsDeque.uri = `${optionsDeque.uri}/${paths.join(DEFAULT_JOIN_DELIMITER)}`;
//         }
//
//         delete data.path;
//       }
//
//       if (data.params) {
//         const queryParams = new URLSearchParams(data.params);
//
//         optionsDeque.uri = `${optionsDeque.uri}?${decodeURIComponent(queryParams.toString())}`;
//
//         delete data.params;
//       }
//
//       if (data.uri) {
//         optionsDeque.uri = data.uri;
//
//         delete data.uri;
//       }
//
//       if (data.method) {
//         optionsDeque.method = data.method;
//
//         delete data.method;
//       }
//
//       if (data.mode) {
//         optionsDeque.mode = data.mode;
//
//         delete data.mode;
//       }
//
//       if (data.naming) {
//         optionsDeque.naming = data.naming;
//
//         delete data.naming;
//       }
//
//       if (data.cache) {
//         optionsDeque.cache = data.cache;
//
//         delete data.cache;
//       }
//
//       if (data.isNotLoading) {
//         optionsDeque.isNotLoading = data.isNotLoading;
//       }
//
//       return optionsDeque;
//     }
//
//     return serviceFactory;
//   }
// }
