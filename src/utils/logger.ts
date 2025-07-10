/*
// import { cyan, green, red, yellow } from 'kleur/colors';

// https://github.com/lukeed/kleur/blob/master/colors.mjs

*/
let FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM, isTTY=true;
if (typeof process !== 'undefined') {
	({ FORCE_COLOR, NODE_DISABLE_COLORS, NO_COLOR, TERM } = process.env || {});
	isTTY = process.stdout && process.stdout.isTTY;
}

const $ = {
	enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && (
		FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY
	)
}
// const $ = { enabled: !NODE_DISABLE_COLORS && NO_COLOR == null && TERM !== 'dumb' && ( FORCE_COLOR != null && FORCE_COLOR !== '0' || isTTY ) }
// const $ = { enabled: true }

function init(x, y) {
	let rgx = new RegExp(`\\x1b\\[${y}m`, 'g');
	let open = `\x1b[${x}m`, close = `\x1b[${y}m`;

	return function (txt) {
		if (!$.enabled || txt == null) return txt;
		return open + (!!~(''+txt).indexOf(close) ? txt.replace(rgx, close + open) : txt) + close;
	};
}

// colors
const black = init(30, 39);
const red = init(31, 39);
const green = init(32, 39);
const yellow = init(33, 39);
const blue = init(34, 39);
const magenta = init(35, 39);
const cyan = init(36, 39);
const white = init(37, 39);
const gray = init(90, 39);
const grey = init(90, 39);



/*
// import { highlighter } from '@/src/utils/highlight';

// https://github.com/okisdev/cli/blob/master/src/utils/highlight.ts

// import { cyan, green, red, yellow } from 'kleur/colors';
*/
const highlighter = {
  error: red,
  warn: yellow,
  info: cyan,
  success: green,
};



const logger = {
  error(...args) {
    console.log(highlighter.error(args.join(' ')));
  },
  warn(...args) {
    console.log(highlighter.warn(args.join(' ')));
  },
  info(...args) {
    console.log(highlighter.info(args.join(' ')));
  },
  success(...args) {
    console.log(highlighter.success(args.join(' ')));
  },
  log(...args) {
    // e.g. logger.log(1, "2", 3.4, null, NaN, undefined, /ab/, {});
    // console.log(args.join(' ')); // = `1 2 3.4  NaN  /ab/ [object Object]` [colors = white white white white white white]
    console.log(...args); // `1 '2' 3.4 null NaN undefined /ab/ ▶{}` [colors = purple orange purple gray purple gray white, ▶ = expandable prefix U+25B6 right-pointing triangle]
  },
  break() {
    console.log('');
  },
};

/*
logger.error(1, "2", 3.4, null, NaN, undefined, /ab/, {});
logger.warn(1, "2", 3.4, null, NaN, undefined, /ab/, {});
logger.info(1, "2", 3.4, null, NaN, undefined, /ab/, {});
logger.success(1, "2", 3.4, null, NaN, undefined, /ab/, {});
logger.log(1, "2", 3.4, null, NaN, undefined, /ab/, {});
*/
