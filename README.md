## : `Installation Command `
```
npx create-react-app box-office --template cra-template-pwa --use-npm
```

### `CRA template provides:` 
+ [serviceWorker.js](src\service-worker.js)
+ [serviceWokerRegisteration.js](src/serviceWokerRegisteration.js)
<br/>

`used for creating PWA`

## : `Installing 'styled-components'` 
```
npm install styled-components
```
# *[NOTE]*
### To install `styled-components`change the `babel-eslint` version in [package.json](package.json)
### change the babel-eslint version by replacing the one existing in package.json file with :- 
```
"babel-eslint": "10.1.0",
```
### and run:
 ```
 npm install
  ```

## : `Installing all libraries` 
```
npm install -D rimraf eslint prettier babel-eslint eslint-plugin-react eslint-plugin-jsx-a11y eslint-plugin-jsx-a11y eslint-plugin-import eslint-config-prettier eslint-config-airbnb
```

## : `Installing Airbnb extension` 
```
npm install -g install-peerdeps
install-peerdeps --dev eslint-config-airbnb
```

## : `Installing Prettier extension` 
```
npm install --save-dev eslint-config-prettier
```

## : `Installing babel-eslint extension` 
```
npm install eslint babel-eslint --save-dev
```


## : `Installing react router v5` 
```
npm install react-router-dom@5.2.0 react-router@5.2.0
```

