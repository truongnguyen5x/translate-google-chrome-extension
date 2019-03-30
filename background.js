'use strict';
chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({
        id: 'key',
        title: 'Dịch',
        type: 'normal',
        contexts: ['selection'],
    });
});
chrome.contextMenus.onClicked.addListener(function (info, tab) {
    const text = info.selectionText.replace(/\s{2,}/g, ' ').replace('’','\'');
    const api = 'http://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=vi&dt=t&q=' + text + '&ie=UTF-8&oe=UTF-8';
    const http = new XMLHttpRequest();
    http.open('GET', api, true);
    http.send();
    http.onreadystatechange = (e) => {
        if (http.readyState == 4 && http.status == 200) {
            const resp = http.responseText;
            const resp2 = JSON.parse("[" + resp + "]");
            showWindow(resp2[0][0]);
            console.log(resp2[0][0]);
        }
    }
});

function showWindow(text) {
    chrome.storage.sync.set({text: text}, function () {
             chrome.windows.create({
            url: chrome.runtime.getURL("mypage.html"),
            type: "popup",
            width: 400,
            height: 370,
            left: 0,
            top: 0,
            focused: true
        });
    });
}