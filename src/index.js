
const COMMAND_TYPES = { line: 'line', curve: 'curve', arc: 'arc' };
const POSITION_MODES = { abs: 'absolute', rel: 'relative' };
const COMMANDS = [
    {
        type: COMMAND_TYPES.line,
        key: 'M',
        name: 'moveTo'
    },
    {
        type: COMMAND_TYPES.line,
        key: 'L',
        name: 'lineTo'
    },
    {
        type: COMMAND_TYPES.line,
        key: 'H',
        name: 'horizontalLineTo'
    },
    {
        type: COMMAND_TYPES.line,
        key: 'V',
        name: 'verticalLineTo'
    }
    // TODO implement the rest of the commands
    // curveTo: 'C',
    // smoothCurveTo: 'S',
    // quadraticBezierCurve: 'Q',
    // smoothQuadraticBezierCurve: 'T',
    // ellipticalArc: 'A',
];


class PathBuilder {
    constructor() {
        this.data = '';
        this.mode = POSITION_MODES.abs;
        this.closed = false;
        COMMANDS.forEach(({ type, key, name }) => {
            Object.defineProperty(this, name, {
                enumerable: true,
                value: this._getCommandProvider(type, key, name)
            })
        })
    }

    _getCommandProvider(type, key) {
        switch (type) {
            case COMMAND_TYPES.line:
                return (x, y) => this._applyLineCommand(key, x, y);
        }
    }

    _applyLineCommand(key, x, y) {
        if (this.closed) {
            console.warn('command apply command to closed path');
            return this;
        }
        x = key === 'V' ? '' : x;
        y = key === 'H' ? '' : ` ${y}`;
        this.data += ` ${this._parseCommandKey(key)}${x}${y}`;
        return this;
    }

    _parseCommandKey(key) {
        if (this.mode === POSITION_MODES.abs) {
            return key.toUpperCase();
        }
        return key.toLowerCase();
    }

    _setPositionMode(mode) {
        this.mode = mode;
    }

    reset() {
        this.data = '';
    }

    toString() {
        return this.data;
    }

    relative() {
        this._setPositionMode(POSITION_MODES.rel);
        return this;
    }

    absolute() {
        this._setPositionMode(POSITION_MODES.abs);
        return this;
    }

    closePath() {
        this.path += ' Z';
        this.closed = true;
        return this;
    }

    isClosed() {
        return this.closed;
    }
}


export default PathBuilder;