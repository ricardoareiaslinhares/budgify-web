export const TOP_BAR_HEIGHT = 70;
export const DRAWER_WIDTH = 240;

export const GENRES = [
  { label: "Male", value: 0 },
  { label: "Female", value: 1 },
  //{ label: "Other", value: -1 },
];

export const PAGE_ROUTES = {
  highlights: { path: "/highlights", name: "Highlights" },
  stats: { path: "/stats", name: "Statistics" },
  users: { path: "/users", name: "Users" },
  login: { path: "/login", name: "" },
};

export const API_URL = "http://77.54.1.149:6580/gateway"; //process.env.NEXT_PUBLIC_API_URL

// be: means the budgify server and api: means the front-end next server
export const API_ROUTES = {
  login: { be: "/authentication/login", api: "/api/auth/login" },
  transactions: { be: "/transactions/superadmin/stats", api: "/api/stats" },
  users: { be: "/accounts/superadmin/user", api: "/api/users" },
  user: { be: "/accounts/user", api: "/api/user" },
  logout: { api: "api/auth/logout" },
};
