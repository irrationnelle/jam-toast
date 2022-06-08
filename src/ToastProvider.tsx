import React, {
  createContext,
  CSSProperties,
  ReactElement,
  ReactNode,
  useCallback,
  useContext,
  useMemo,
  useState
} from 'react';

interface ShowToastOptions {
  name?: string,
  duration?: number,
  transitionAnimation?: string,
  transitionDuration?: number,
  renderToastBar?: React.Component,
  shouldPile?: boolean,
  pileDirection?: 'top' | 'bottom',
}

interface ToastContextProps  {
  message: string;
  setMessage: (value: string) => void;
  showToast: (message: string, options?: ShowToastOptions) => void;
}

const ToastContext = createContext<ToastContextProps>(null as unknown as any);

interface ToastProviderProps {
  children: ReactNode;
}

const {Toast, show} = createToastMetaData();

const createToastMetaData = () => {
  return {
    id: uuidv4(),
    name: 'some title',
    duration: '1000ms',
    transitionAnimation: 'opacity',
    transitionDuration: '1s',
    message: "some message",
    renderToastBar: React.Component,

    // useToast 의존성을 가지는 컴포넌트들이 re-render 되는 것은 이번에는 안고 간다.
    // 다수의 Toast 를 쌓을 때
    shouldPile: true,
    pileDirection: 'top' | 'bottom',

    close: (target: {name: string, id: string}) => { console.log("close: ", target) },
    show: (target: {name?: string, id?: string}) => { console.log("show: ", target) },
    onClose: (ctx: any) => {
      const handleContext  = (ctx: any) => { console.log(ctx) };
      handleContext(ctx);
    },
    onShow: (ctx: any) => {
      const handleContext  = (ctx: any) => { console.log(ctx) };
      handleContext(ctx);
    }
  }
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
  const [message, setMessage] = useState("");
  const [toasts, setToasts] = useState();
  const [toastComponent, setToastComponent] = useState<ReactElement>(React.createElement('div', null, ''));
  const [toastMetaDatas, setToastMetaDatas] = useState<(Partial<ShowToastOptions> & {message: string})[]>([]);

  const showToast = useCallback((message: string, options?: ShowToastOptions) => {
    setMessage(message);
    setToastMetaDatas((prev) => [...prev, {
      name: options?.name ?? 'basic',
      message: message,
      transitionAnimation: options?.transitionAnimation ?? 'opacity',
      transitionDuration: options?.transitionDuration ?? 500,
      duration: options?.duration ?? 1000,
      renderToastBar: options?.renderToastBar,
      shouldPile: options?.shouldPile ?? true,
      pileDirection: options?.pileDirection ?? 'bottom',
    }])
  }, [])

  const value = useMemo(() => ({
    message,
    setMessage,
    showToast
  }), [message, setMessage, showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
