# react-mutable-context

[![NPM version][npm-image]][npm-url]
[![build status][travis-image]][travis-url]
[![Test coverage][codecov-image]][codecov-url]
[![npm download][download-image]][download-url]

Create a React context that can accessed and mutated with hooks.

## Installation

`$ npm install --save react-mutable-context`

## Usage

```js
import { createMutableContext } from 'react-mutable-context';

const { Provider: ColorProvider, use: useColor } = createMutableContext(
  'black'
);

function App() {
  return (
    <ColorProvider>
      <ColorUser />
    </ColorProvider>
  );
}

function ColorUser() {
  const [color, setColor] = useColor();

  const handleClick = () => setColor('red');

  return (
    <div style={{ color }}>
      <div>I'm using color from the context!</div>
      <div>
        <button type="button" onClick={handleClick}>
          Change color
        </button>
      </div>
    </div>
  );
}
```

## License

[MIT](./LICENSE)

[npm-image]: https://img.shields.io/npm/v/react-mutable-context.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/react-mutable-context
[travis-image]: https://img.shields.io/travis/targos/react-mutable-context/master.svg?style=flat-square
[travis-url]: https://travis-ci.org/targos/react-mutable-context
[codecov-image]: https://img.shields.io/codecov/c/github/targos/react-mutable-context.svg?style=flat-square
[codecov-url]: https://codecov.io/gh/targos/react-mutable-context
[download-image]: https://img.shields.io/npm/dm/react-mutable-context.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/react-mutable-context
