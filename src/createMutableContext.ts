import {
  createContext,
  createElement,
  useContext,
  useEffect,
  useState,
  ReactNode
} from 'react';

import MutableContext, { MutableContextValue } from './MutableContext';

interface IProviderProps {
  children: ReactNode;
}

export function createMutableContext<T>(initialValue: T) {
  const context = new MutableContext(initialValue);
  const reactContext = createContext<MutableContextValue<T>>(
    context.getValue()
  );

  function MutableContextProvider(props: IProviderProps) {
    const [value, setValue] = useState(() => context.getValue());
    useEffect(() => {
      const cb = () => {
        setValue(context.getValue());
      };
      context.subscribe(cb);
      return () => context.unsubscribe(cb);
    }, []);
    return createElement(reactContext.Provider, { value }, props.children);
  }

  function useMutableContext() {
    return useContext(reactContext);
  }

  return {
    Provider: MutableContextProvider,
    use: useMutableContext
  };
}
