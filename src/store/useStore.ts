import { create } from 'zustand';

interface WindowState {
  id: string;
  title: string;
  isOpen: boolean;
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  width: number;
  height: number;
  snapPosition: 'left' | 'right' | 'none';
  originalSize?: { width: number; height: number };
}

interface StoreState {
  windows: Record<string, WindowState>;
  activeWindowId: string | null;
  maxZIndex: number;
  
  openWindow: (id: string, title: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  resizeWindow: (id: string, width: number, height: number) => void;
  snapWindow: (id: string, position: 'left' | 'right' | 'none') => void;
}

export const useStore = create<StoreState>((set) => ({
  windows: {},
  activeWindowId: null,
  maxZIndex: 10,

  openWindow: (id, title) => set((state) => {
    if (state.windows[id]) {
      // If already open, just focus and unminimize
      return {
        windows: {
          ...state.windows,
          [id]: { ...state.windows[id], isMinimized: false, zIndex: state.maxZIndex + 1 }
        },
        activeWindowId: id,
        maxZIndex: state.maxZIndex + 1
      };
    }
    // Open new window with default size
    return {
      windows: {
        ...state.windows,
        [id]: { 
          id, 
          title, 
          isOpen: true, 
          isMinimized: false, 
          isMaximized: false, 
          zIndex: state.maxZIndex + 1,
          width: 800,
          height: 600,
          snapPosition: 'none'
        }
      },
      activeWindowId: id,
      maxZIndex: state.maxZIndex + 1
    };
  }),

  closeWindow: (id) => set((state) => {
    const newWindows = { ...state.windows };
    delete newWindows[id];
    return { windows: newWindows, activeWindowId: null };
  }),

  minimizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMinimized: true }
    },
    activeWindowId: null
  })),

  maximizeWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], isMaximized: !state.windows[id].isMaximized }
    },
    activeWindowId: id,
    maxZIndex: state.maxZIndex + 1
  })),

  focusWindow: (id) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], zIndex: state.maxZIndex + 1, isMinimized: false }
    },
    activeWindowId: id,
    maxZIndex: state.maxZIndex + 1
  })),

  resizeWindow: (id, width, height) => set((state) => ({
    windows: {
      ...state.windows,
      [id]: { ...state.windows[id], width, height }
    }
  })),

  snapWindow: (id, position) => set((state) => {
    const window = state.windows[id];
    const screenWidth = typeof globalThis.window !== 'undefined' ? globalThis.window.innerWidth : 1920;
    const screenHeight = typeof globalThis.window !== 'undefined' ? globalThis.window.innerHeight : 1080;
    
    if (position === 'none') {
      // Restore original size
      return {
        windows: {
          ...state.windows,
          [id]: {
            ...window,
            snapPosition: 'none',
            width: window.originalSize?.width || 800,
            height: window.originalSize?.height || 600
          }
        }
      };
    }
    
    // Save original size before snapping
    const originalSize = window.snapPosition === 'none' 
      ? { width: window.width, height: window.height }
      : window.originalSize;
    
    return {
      windows: {
        ...state.windows,
        [id]: {
          ...window,
          snapPosition: position,
          width: screenWidth / 2,
          height: screenHeight - 32, // Account for menu bar
          originalSize
        }
      }
    };
  }),
}));
