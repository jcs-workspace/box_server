/**
 * $File: config.js $
 * $Date: 2019-12-31 10:01:55 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

/* Debug Info (除錯資訊) */
const DEBUG = true;                     /* IMPORTANT: 發布記得關閉 */
const isDebug = function () { if (DEBUG) return 'debug'; else return 'release'; };

/* Network Info (連線資訊) */
const PORT = 5001;

const FPS = 30;


//------------------ Exports modules ------------------//

// NOTE: 以下請照順序擺放,感謝合作!

module.exports.DEBUG = DEBUG;
module.exports.isDebug = isDebug;

module.exports.PORT = PORT;

module.exports.FPS = FPS;
