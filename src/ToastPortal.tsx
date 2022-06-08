import React, { ReactNode } from 'react';
import { createPortal } from "react-dom";

const ToastPortal: React.FC<{children: ReactNode, element: string }> = ({children, element}) => {
  const modalElement = document.querySelector(element);
  if(!modalElement) throw new Error('A provided selector is not present')
  return createPortal(children, modalElement!)
};

export default ToastPortal;