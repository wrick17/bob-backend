import siteApis from "../api/site-apis";
import pageApis from "../api/page-apis";

const apiRoutes = (server) => {
  siteApis(server);
  pageApis(server);

  return server
}

export default apiRoutes;