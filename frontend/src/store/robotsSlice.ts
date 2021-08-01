import {
  createSlice,
  createEntityAdapter,
  createAsyncThunk,
  EntityState,
  EntityId,
  PayloadAction,
} from "@reduxjs/toolkit";
import { v4 as createUniqueId } from "uuid";
import { RootState } from "store";
import { Robot, FetchedRobot, LoadingStatus } from "types";
import { normalize, schema } from "normalizr";
import robotsAPI from "api/robots";
interface RobotsState extends EntityState<Robot> {
  loading: LoadingStatus;
}

const initialState: RobotsState = {
  ids: [],
  entities: {},
  loading: LoadingStatus.idle,
};

export const fetchRobots = createAsyncThunk("robots/fetchRobots", async () => {
  const data: FetchedRobot[] = await robotsAPI.fetchRobots();
  const dataWithIds: Robot[] = data.map((item) => ({
    ...item,
    id: createUniqueId(),
  }));
  const robotSchema = new schema.Entity<Robot>("robots");
  const robotListSchema = new schema.Array(robotSchema);
  const normalized = normalize<
    Robot,
    {
      robots: Record<EntityId, Robot>;
    },
    string[]
  >(dataWithIds, robotListSchema);
  return normalized.entities;
});

export const robotsAdapter = createEntityAdapter<Robot>();

const robotsSlice = createSlice({
  name: "robots",
  initialState: initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<RobotsState["loading"]>) => {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchRobots.pending, (state) => {
      state.loading = LoadingStatus.pending;
    });
    builder.addCase(fetchRobots.fulfilled, (state, action) => {
      robotsAdapter.setAll(state, action.payload.robots);
      state.loading = LoadingStatus.succeeded;
    });
    builder.addCase(fetchRobots.rejected, (state) => {
      state.loading = LoadingStatus.failed;
    });
  },
});

export const { setLoading: setRobotsLoading } = robotsSlice.actions;

export const {
  selectById: selectRobotById,
  selectIds: selectRobotIds,
  selectEntities: selectRobotEntities,
  selectAll: selectAllRobots,
  selectTotal: selectTotalRobots,
} = robotsAdapter.getSelectors((state: RootState) => state.robots);

export const selectRobotsLoading = (state: RootState) => state.robots.loading;
export const selectRobots = (state: RootState) => state.robots;

export default robotsSlice.reducer;
