import {useState, useEffect} from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";

/**
 * Render the breadcrumbs for the current path
 * 
 * @param {*} props 
 * @returns 
 */
const BreadCrumbs = ({routes, routeProps}) => {

  const crumbs = routes.filter(({path}) => {
    return routeProps.match.path.includes(path)
  })
  return (
    <div>
      {crumbs.map(({path}, index) => {
          const breadcrumpLabel = (index === 0) ? "root": path.substring(path.lastIndexOf("/") + 1)
          return (crumbs.length === index + 1) ? (
            <span key={index}>{breadcrumpLabel}</span>
          ) : (
            <span key={index}>
              <Link to={path}>{breadcrumpLabel}</Link>{" / "}
            </span>
          )
      })}
    </div>
  )
}

/**
 * Render the contents of the file directory for the current path
 * 
 * @param {*} props 
 * @returns 
 */
const ContentStructure = ({currPath}) => {
  const [content, setContent] = useState([]);
  
  useEffect(() =>{
    fetch(`/path/?mypath=${currPath}`)
    .then((res) => res.json())
    .then((data) => setContent(data.content))
    .catch((err) => console.error(err));
  }, [currPath])
  
  return (
    <div>
      <ul>
        {content.map(({path, type}, index) => {
          const name = path.substring(path.lastIndexOf("/")+1)
          return (currPath === path) ? (
            <li key={index}>
              THIS IS { (type === "file")? "FILE": "EMPTY DIRECTORY" }: {name}
            </li>
          ) : (
            <li key={index}>
              <Link to={path}>{name}</Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

/**
 * Main component for the breadcrumb file browser
 * 
 * @returns 
 */
const FileBrowser = () => {
  const [routes, setRoutes] = useState([]);

  useEffect(() => {
    fetch(`/routes`)
      .then((res) => res.json())
      .then((data) => setRoutes(data.routes))
      .catch((err) => console.error(err));
  }, []);
  
  return (
    <Router>
      <Switch>
        {routes.map(({ path }, key) => (
          <Route
            exact 
            path={path} 
            key={key} 
            render={props => {
              return(
                <>
                  <BreadCrumbs routes={routes} routeProps={props} />
                  <ContentStructure currPath={path} />
                </>
              )
            }}
          />
        ))}
      </Switch>
    </Router>
  )
}

export default FileBrowser;