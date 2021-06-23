"use strict";
exports.__esModule = true;
exports.mockWebliteApi = void 0;
var core_1 = require("./core");
var W = window.W;
var mockWebliteApi = function (mock) {
    if (process.env.NODE_ENV !== 'development' || W)
        return;
    core_1.setDefaultValueForMissingProps(mock);
    core_1.scopeInitiation();
    console.log('send(wappCommunicateCoreLoaded())');
    window.W = {
        setHooks: core_1.setHooks,
        initializeAsync: core_1.initializeAsync,
        user: core_1.getUserMock(),
        users: core_1.getUsersMock(),
        wapp: core_1.getWappsMock(),
        chats: core_1.getChatMock(),
        messages: core_1.getMessageMock(),
        audioSystem: core_1.getAudioMock(),
        analytics: core_1.getAnalyticsMock(),
        images: core_1.getImageMock(),
        shareDB: core_1.getShareDBMock()
    };
};
exports.mockWebliteApi = mockWebliteApi;
