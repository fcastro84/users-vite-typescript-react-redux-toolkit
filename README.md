# React + TypeScript + Vite + Redux TollKit

## Install

```
$ yarn add @reduxjs/toolkit react-redux -E

$ yarn add @tremor/react

$ yarn add -D tailwindcss postcss autoprefixer 

$ yarn tailwindcss init -p

$ yarn add sonner
```
- Add the paths to all of your template files in your **tailwind.config.js** file, including the path to the Tremor module. 

``` js
/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",

    // Path to the Tremor module
    "./node_modules/@tremor/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {},
  },
  plugins: [],
}
```

- Add the @tailwind directives for each of Tailwind's layers to your **./src/index.css** file.

``` css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## Documentation

- [tremor](https://www.tremor.so/docs/getting-started/installation)
- [tailwindcss](https://tailwindcss.com/docs/installation)
- [redux-toolkit](https://redux-toolkit.js.org/introduction/getting-started)
- [react-redux](https://es.redux.js.org/docs/introduccion/)
- [sonner](https://sonner.emilkowal.ski/)



