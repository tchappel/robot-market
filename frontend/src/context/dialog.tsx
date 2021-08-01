import {
  createContext,
  useReducer,
  useContext,
  ReactNode,
  Dispatch,
} from "react";
import SimpleDialog from "components/SimpleDialog";

type DialogState = {
  open: boolean;
  title: string;
  content: string;
};

const dialogStateInitialValue: DialogState = {
  open: false,
  title: "",
  content: "",
};

type ActionType =
  | {
      type: "OPEN_DIALOG";
      payload: Partial<DialogState>;
    }
  | {
      type: "CLOSE_DIALOG";
    }
  | { type: string; payload: any };

const DialogStateContext = createContext(dialogStateInitialValue);
const DialogDispatchContext = createContext<
  Dispatch<ActionType> | (<A>(a: A) => void)
>(() => {});

const dialogReducer = (
  state: typeof dialogStateInitialValue,
  action: ActionType
) => {
  switch (action.type) {
    case "OPEN_DIALOG": {
      return {
        ...state,
        ...action.payload,
        open: true,
      };
    }
    case "CLOSE_DIALOG": {
      return { ...dialogStateInitialValue };
    }
    default: {
      throw new Error(
        `dialogReducer error: unhandled action type: ${action.type}`
      );
    }
  }
};

type DialogProviderProps = {
  children: ReactNode;
};

export const DialogProvider = ({ children }: DialogProviderProps) => {
  const [state, dispatch] = useReducer(dialogReducer, dialogStateInitialValue);
  const { open, title, content } = state;
  return (
    <DialogStateContext.Provider value={state}>
      <DialogDispatchContext.Provider value={dispatch}>
        <SimpleDialog
          open={open}
          title={title}
          content={content}
          onClose={() =>
            dispatch({
              type: "CLOSE_DIALOG",
            })
          }
        />
        {children}
      </DialogDispatchContext.Provider>
    </DialogStateContext.Provider>
  );
};

export const useDialogState = () => {
  const dialogState = useContext(DialogStateContext);
  if (typeof dialogState === "undefined") {
    throw new Error("useDialogState must be used within a DialogProvider");
  }
  return dialogState;
};

export const useDialogDispatch = () => {
  const dialogDispatch = useContext(DialogDispatchContext);
  if (typeof dialogDispatch === "undefined") {
    throw new Error("useDialogDispatch must be used within a DialogProvider");
  }
  // return useCallback(() => dialogDispatch, [dialogDispatch]);
  return dialogDispatch;
};
