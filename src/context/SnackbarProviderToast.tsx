import React, { createContext, useContext, ReactNode } from 'react';
import Toast from 'react-native-toast-message';

type SnackbarVariant = 'success' | 'error' | 'warning' | 'info';

interface SnackbarOptions {
  variant?: SnackbarVariant;
  position?: 'top' | 'bottom';
}

interface SnackbarContextType {
  enqueueSnackbar: (message: string, options?: SnackbarOptions) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined,
);

export const useSnackbar = (): SnackbarContextType => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error('useSnackbar must be used within a SnackbarProvider');
  }
  return context;
};

interface SnackbarProviderProps {
  children: ReactNode;
}

export const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
  children,
}) => {
  const enqueueSnackbar = (message: string, options: SnackbarOptions = {}) => {
    const type = options.variant ?? 'success';
    const position = options.position ?? 'top';

    Toast.show({
      type,
      position,
      text1: message,
      visibilityTime: 2500,
       topOffset: 100,
    });
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
    </SnackbarContext.Provider>
  );
};
