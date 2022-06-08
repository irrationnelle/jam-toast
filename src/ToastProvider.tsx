import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState
} from 'react';

interface ShowToastOptions {
  name?: string,
  duration: number,
  transitionDuration: number,
}

interface ToastContextProps extends Required<Omit<ShowToastOptions, "name">> {
  message: string;
  showToast: (message: string, options?: Partial<ShowToastOptions>) => void;
  shouldShow: boolean;
  closeToast: () => void;
}

const ToastContext = createContext<ToastContextProps>(null as unknown as any);

interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({children}) => {
  const [shouldShow, setShouldShow] = useState(false);
  const [toastMetaInfos, setToastMetaInfos] = useState<Omit<ShowToastOptions, "duration"> & {message: string}>(null as unknown as any);
  const [duration, setDuration] = useState(-1);

  const showToast = useCallback((message: string, options?: Partial<ShowToastOptions>) => {
    setToastMetaInfos({
      message: message,
      transitionDuration: options?.transitionDuration ?? 400,
    })
    setDuration(options?.duration ?? -1)
    setShouldShow(true);
  }, [])

  const closeToast = useCallback(() => {
    setShouldShow(false);
  }, []);

  useEffect(() => {
    if(!shouldShow || duration === -1) return;

    const timeout = setTimeout(() => {
        setShouldShow(false)
    }, duration)

    return () => {
      clearTimeout(timeout)
    }
  }, [duration, shouldShow])

  const value = useMemo(() => ({
    showToast,
    shouldShow,
    closeToast,
    duration,
    ...toastMetaInfos
  }), [showToast, shouldShow, closeToast, toastMetaInfos])

  return (
    <ToastContext.Provider value={value}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
