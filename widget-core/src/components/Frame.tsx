import { createContext, useContext, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

type ResizeObjectType = { width: number, height: number }

interface FrameContextProps {
  $document: Document;
  $window: Window;
}

interface FrameProps extends React.HtmlHTMLAttributes<HTMLIFrameElement> {
  children?: any;
  head?: React.ReactNode;
  title?: string;
  onLoad?: () => void;
  onResize?: (newSize: ResizeObjectType) => void;
}

export const FrameContext = createContext<FrameContextProps>(null);

export default function Frame(props: FrameProps) {
  const { head, children, title = 'frame', onLoad = () => {}, onResize = (fn) => {}, ...rest } = props;
  const frameRef = useRef<HTMLIFrameElement>(null);
  const [mounted, setMounted] = useState(false);
  const [, setCount] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderFrame = () => {
    const context = {
      $document: frameRef.current.contentDocument,
      $window: frameRef.current.contentWindow
    };

    const body = (
      <FrameContext.Provider value={context}>
        <div id="frame">
          {typeof children === 'function' ? children(context) : children}
        </div>
      </FrameContext.Provider>
    );

    return [
      createPortal(head, frameRef.current.contentDocument.head),
      createPortal(body, frameRef.current.contentDocument.body),
    ];
  }

  const handleFrameLoad = () => {
    setCount(c => c + 1);
  }

  return (
    <iframe
      ref={frameRef}
      title={title}
      scrolling="no"
      frameBorder="0"
      onLoad={handleFrameLoad}
      {...rest}
    >
      {mounted && renderFrame()}
    </iframe>
  )
}

export function useFrame() : FrameContextProps {
  return useContext(FrameContext);
}
