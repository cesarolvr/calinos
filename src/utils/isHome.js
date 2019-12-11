

const isHome = pathname => {
  if (!window) return;
  return pathname === "/inicio";
};

export default isHome;
