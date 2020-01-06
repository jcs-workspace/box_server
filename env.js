/**
 * $File: env.js $
 * $Date: 2019-12-31 10:04:55 $
 * $Revision: $
 * $Creator: Jen-Chieh Shen $
 * $Notice: See LICENSE.txt for modification and distribution information
 *                   Copyright © 2019 by Shen, Jen-Chieh $
 */

"use strict";

const fs = require('fs');
const path = require('path');
const log4js = require('log4js');


global.CONFIG = require('./config');
global.PROJECT_PATH =  path.resolve('.');
global.FS = fs;

global.LOGGER = log4js.getLogger();
LOGGER.level = CONFIG.isDebug();
