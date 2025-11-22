import React, { useRef, useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { X, Minus, Maximize2, Minimize2 } from 'lucide-react';
import { useStore } from '../../store/useStore';
import gsap from 'gsap';
import { useMediaQuery } from '../../hooks/useMediaQuery';

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({ id, children }) => {
  const { windows, closeWindow, minimizeWindow, maximizeWindow, focusWindow, resizeWindow } = useStore();
  const windowState = windows[id];
  const nodeRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef(null);
  const [isResizing, setIsResizing] = useState(false);
  const { isMobile } = useMediaQuery();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  if (!windowState || !windowState.isOpen) return null;

  useEffect(() => {
    if (windowState.isOpen && !windowState.isMinimized) {
      gsap.fromTo(nodeRef.current, 
        { scale: 0.8, opacity: 0 }, 
        { scale: 1, opacity: 1, duration: 0.3, ease: "back.out(1.2)" }
      );
    }
  }, [windowState.isOpen, windowState.isMinimized]);

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    gsap.to(nodeRef.current, {
      scale: 0.8,
      opacity: 0,
      duration: 0.2,
      onComplete: () => closeWindow(id)
    });
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    gsap.to(nodeRef.current, {
      scale: 0,
      opacity: 0,
      y: 500,
      x: 0,
      duration: 0.4,
      onComplete: () => minimizeWindow(id)
    });
  };

  useEffect(() => {
    // Center the window on mount
    if (windowState.isOpen && !windowState.isMaximized && windowState.snapPosition === 'none' && !isMobile) {
      const x = (window.innerWidth - windowState.width) / 2;
      const y = (window.innerHeight - windowState.height) / 2;
      setPosition({ x, y });
    }
  }, []); // Run once on mount

  const handleDragStart = () => {
    focusWindow(id);
  };

  const handleStop = (_e: any, data: any) => {
    setPosition({ x: data.x, y: data.y });
  };

  const handleResizeStart = (e: React.MouseEvent, handle: string) => {
    e.preventDefault();
    e.stopPropagation();
    setIsResizing(true);
    focusWindow(id);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = windowState.width;
    const startHeight = windowState.height;
    const startPosX = position.x;
    const startPosY = position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newX = startPosX;
      let newY = startPosY;

      // Handle different resize directions
      if (handle.includes('e')) {
        newWidth = Math.max(400, startWidth + deltaX);
      }
      if (handle.includes('w')) {
        newWidth = Math.max(400, startWidth - deltaX);
        newX = startPosX + (startWidth - newWidth);
      }
      if (handle.includes('s')) {
        newHeight = Math.max(300, startHeight + deltaY);
      }
      if (handle.includes('n')) {
        newHeight = Math.max(300, startHeight - deltaY);
        newY = startPosY + (startHeight - newHeight);
      }

      resizeWindow(id, newWidth, newHeight);
      setPosition({ x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };


    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const getWindowStyle = () => {
    if (isMobile) {
      return {
        width: '100vw',
        height: 'calc(100% - 6rem)',
        top: 0,
        left: 0,
      };
    }
    if (windowState.isMaximized) {
      return {
        width: '100vw',
        height: 'calc(100vh - 2rem)',
        top: '32px',
        left: 0,
      };
    }
    return {
      width: windowState.width,
      height: windowState.height,
    };
  };

  const canResize = !windowState.isMaximized && !isMobile;

  return (
    <>
      <Draggable
        handle=".window-header"
        nodeRef={nodeRef}
        onStart={handleDragStart}
        onStop={handleStop}
        position={windowState.isMaximized || isMobile ? { x: 0, y: 0 } : position}
        disabled={windowState.isMaximized || isMobile}
      >
        <div
          ref={nodeRef}
          className={`absolute transition-all duration-200 ease-in-out
            ${windowState.isMinimized ? 'hidden' : ''}
            ${isResizing ? 'select-none' : ''}
          `}
          style={{ 
            zIndex: windowState.zIndex,
            ...getWindowStyle()
          }}
          onClick={() => focusWindow(id)}
        >
          <div className="w-full h-full bg-mac-window backdrop-blur-xl rounded-xl shadow-2xl border border-white/20 flex flex-col overflow-hidden">
            {/* Window Header */}
            <div className="window-header h-10 bg-gray-200/50 border-b border-gray-300/50 flex items-center px-4 space-x-2 cursor-default">
              <div className="flex space-x-2 group/controls">
                <button 
                  onClick={handleClose}
                  className="w-4 h-4 rounded-full bg-[#FF5F56] border border-[#E0443E] flex items-center justify-center text-black/0 group-hover/controls:text-black/50 transition-colors"
                >
                  <X size={10} strokeWidth={3} />
                </button>
                <button 
                  onClick={handleMinimize}
                  className="w-4 h-4 rounded-full bg-[#FFBD2E] border border-[#DEA123] flex items-center justify-center text-black/0 group-hover/controls:text-black/50 transition-colors"
                >
                  <Minus size={10} strokeWidth={3} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); maximizeWindow(id); }}
                  className="w-4 h-4 rounded-full bg-[#27C93F] border border-[#1AAB29] flex items-center justify-center text-black/0 group-hover/controls:text-black/50 transition-colors"
                >
                  {windowState.isMaximized ? <Minimize2 size={10} strokeWidth={3} /> : <Maximize2 size={8} strokeWidth={3} />}
                </button>
              </div>
              <div className="flex-1 text-center text-sm font-medium text-gray-600 select-none">
                {windowState.title}
              </div>
            </div>

            {/* Window Content */}
            <div ref={contentRef} className="flex-1 overflow-auto relative">
              {children}
            </div>
          </div>

          {/* Resize Handles */}
          {canResize && (
            <>
              {/* Corner handles */}
              <div onMouseDown={(e) => handleResizeStart(e, 'nw')} className="absolute top-0 left-0 w-4 h-4 cursor-nw-resize bg-transparent opacity-0 z-50" />
              <div onMouseDown={(e) => handleResizeStart(e, 'ne')} className="absolute top-0 right-0 w-4 h-4 cursor-ne-resize bg-transparent opacity-0 z-50" />
              <div onMouseDown={(e) => handleResizeStart(e, 'sw')} className="absolute bottom-0 left-0 w-4 h-4 cursor-sw-resize bg-transparent opacity-0 z-50" />
              <div onMouseDown={(e) => handleResizeStart(e, 'se')} className="absolute bottom-0 right-0 w-4 h-4 cursor-se-resize bg-transparent opacity-0 z-50" />
              
              {/* Edge handles */}
              <div onMouseDown={(e) => handleResizeStart(e, 'n')} className="absolute top-0 left-4 right-4 h-2 cursor-n-resize bg-transparent opacity-0 z-50" />
              <div onMouseDown={(e) => handleResizeStart(e, 's')} className="absolute bottom-0 left-4 right-4 h-2 cursor-s-resize bg-transparent opacity-0 z-50" />
              <div onMouseDown={(e) => handleResizeStart(e, 'w')} className="absolute left-0 top-4 bottom-4 w-2 cursor-w-resize bg-transparent opacity-0 z-50" />
              <div onMouseDown={(e) => handleResizeStart(e, 'e')} className="absolute right-0 top-4 bottom-4 w-2 cursor-e-resize bg-transparent opacity-0 z-50" />
            </>
          )}
        </div>
      </Draggable>
    </>
  );
};