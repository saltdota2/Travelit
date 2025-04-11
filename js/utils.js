export function showNotification(message, isError = false) {
    const toast = document.getElementById('toast');
    if (!toast) return;
  
    toast.textContent = message;
    toast.className = 'toast show' + (isError ? ' error' : '');
  
    setTimeout(() => {
      toast.className = 'toast';
    }, 3000);
  }