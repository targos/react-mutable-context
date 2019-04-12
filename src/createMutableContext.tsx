import React, {
  createContext,
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
    context.getValueAndSetter()
  );
  const { Provider: ReactProvider } = reactContext;

  function MutableContextProvider(props: IProviderProps) {
    const [value, setValue] = useState(() => context.getValueAndSetter());
    useEffect(() => {
      const cb = () => {
        setValue(context.getValueAndSetter());
      };
      context.subscribe(cb);
      const currentValue = context.getValue();
      if (value[0] !== currentValue) {
        // Value changed before we added the callback
        cb();
      }
      return () => context.unsubscribe(cb);
    }, []);
    return <ReactProvider value={value}>{props.children}</ReactProvider>;
  }

  function useMutableContext() {
    return useContext(reactContext);
  }

  return {
    Provider: MutableContextProvider,
    use: useMutableContext,
    getValue: context.getValue,
    setValue: context.setValue
  };
}
