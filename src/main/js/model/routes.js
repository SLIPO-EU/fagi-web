import pathToRegexp from 'path-to-regexp';

import { App } from '../components/views/App';
import { Configuration } from '../components/views/Configuration';

const Config = '/configuration';
const Spec = '/specification';
const Stats = '/statistics';

export const StaticRoutes = {
  Config,
  Spec,
  Stats
};

/**
 * Routes for error pages
 */

const Forbidden = '/error/403';
const NotFound = '/error/404';

export const ErrorPages = {
  Forbidden,
  NotFound
};

/**
 * Default links
 */
const defaultLinks = [Config, Spec, Stats];

const routes = {

  // Static
  [Config]: {
    description: 'Configuration page',
    title: 'Configuration',
    defaultTitle: 'Configuration',
    contextComponent: Configuration,
    links: [Spec]
  },
  [Spec]: {
    description: 'Rules specification',
    title: 'Specification',
    defaultTitle: 'Specification',
    contextComponent: App,
    links: [Config],
  },
  [Stats]: {
    description: 'Fusion Statistics',
    title: 'Statistics',
    defaultTitle: 'Statistics',
    contextComponent: App,
    links: [Config]
  }  
};

/**
 * Find a route by its path e.g. /Specification
 *
 * @export
 * @param {string} path - the route path
 * @returns the route properties
 */
export function getRoute(path) {
  const prop = matchRoute(path);

  if (routes.hasOwnProperty(prop)) {
    return routes[prop];
  }
  return null;
}

/**
 * Matches the given path to an existing route and returns the route or null
 * if no match is found
 *
 * @export
 * @param {any} path - the route path to match
 * @returns the route that matched the given path or null if no match is found
 */
export function matchRoute(path) {
  for (let route in routes) {
    let re = pathToRegexp(route);
    if (re.test(path)) {
      return route;
    }
  }

  return null;
}

/**
 * Build a path given a route and optional parameters
 *
 * @export
 * @param {string} path - The route name
 * @param {string[]|object} params - Optional parameters to bind
 */
export function buildPath(path, params) {
  let result = path || '/';

  if (params) {
    if (Array.isArray(params)) {
      let re = /:\w+/i;
      for (const value of params) {
        result = result.replace(re, value);
      }
    } else {
      let toPath = pathToRegexp.compile(path);
      result = toPath(params);
    }
  }
  return result;
}
