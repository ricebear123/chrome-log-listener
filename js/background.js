// 首次安装插件、插件更新、chrome浏览器更新时触发
chrome.runtime.onInstalled.addListener(() => {
  console.log("Extention has been installed!");
  console.log("Please check the logs whether they stand for correct proccesses.");
  chrome.storage.local.set({'result': [1,2,3]});
});

//保证用户的行为能够定位到某个网址，也即页面上
const WRITEABLE_FLAG = true;
var jsonStructure = {
  "time": "",
  "Timestamp": -1,
  "ActivatedWindowID": -1,
  "ActivatedURL": ""
};
var temp_list = [];

chrome.tabs.onActivated.addListener(function(activeInfo){
  //console.log("NEW_LOG_START");
  //console.log("Time: {" + Date.now() + "}" + "TabID: {" + activeInfo.tabId + "}" + "WindowsID: {" + activeInfo.windowId + "}" +);
  //console.log("TabID: {" + activeInfo.tabId + "}");
  //console.log("WindowsID: {" + activeInfo.windowId + "}");
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    console.log("Time: {" + Date.now() + "}" + " TabID: {" + activeInfo.tabId + "}" + " WindowsID: {" + activeInfo.windowId + "}" + 'ActivatedURL: {', tab.url + "}");
  });
});

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.url) {
    let logJson = {
      Time: "{" + Date.now() + "}",
      TabID: "{" + tabId + "}",
      URLChanged: "{" + changeInfo.url + "}"
    }
    let infoStr = JSON.stringify(logJson);
    
    chrome.storage.local.get({ logs: [] }, (result) => {
      let logs = result.logs; // 获取现有的日志列表，默认为空数组
      logs.push(infoStr); // 添加新的日志条目

      chrome.storage.local.set({ logs: logs }, () => {
        console.log('New log added:', infoStr);
      });
    });
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  let infoJson = {
    Time: "{" + Date.now() + "}"
  }
  // 检测用户键入信息
  if (message.timestamp) {
    infoJson.InputDetected = sender.tab;
    infoJson.InputDetails = message;
  }

  // 检测用户点击信息
  if (message.action === "elementClicked") {
    infoJson.ClickDetected = sender.tab;
    infoJson.ElementDetails = message.elementDetails;
  }
  let infoStr = JSON.stringify(infoJson);

  chrome.storage.local.get({ logs: [] }, (result) => {
    let logs = result.logs; // 获取现有的日志列表，默认为空数组
    logs.push(infoStr); // 添加新的日志条目

    chrome.storage.local.set({ logs: logs }, () => {
      console.log('New log added:', infoStr);
    });
  });
});
