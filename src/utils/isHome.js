

const isHome = pathname => {
  if (!window) return;
  return pathname === "/home";
};

export default isHome;
