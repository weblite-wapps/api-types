"use strict";
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
exports.mockWebliteApi = void 0;
var W = window.W;
var mockWebliteApi = function (_a) {
    var input_user = _a.user;
    if (process.env.NODE_ENV === 'development' && !W) {
        var loggerUI_1 = {
            scope: 'color:#9cc3db;background-color:#3e4a52;padding:2px 5px;border-radius:4px',
            type: 'color:#171717;background-color:#7cb342;padding:2px 5px;border-radius:4px'
        };
        var logger_1 = function (scopeType) {
            var args = [];
            for (var _i = 1; _i < arguments.length; _i++) {
                args[_i - 1] = arguments[_i];
            }
            return function () {
                var args2 = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args2[_i] = arguments[_i];
                }
                var _a = scopeType.split(':'), scope = _a[0], type = _a[1];
                console.log.apply(console, __spreadArray(__spreadArray(['🌱', "%c" + scope, loggerUI_1.scope, type ? ":%c" + type : '', type ? loggerUI_1.scope : ''], args), args2));
            };
        };
        window.W = {
            setHooks: function (_a) {
                var wappWillStart = _a.wappWillStart, wappDidStart = _a.wappDidStart, onHalt = _a.onHalt, onNotif = _a.onNotif;
                if (wappWillStart)
                    wappWillStart(logger_1('wappWillStart:start'), 
                    // @ts-ignore
                    function (error) { return new Error(error); }, logger_1('wappWillStart:info', { mode: 'inline' }));
                if (wappDidStart)
                    // @ts-ignore
                    wappDidStart(logger_1('wappDidStart:info', { mode: 'inline' }));
                if (onHalt)
                    // @ts-ignore
                    onHalt(logger_1('onHalt:info', { mode: 'inline' }));
                if (onNotif)
                    onNotif(
                    // @ts-ignore
                    logger_1('onNotif:info', {
                        id: 'string',
                        title: 'string',
                        body: 'string',
                        wisId: 'string',
                        created_at: 'Date'
                    }));
            },
            user: {
                getId: function () { return input_user.id || '1e234e5678b91234567f8f9c'; },
                getFirstname: function () { return input_user.firstname || 'firstname'; },
                getLastname: function () { return input_user.lastname || 'lastname'; },
                getUsername: function () { return input_user.username || 'username'; },
                getProfileImage: function () {
                    return input_user.profileImage || 'https://picsum.photos/200?random=1';
                },
                getBio: function () { return input_user.bio || 'bio'; },
                getInfo: function () { return ({
                    id: input_user.id || '1e234e5678b91234567f8f9c',
                    username: input_user.username || 'username'
                }); },
                getProfile: function (section) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                    return [2 /*return*/, logger_1('user:getProfile', 'userProfile')];
                }); }); }
            },
            images: {
                openModal: logger_1('images:openModal', {
                    src: 'string',
                    'width?': 'number',
                    'hieght?': 'number'
                })
            },
            initializeAsync: function () { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
                return [2 /*return*/];
            }); }); }
        };
    }
};
exports.mockWebliteApi = mockWebliteApi;
