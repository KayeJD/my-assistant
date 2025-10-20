import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("some/path", "pages/Dashboard/dashboard.tsx"),
] satisfies RouteConfig;
