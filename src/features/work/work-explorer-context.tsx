"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useTransition,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  type TransitionStartFunction,
} from "react";
import {
  EMPTY_WORK_EXPLORER_STATE,
  type WorkExplorerState,
} from "./work.filters";

interface WorkExplorerContextValue {
  state: WorkExplorerState;
  setState: Dispatch<SetStateAction<WorkExplorerState>>;
  clearFilters: () => void;
  startTransition: TransitionStartFunction;
  isPending: boolean;
}

const WorkExplorerContext = createContext<WorkExplorerContextValue | null>(null);

export function WorkExplorerProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<WorkExplorerState>(EMPTY_WORK_EXPLORER_STATE);
  const [isPending, startTransition] = useTransition();

  const clearFilters = useCallback(() => {
    startTransition(() => {
      setState(EMPTY_WORK_EXPLORER_STATE);
    });
  }, [startTransition]);

  const value = useMemo(
    () => ({
      state,
      setState,
      clearFilters,
      startTransition,
      isPending,
    }),
    [state, clearFilters, startTransition, isPending],
  );

  return (
    <WorkExplorerContext.Provider value={value}>
      {children}
    </WorkExplorerContext.Provider>
  );
}

export function useWorkExplorer(): WorkExplorerContextValue {
  const context = useContext(WorkExplorerContext);
  if (!context) {
    throw new Error("useWorkExplorer must be used within WorkExplorerProvider");
  }
  return context;
}

/** Optional access — explorer stays renderable outside the provider. */
export function useOptionalWorkExplorer(): WorkExplorerContextValue | null {
  return useContext(WorkExplorerContext);
}
