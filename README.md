[![NPM Version][npm-image]][npm-url]
[![Build Status](https://travis-ci.com/ahincalan/gql-api-client.svg?branch=master)](https://travis-ci.com/ahincalan/gql-api-client)
[![Coverage Status](https://coveralls.io/repos/github/ahincalan/gql-api-client/badge.svg?branch=master)](https://coveralls.io/github/ahincalan/gql-api-client?branch=master)

## Graphql API Client

Simple usage and lightweight graphql api client. Returning promise type.

##### Install Package
```text
npm install gql-api-client
```

##### Usage Examples 
```js
const request =  new GqlClient(
    {
       url: 'http://localhost:4000/graphql',
       query: `{                                   
                  user(id:1) {
                     id 
                     name
                     email                                                                          
                  }                      
               }`
    }
);
request.send().then((response)=>{
  console.log(response);
  /* Output
    {
      data: {..},
      status: ..,
      statusText: ..,
      headers: {..}
    }
   */
});
```

---

```js
const request =  new GqlClient();
request.url = 'http://localhost:4000/graphql';
request.query =`{                                   
                  user(id:1) {
                    id 
                    name
                    email                                                                          
                  }                      
                }`;
request.send().then((response)=>{
  console.log(response);  
});
```

---

Pass parameters
```js
const request =  new GqlClient();
request.url = 'http://localhost:4000/graphql';
request.query =`query ($id: Int!) {                                   
                  user(id:$id) {
                    id 
                    name
                    email                                                                          
                  }                      
                }`;
request.send({id:1}).then((response)=>{
  console.log(response);  
});
```

---

Bearer token support
```js
const request =  new GqlClient();
request.url = 'http://localhost:4000/graphql';
// Bearer token
request.token = 'TestToken';
request.query =`query ($id: Int!) {                                   
                  user(id:$id) {
                    id 
                    name
                    email                                                                          
                  }                      
                }`;
request.send({id:1}).then((response)=>{
  console.log(response);  
});
```

---

Add custom headers
```js
const request =  new GqlClient();
request.url = 'http://localhost:4000/graphql';
request.headers = {'authorization':'Token'};
request.query =`query ($id: Int!) {                                   
                  user(id:$id) {
                    id 
                    name
                    email                                                                          
                  }                      
                }`;
request.send({id:1}).then((response)=>{
  console.log(response);  
});
```


[npm-image]: https://img.shields.io/npm/v/gql-api-client.svg
[npm-url]: https://npmjs.org/package/gql-api-client
