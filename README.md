# svg-path-builder

minimal utility for building path data using a declarative api.

### Installation
```bash
$ yarn add svg-path-builder
```

### Usage
```javascript
import PathBuilder from 'svg-path-builder';

function renderSvgPath() {
    const pathData = new PathBuilder()
        .moveTo(10, 10)
        .lineTo(20, 20)
        .relative()
        .horizontalLineTo(100)
        .toString()
        
    return <Path d={pathData}/>
}
```

### API

#### `new PathBuilder()`
create an instance of the path builder

- **`relative()`** switch to relative path mode
- **`aboslute()`** switch to absolute path mode
- **`moveTo(x, y)`** move to position without drawing a line
- **`lineTo(x, y)`** draw a line from current position to point(x, y)
- **`horizontalLineTo(x)`** draw line from current position to point(x, currentY)
- **`verticalLineTo(y)`** draw a line from current position to point(currentX, y);
- **`toString()`** return the path as an Svg formatted string (e.g. `d={path.toString())`)

*Note*:
 I quickly wrote this for a particular use case, so there is currently no support for **Curve** or **Arc** path data.
It would be very simple to add, which I will hopefully have time to to get to. Otherwise feel free to PR.