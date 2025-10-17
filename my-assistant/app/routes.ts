import {
  type RouteConfig,
  route,
  index,
  layout,
  prefix,
} from "@react-router/dev/routes";

export default [
  index("./routes/home.tsx") // This is the default route at path "/"
] satisfies RouteConfig;
