import { useCallback, useEffect, useState } from "react";
import {
  AppBar,
  Box,
  CircularProgress,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatIcon from "@mui/icons-material/Chat";
import LogoutIcon from "@mui/icons-material/Logout";
import CreateThreadInlineForm from "../molecules/CreateThreadInlineForm";
import { useAppDispatch } from "../../store";
import { signOut } from "../../store/auth";
import {
  refetchThreads,
  fetchMoreThreads,
  selectThreads,
  selectStatus,
} from "../../store/threads";
import { useSelector } from "react-redux";
import useLoggedUser from "../../hooks/useLoggedUser";
import UserSummary from "../molecules/UserSummaryCardHeader";
import ThreadChat from "./ThreadChat";

const drawerWidth = 240;

export default function ThreadListDrawer() {
  const dispatch = useAppDispatch();

  const [selectedThreadId, setSelectedThreadId] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const loggedUser = useLoggedUser();
  const threads = useSelector(selectThreads);
  const status = useSelector(selectStatus);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const handleRefetchThreads = useCallback(
    () => dispatch(refetchThreads() as any),
    [dispatch]
  );

  const handleFetchMoreThreads = useCallback(
    () => dispatch(fetchMoreThreads() as any),
    [dispatch]
  );

  const handleSignOut = useCallback(() => dispatch(signOut()), [dispatch]);

  useEffect(() => {
    handleRefetchThreads();
  }, [handleRefetchThreads]);

  const drawer = (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <UserSummary user={loggedUser} />
      <CreateThreadInlineForm />
      <Divider />
      {status === "pending" && <CircularProgress />}
      <List
        style={{
          overflow: "auto",
          flex: 1,
        }}
      >
        <>
          {threads.length > 0 ? (
            threads.map((thread) => (
              <ListItem
                key={thread.id}
                disablePadding
                onClick={() => setSelectedThreadId(thread.id)}
              >
                <ListItemButton>
                  <ListItemIcon>
                    <ChatIcon />
                  </ListItemIcon>
                  <ListItemText primary={thread.title} />
                </ListItemButton>
              </ListItem>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="Il n'y a pas de file de discussion" />
            </ListItem>
          )}
          {status === "resolved" && (
            <div
              ref={(el) => {
                if (el) {
                  const observer = new IntersectionObserver((entries) => {
                    if (entries[0].isIntersecting) {
                      handleFetchMoreThreads();
                    }
                  });
                  observer.observe(el);
                }
              }}
            />
          )}
        </>
      </List>
      <Divider />
      <List style={{ flex: 0 }}>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Se déconnecter" onClick={handleSignOut} />
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window.document.body : undefined;

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          {selectedThreadId !== null && (
            <Typography variant="h6" noWrap component="div">
              {threads.find((thread) => thread.id === selectedThreadId)?.title}
            </Typography>
          )}
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              overflow: "hidden",
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          height: "100%",
          padding: 0,
        }}
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        {selectedThreadId !== null && (
          <ThreadChat key={selectedThreadId} threadId={selectedThreadId} />
        )}
      </Box>
    </Box>
  );
}
