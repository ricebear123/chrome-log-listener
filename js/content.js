function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  
  //用来监听用户键盘输入（间隔为1ms）
  const handleInput = debounce(function(event) {
    const inputDetails = {
      type: event.type,
      value: event.target.value,
      id: event.target.id,
      className: event.target.className,
      tagName: event.target.tagName,
      timestamp: Date.now()
    };
    // 用户停止输入后1ms将结果传去background
    chrome.runtime.sendMessage(inputDetails);
  }, 1); // 1ms 等待时间
  
  // 利用上面的debounce函数进行监听
  document.addEventListener('input', handleInput);
  
  //用来监听用户点击
  document.addEventListener('click', function(event) {
    const elementDetails = {
      tagName: event.target.tagName, // 所点击element的tag name
      id: event.target.id, // 所点击element的ID
      className: event.target.className, // 所点击element属于的class
      text: event.target.innerText || event.target.value, // 所点击element的text和value
      path: event.composedPath().map(el => el.tagName).join(' > ') ,// 所点击的element路径
      timestamp: Date.now()
    };
    // 将所点击的element信息送去background
    chrome.runtime.sendMessage({action: "elementClicked", elementDetails: elementDetails});
  }, false);

