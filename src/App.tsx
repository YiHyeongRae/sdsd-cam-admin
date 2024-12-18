import Authorization from "./components/AuthGuard";
import Layout from "./layout";
import "./styles/index.css";
import {
  createBrowserRouter,
  RouterProvider,
  LoaderFunction,
  ActionFunction,
} from "react-router-dom";
import { IRouteTypes, PagesTypes } from "./data/types/routes";
import { RecoilRoot } from "recoil";

const authList: string[] = ["/", "/login", "/changepw"];

const pages: PagesTypes = import.meta.glob("./pages/**/*.tsx", { eager: true });
const routes: IRouteTypes[] = [];

for (const path of Object.keys(pages)) {
  const fileName = path.match(/\.\/pages\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes("$")
    ? fileName.replace("$", ":")
    : fileName.replace(/\/index/, "");

  routes.push({
    path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
    Element: pages[path].default,
    loader: pages[path]?.loader as LoaderFunction | undefined,
    action: pages[path]?.action as ActionFunction | undefined,
    ErrorBoundary: pages[path]?.ErrorBoundary,
    withAuth: !authList.includes(
      fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`
    ),
  });
}

const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: rest.withAuth ? (
      <Authorization>
        <Layout>
          <Element />
        </Layout>
      </Authorization>
    ) : (
      <Element />
    ),
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> }),
  }))
);

function App() {
  return (
    <RecoilRoot>
      <RouterProvider router={router} />
    </RecoilRoot>
  );
}

export default App;
