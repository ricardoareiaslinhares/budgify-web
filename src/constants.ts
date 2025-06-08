export const TOP_BAR_HEIGHT = 70
export const DRAWER_WIDTH = 240;

export const PAGE_ROUTES = {
  highlights: { path: "/highlights", name: "Highlights" },
  stats: { path: "/stats", name: "Statistics" },
  users: { path: "/users", name: "Users" }
};

export const API_URL = process.env.NEXT_PUBLIC_API_URL

export const API_ROUTES = {
  login: "/authentication/login",
  transactions: "/transactions/superadmin/stats",
  users: "/accounts/superadmin/user",
  user: "/accounts/user",
  deactivateUser:"/accounts/superadmin/user", // method delete
  activateUser:"/accounts/superadmin/user" // method patch
 
}