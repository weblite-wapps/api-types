"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
exports.__esModule = true;
exports.getShareDBMock = exports.getImageMock = exports.getAnalyticsMock = exports.getAudioMock = exports.getMessageMock = exports.getChatMock = exports.getWappsMock = exports.getUsersMock = exports.getUserMock = exports.initializeAsync = exports.setHooks = exports.setDefaultValueForMissingProps = exports.globalUpdatePath = exports.globalLensView = exports.scopeInitiation = exports.GLOBALS = void 0;
var R = __importStar(require("ramda"));
var Storage = /** @class */ (function () {
    function Storage(identifier, storage) {
        this.identifier = identifier;
        this.storage = storage;
    }
    Storage.prototype.set = function (value) {
        window[this.storage].setItem(this.identifier, JSON.stringify(value || null));
    };
    Storage.prototype.get = function () {
        return JSON.parse(window[this.storage].getItem(this.identifier) || '{}');
    };
    return Storage;
}());
/******************************************************************************/
exports.GLOBALS = {
    config: {
        debug: true,
        timing: {
            initializeAsync: 300,
            getProfile: 300,
            shareDB: 300,
            user: 300,
            chat: 300,
            message: 300
        },
        storage: 'sessionStorage'
    },
    __wapps__: {
        wappId: 'wapp-id-hash',
        mode: 'main'
    },
    wapps: {},
    __profile__: {},
    profile: {},
    __users__: {},
    user: {
        id: 'user-id',
        firstname: 'firstname',
        username: 'username',
        /* prettier-ignore */
        profileImage: '15-songs-for-your-leadership-playlist_opt.jpg-@-4cdfc053-9a18-4e40-bd49-88f14b40a3a1.jpg',
        getInfo: function () {
            var that = this;
            // @ts-ignore
            delete that['getInfo'];
            return that;
        }
    },
    __chat__: {},
    __db__: {}
};
/******************************************************************************/
var noop = function () { };
var sleep = function (ms) { return new Promise(function (resolve) { return setTimeout(resolve, ms); }); };
var debug = exports.GLOBALS.config.debug ? console.log : noop;
var shareDBStorage = new Storage('share-db', 'sessionStorage');
var scopeInitiation = function () {
    debug = exports.GLOBALS.config.debug ? console.log : noop;
    shareDBStorage = new Storage('share-db', exports.GLOBALS.config.storage);
    exports.GLOBALS.__db__ = shareDBStorage.get();
};
exports.scopeInitiation = scopeInitiation;
/******************************************************************************/
var globalLensView = function (path) {
    var lens = R.lensPath(path);
    return R.view(lens, exports.GLOBALS);
};
exports.globalLensView = globalLensView;
var globalUpdatePath = function (path, update) {
    var lens = R.lensPath(path);
    exports.GLOBALS = R.set(lens, R.mergeDeepLeft(update, exports.globalLensView(path)), exports.GLOBALS);
};
exports.globalUpdatePath = globalUpdatePath;
var setDefaultValueForMissingProps = function (mock) {
    mock = R.mergeDeepLeft(mock, exports.GLOBALS);
    R.forEach(function (key) { return exports.globalUpdatePath([key], mock[key]); }, R.keys(mock));
};
exports.setDefaultValueForMissingProps = setDefaultValueForMissingProps;
/******************************************************************************/
var callbacks = {
    // @ts-ignore
    wappWillStart: function (start) { return start(); },
    onError: function () { return false; },
    // @ts-ignore
    onCustomizationDone: function (finalize, customizeObject) { return finalize(customizeObject); }
};
var setCallback = function (key) { return function (callback) {
    // @ts-ignore
    callbacks[key] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debug.apply(void 0, __spreadArray(["callbacks[" + key + "]"], args));
        callback.apply(void 0, args);
    };
}; };
var setHooks = function (hooks) {
    if (hooks === void 0) { hooks = {}; }
    debug('send(wappCommunicateCoreApiInitiated())');
    // @ts-ignore
    Object.entries(hooks).forEach(function (_a) {
        var name = _a[0], hook = _a[1];
        return setCallback(name)(hook);
    });
};
exports.setHooks = setHooks;
/******************************************************************************/
var initializeWapp = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        debug('request(wappCommunicateCoreInitializeWappData())');
        return [2 /*return*/, exports.GLOBALS.wapps];
    });
}); };
var initializeUser = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        debug('request(wappCommunicateCoreGetUserInfo())');
        return [2 /*return*/, exports.GLOBALS.user];
    });
}); };
var initializeAsync = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.initializeAsync)];
            case 1:
                _a.sent();
                return [4 /*yield*/, Promise.all([initializeWapp, initializeUser])];
            case 2: return [2 /*return*/, _a.sent()];
        }
    });
}); };
exports.initializeAsync = initializeAsync;
/******************************************************************************/
var getUserMock = function () { return ({
    getId: function () { return exports.GLOBALS.user.id; },
    getFirstname: function () { return exports.GLOBALS.user.firstname; },
    getLastname: function () { return exports.GLOBALS.user.lastname; },
    getUsername: function () { return exports.GLOBALS.user.username; },
    getProfileImage: function () { return exports.GLOBALS.user.profileImage; },
    getBio: function () { return exports.GLOBALS.user.bio; },
    getInfo: function () { return exports.GLOBALS.user.getInfo(); },
    getProfile: function (section) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.getProfile)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, exports.GLOBALS.profile[section]];
            }
        });
    }); },
    editProfile: function (section) {
        var developerInput = window.prompt('Enter key for your defined role in `__profile_roles__`');
        if (developerInput === null) {
            debug('Role Changed to other, your profile is undefined now');
            return;
        }
        if (R.has(developerInput, exports.GLOBALS.__profile__)) {
            exports.globalUpdatePath(['profile', section], exports.GLOBALS.__profile__[developerInput]);
            debug("Role Changed to __profile_roles__[" + developerInput + "], your profile is undefined now");
            return exports.GLOBALS.__profile__[developerInput];
        }
        else {
            debug(developerInput + " doesn't exist in __profile_roles__, check for possible typos");
            return;
        }
    }
}); };
exports.getUserMock = getUserMock;
/******************************************************************************/
var _getUserById = function (userId) {
    return R.prop(userId, exports.GLOBALS.__users__);
};
var _getUserByUsername = function (username) {
    return R.find(R.propEq('username', username), R.values(exports.GLOBALS.__users__));
};
var getUsersMock = function () { return ({
    // TODO: add random user generator
    getById: function (userIds) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.user)];
                case 1:
                    _a.sent();
                    users = {};
                    R.forEach(function (userId) {
                        var probableUser = _getUserById(userId);
                        if (probableUser)
                            users[userId] = probableUser;
                        else
                            debug("[No user exist] userId: " + userId + " in your __users__");
                    }, userIds);
                    return [2 /*return*/, users];
            }
        });
    }); },
    getByUsername: function (usernames) { return __awaiter(void 0, void 0, void 0, function () {
        var users;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.user)];
                case 1:
                    _a.sent();
                    users = {};
                    R.forEach(function (username) {
                        var probableUser = _getUserByUsername(username);
                        if (probableUser)
                            users[username] = probableUser;
                        else
                            debug("[No user exist] username: " + username + " in your __users__");
                    }, usernames);
                    return [2 /*return*/, users];
            }
        });
    }); },
    openProfile: function (userId) {
        debug("Weblite will open the profile of " + userId + " if it Exists");
    }
}); };
exports.getUsersMock = getUsersMock;
/******************************************************************************/
var getWappsMock = function () { return ({
    getWappId: function () { return exports.GLOBALS.__wapps__.wappId; },
    getWisId: function () { return exports.GLOBALS.__wapps__.wisId; },
    getMode: function () { return exports.GLOBALS.__wapps__.mode; },
    start: function () {
        debug('wapp starts!');
    },
    close: function () {
        debug('wapp closes!');
    },
    /** Restart wapp */
    restart: function () {
        debug('wapp re-starts!');
    },
    throwError: function (error) {
        debug('wapp throw new Error');
        throw new Error(error);
    },
    setFullscreen: function (willBeFullscreen) {
        if (willBeFullscreen) {
            exports.GLOBALS.__wapps__.mode = 'fullscreen';
            debug('Set wapp full screen mode');
        }
    },
    changeMode: function (mode, input) {
        exports.GLOBALS.__wapps__.mode = mode;
        exports.GLOBALS.wapps.inputs = input;
        debug("Mode has been change to " + mode + " and your given input will be passed to wapp", input);
    },
    setOutput: function (output) {
        debug('this output will be passed to the parent wapp.', output);
    },
    donePopup: function (output) {
        debug('Closes the popup and resolves the popup mode request in parent wapp by given output.', output);
    },
    cancelPopup: function () {
        debug('Closes the popup and rejects the popup mode request in parent wapp.');
    },
    getInput: function () { return exports.GLOBALS.wapps.inputs; },
    getAdmins: function () { return exports.GLOBALS.wapps.admins; }
}); };
exports.getWappsMock = getWappsMock;
/******************************************************************************/
var getChatMock = function () { return ({
    getPublicChatByUsername: function (username) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.chat)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, __assign({ isMember: null }, R.find(R.propEq('username', username), R.values(exports.GLOBALS.__chat__)))];
            }
        });
    }); },
    getById: function (chatId) { return __awaiter(void 0, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.chat)];
                case 1:
                    _a.sent();
                    return [2 /*return*/, __assign({ isMember: null }, exports.GLOBALS.__chat__[chatId])];
            }
        });
    }); },
    join: function (chatId) {
        debug("Joins current user in specified chat with chatId=\"" + chatId + "\"");
    }
}); };
exports.getChatMock = getChatMock;
function sendMessageToAll(type, content, fromUser) {
    if (fromUser === void 0) { fromUser = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.message)];
                case 1:
                    _a.sent();
                    debug('Sends message to all chats that running wapp exists in and has permission to send message.');
                    if (type === 'text')
                        return [2 /*return*/];
                    if (type === 'wapp')
                        return [2 /*return*/, content.wisId];
                    return [2 /*return*/];
            }
        });
    });
}
function sendMessageToCurrentChat(type, content, fromUser) {
    if (fromUser === void 0) { fromUser = true; }
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.message)];
                case 1:
                    _a.sent();
                    debug('Sends message only to the current chat if user has the permission.');
                    if (type === 'text')
                        return [2 /*return*/];
                    if (type === 'wapp')
                        return [2 /*return*/, content.wisId];
                    return [2 /*return*/];
            }
        });
    });
}
var getMessageMock = function () { return ({
    sendMessageToAll: sendMessageToAll,
    sendMessageToCurrentChat: sendMessageToCurrentChat
}); };
exports.getMessageMock = getMessageMock;
/******************************************************************************/
var getAudioMock = function () { return ({
    play: function (src) {
        debug("Start playing audio with src=\"" + src + "\"");
    },
    pause: function (src) {
        debug("Pause audio with src=\"" + src + "\"");
    },
    stop: function (src) {
        debug("Stop audio with src=\"" + src + "\"");
    },
    setSeek: function (src, seek) {
        debug("Seeked the playing audio with src=\"" + src + "\" to " + seek + " position");
    },
    setVolume: function (src, volume) {
        debug("Set the volume of playing audio with src=\"" + src + "\" to " + volume);
    }
}); };
exports.getAudioMock = getAudioMock;
/******************************************************************************/
var getAnalyticsMock = function () { return function (type, data) {
    debug("Send analytics event for [" + type + "] with te following data", data);
}; };
exports.getAnalyticsMock = getAnalyticsMock;
/******************************************************************************/
var getImageMock = function () { return ({
    openModal: function (options) {
        debug("Open Image with the src=\"" + options.src + "\" the following config will be applied to enhance image");
    }
}); };
exports.getImageMock = getImageMock;
/******************************************************************************/
var db;
var subscription;
var parserFunction = function (R) {
    var isFunction = function (x) {
        return x.length && typeof x[0] === 'string' && x[0].startsWith('__');
    };
    function apply(f, argsList) {
        // @ts-ignore
        var appliedFirst = f.apply(void 0, parseList(argsList[0]));
        return argsList.length > 1
            ? apply(appliedFirst, argsList.slice(1))
            : appliedFirst;
    }
    function parseFunction(q) {
        var func = R[q[0].slice(2)];
        return q.length > 1 ? apply(func, q.slice(1)) : func;
    }
    // (args)
    var parseList = R.map(function (arg) {
        if (R.type(arg) === 'Array')
            return isFunction(arg)
                ? parseFunction(arg)
                : parseList(arg);
        return arg;
    });
    return parseFunction;
};
var parser = parserFunction(R);
var applySetCall = function (func) {
    db = func(db);
    subscription(db);
    exports.GLOBALS.__db__ = db;
    shareDBStorage.set(db);
};
var setDispatch = function (path, qlite, defaultVal) {
    return applySetCall(R.compose(R.assocPath(path, R.__, db), parser(qlite), R.pathOr(defaultVal, path)));
};
var getShareDBMock = function () { return ({
    get: function (path) {
        if (path === void 0) { path = []; }
        return R.path(path, exports.GLOBALS.__db__);
    },
    getFromServer: function (path) {
        if (path === void 0) { path = []; }
        return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sleep(exports.GLOBALS.config.timing.shareDB)];
                    case 1:
                        _a.sent();
                        if (exports.GLOBALS.__wapps__.wisId)
                            return [2 /*return*/, R.path(path, exports.GLOBALS.__db__)];
                        return [2 /*return*/, false];
                }
            });
        });
    },
    dispatch: function (path, qlite, defaultVal, options) {
        if (options === void 0) { options = {}; }
        setDispatch(path, qlite, defaultVal);
    },
    subscribe: function (func) {
        subscription = func;
    }
}); };
exports.getShareDBMock = getShareDBMock;
