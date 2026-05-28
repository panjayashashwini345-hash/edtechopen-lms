// Toast notification utility
let toastCount = 0;

export interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error' | 'info';
  duration?: number;
}

export const showToast = (message: string, type: 'success' | 'error' | 'info' = 'info', duration = 3000) => {
  const id = `toast-${++toastCount}`;
  const event = new CustomEvent('showToast', {
    detail: { id, message, type, duration }
  });
  window.dispatchEvent(event);
  return id;
};

export const removeToast = (id: string) => {
  const event = new CustomEvent('removeToast', { detail: { id } });
  window.dispatchEvent(event);
};
