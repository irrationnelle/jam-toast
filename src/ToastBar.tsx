import React from 'react';
import {toastBar} from "./ToastBar.css";

interface ToastBarProps {
  message: string;
}

const ToastBar: React.FC<ToastBarProps> = ({message}) => {
  return (
    <div className={toastBar}>
      {message}
    </div>
  );
};

export default ToastBar;