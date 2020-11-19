import { Switch, Route, Link, useRouteMatch } from "react-router-dom";
import ArticleDetail from "./ArticleDetail";

const articles = [
  { title: "Article 1", slug: "article1" },
  { title: "Article 2", slug: "article2" },
  { title: "Article 3", slug: "article3" },
];

function ArticleIndex() {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <Switch>
        <Route exact path={path}>
          <ul>
            {articles.map((article) => (
              <li key={article.slug}>
                <Link to={`${url}/${article.slug}`}>{article.slug}</Link>
              </li>
            ))}
          </ul>
        </Route>
        <Route
          path={`${path}/:slug`}
          render={(props) => <ArticleDetail slug={props.match.params.slug} />}
        />
      </Switch>
    </div>
  );
}

export default ArticleIndex;
