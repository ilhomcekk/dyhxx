import { SetState, create } from "zustand";
import { devtools } from "zustand/middleware";
import { requests } from "../helpers/requests";
import { CheckType, QueueParamsType } from "../types";

interface StateAction {
  create: () => Promise<any>;
  check?: CheckType;
  createLoading: boolean;
}

const initialState: StateAction = {
  create: async () => {},
  check: {},
  createLoading: false,
};

const queueStore = create(
  devtools((set: SetState<StateAction>) => ({
    ...initialState,
    create: async (params: QueueParamsType) => {
      set({ createLoading: true, check: {} });
      try {
        const { data } = await requests.queueCreate(params);
        set({ check: data?.queue });
        return data;
      } catch (err) {
        return err;
      } finally {
        set({ createLoading: false });
      }
    },
  }))
);

export default queueStore;
