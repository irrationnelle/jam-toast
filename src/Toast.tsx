import React, {ReactNode} from 'react';

import {toast, toastEnter, toastEnterActive, toastExit, toastExitActive} from './Toast.css';
import ToastBar from './ToastBar';
import ToastPortal from "./ToastPortal";
import { useToast } from './ToastProvider';
import { CSSTransition } from "react-transition-group";

interface ToastProps {
  children?: ReactNode
}

const Toast: React.FC<ToastProps> = ({children}: ToastProps) => {
  const { message, shouldShow, transitionDuration } = useToast();

  return (
    <ToastPortal element="body">
      <div className={toast}>
        <CSSTransition
          in={shouldShow}
          timeout={transitionDuration ?? 300}
          classNames={{
            enter: toastEnter,
            enterActive: toastEnterActive,
            exit: toastExit,
            exitActive: toastExitActive
          }}
          mountOnEnter
          unmountOnExit
        >
         {children ?? <ToastBar message={message}/>}
        </CSSTransition>
      </div>
    </ToastPortal>
  );
};

export default Toast;