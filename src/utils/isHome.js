import * as R from "ramda";

const isHome = () => {
  if (!window) return;
  const routeName = R.path(["location", "pathname"], window);
  console.log(routeName);
  return routeName === "/home";
};

export default isHome;
