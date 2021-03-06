import * as React from 'react';

interface ModalContextAPI {
  show: boolean;
  overflow: boolean;
  labelledById?: string;
  watchOverflow: (position: number) => void;
  onClose: () => void;
}

const ModalContext = React.createContext<ModalContextAPI>(
  {} as ModalContextAPI
);

export default ModalContext;
