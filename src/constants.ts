export const TOP_BAR_HEIGHT = 70
export const DRAWER_WIDTH = 240;

export const PAGE_ROUTES = {
  highlights: { path: "/highlights", name: "Highlights" },
  stats: { path: "/stats", name: "Statistics" },
  users: { path: "/users", name: "Users" }
};

export const API_URL = "http://77.54.1.149:6580/gateway"//process.env.NEXT_PUBLIC_API_URL

export const API_ROUTES = {
  login: {be:"/authentication/login", api:"/api/auth/login"},
  transactions: {be:"/transactions/superadmin/stats", api:"/api/stats"},
  users: {be:"/accounts/superadmin/user", api:"/api/users"},
  user: {be:"/accounts/user", api:"/api/user"},

 
}