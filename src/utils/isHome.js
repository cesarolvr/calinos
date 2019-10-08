

const isHome = pathname => {
  if (!window) return;
  console.log(pathname === '/home');
  return pathname === "/home";
};

export default isHome;
