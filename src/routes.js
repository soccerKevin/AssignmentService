import * as pages from './pages';

const routes = [
  {
    Page: pages.Home,
    options: {
      path:  ['/', ''],
      exact: true,
    }
  },
];

export default routes;