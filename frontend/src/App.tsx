import { useEffect } from "react";
import { LoadingStatus } from "types";
import { useStoreDispatch, useStoreSelector } from "store/hooks";
import {
  fetchRobots,
  setRobotsLoading,
  selectAllRobots,
} from "store/robotsSlice";
import AppLayout from "components/AppLayout";
import MainContent from "components/MainContent";
import DrawerContent from "components/DrawerContent";
import { isEmptyObject } from "services/logic";

// import useCart from "hooks/useCart";

const App = () => {
  const storeDispatch = useStoreDispatch();
  const allRobots = useStoreSelector(selectAllRobots);

  useEffect(() => {
    if (isEmptyObject(allRobots)) {
      storeDispatch(fetchRobots());
    } else {
      storeDispatch(setRobotsLoading(LoadingStatus.succeeded));
    }
  }, [storeDispatch, allRobots]);

  return (
    <AppLayout
      drawerContent={<DrawerContent />}
      mainContent={<MainContent />}
    />
  );
};

export default App;
