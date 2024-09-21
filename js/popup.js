document.addEventListener('DOMContentLoaded', function () {
    var saveButton = document.getElementById('save');
    var loadButton = document.getElementById('clear');
  
    // 保存笔记
    saveButton.addEventListener('click', function () {
        chrome.storage.local.get({ logs: [] }, (result) => {
          const logs = result.logs;
    
          if (logs.length === 0) {
            alert('No logs to save.');
            return;
          }
    
          const blob = new Blob([logs.join('\n')], { type: 'text/plain' });
          const url = URL.createObjectURL(blob);
    
          // 创建一个下载链接
          const link = document.createElement('a');
          link.href = url;
          link.download = 'user_activity_log.txt';
          document.body.appendChild(link);
    
          // 触发下载
          link.click();
          
          // 清理
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        });

        chrome.storage.local.get(['pages'], (result) => {
          const pages = result.pages || [];
          pages.forEach((page, index) => {
            const blob = new Blob([page.source], { type: 'text/html' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${url}.html`;
            a.click();
            URL.revokeObjectURL(url);
          });
        });
    });
  
    // 清理笔记
    loadButton.addEventListener('click', function () {
        chrome.storage.local.set({ logs: [] }, () => {
            console.log('Clear Log!');
        });
    });

    
});