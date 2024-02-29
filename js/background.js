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
    //console.log("NEW_LOG_START");
    console.log("Time: {" + Date.now() + "}" + " TabID: {" + tabId + "}" + " URLChanged: {" + changeInfo.url + "}");
    //console.log("TabID: {" + tabId + "}");
    //console.log("URLChanged: {" + changeInfo.url + "}");
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // 检测用户键入信息
  if (message.timestamp) {
    console.log(`Time: {${Date.now()}}` + " InputDetected:" , sender.tab + " InputDetails:" , message);
    //console.log("InputDetected:", sender.tab);
    //console.log("InputDetails:", message);
  }

  // 检测用户点击信息
  if (message.action === "elementClicked") {
    console.log(`Time: {${Date.now()}}` + " ClickDetected:" , sender.tab + " ElementDetails:" , message.elementDetails);
    //console.log("ClickDetected:", sender.tab);
    //console.log("ElementDetails:", message.elementDetails);
  }
});
