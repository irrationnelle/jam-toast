import React from 'react';

import { toast } from './Toast.css';
import ToastBar from './ToastBar';
import ToastPortal from "./ToastPortal";
import { useToast } from './ToastProvider';

const Toast = () => {
  const { message } = useToast();

  return (
    <ToastPortal element="body">
      <div className={toast}>
        <ToastBar  message={message}/>
      </div>
    </ToastPortal>
  );
};

export default Toast;