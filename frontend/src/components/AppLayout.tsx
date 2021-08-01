import { ReactNode } from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import Box from "@material-ui/core/Box";

const drawerWidth = 350;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
      padding: theme.spacing(0, 3),
      left: "auto",
      right: 0,
    },
    drawerContainer: {
      overflow: "auto",
    },
    content: {
      flexGrow: 1,
    },
  })
);

type AppLayoutProps = {
  mainContent: ReactNode;
  drawerContent: ReactNode;
};

const AppLayout = ({ mainContent, drawerContent }: AppLayoutProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap component="h1">
            Robot Market
          </Typography>
        </Toolbar>
      </AppBar>
      <main className={classes.content}>
        <Toolbar />
        {mainContent}
      </main>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
          <Box display="flex" justifyContent="center" p={3}>
            <ShoppingCartOutlinedIcon style={{ fontSize: 50 }} />
          </Box>
          {drawerContent}
        </div>
      </Drawer>
    </div>
  );
};

export default AppLayout;
