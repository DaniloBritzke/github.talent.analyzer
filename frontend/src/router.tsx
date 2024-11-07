import { Center, Spinner } from '@chakra-ui/react';
import React, { Component, Fragment, lazy, ReactNode, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

const PRESERVED = import.meta.glob('/src/pages/(_app|404).tsx', { eager: true });
const ROUTES = import.meta.glob('/src/pages/**/([a-z[]|_document)*.tsx');

const preserved = Object.keys(PRESERVED).reduce((preserved, file) => {
  const key = file.replace(/\/src\/pages\/|\.tsx$/g, '');
  return { ...preserved, [key]: (PRESERVED[file] as any).default };
}, {}) as Record<string, typeof Fragment>;

const routes = Object.keys(ROUTES).map(route => {
  const path = route
    .replace(/\/src\/pages|\.tsx$/g, '')
    .replace(/_document$/g, '')
    .replace(/\[\.{3}.+\]/, '*')
    .replace(/\[(.+)\]/, ':$1');

  return { path, component: lazy(ROUTES[route] as any) };
});

const Loading = () => {
  return (
    <Center h="100%">
      <Spinner size="lg" />
    </Center>
  );
};

interface IRoute {
  path: string;
  component: React.LazyExoticComponent<React.ComponentType<any>>;
}

interface INode {
  name: string;
  component?: React.LazyExoticComponent<React.ComponentType<any>>;
  children: INode[];
}

function makeTree(routes: IRoute[]) {
  const tree: INode[] = [];
  console.log(routes);
  for (const route of routes) {
    route.path
      .split('/')
      .filter(v => !!v)
      .reduce((level, name, i, parts) => {
        const found: INode | undefined = level.find(v => v.name === name);
        const isLeaf = i === parts.length - 1;

        if (found) {
          return found.children;
        }
        const node: INode = isLeaf
          ? {
              name,
              children: [],
              component: route.component,
            }
          : {
              name,
              children: [],
            };
        level.push(node);
        return node.children;
      }, tree);
  }
  return tree;
}

interface AppPageProps {
  Component?: React.ComponentType | null;
}

// Force a re render when path changes
function AppPage({ Component }: AppPageProps) {
  const { pathname } = useLocation();
  if (!Component) {
    return null;
  }
  return <Component key={pathname} />;
}

const renderTree = (tree: INode[]) => {
  if (!tree.length) {
    return undefined;
  }
  return (
    <>
      {tree.map(({ name, component: Component, children }) => {
        const isIndex = name === 'index';
        if (!Component) {
          if (isIndex) {
            return <Route key={name} index />;
          }
          return (
            <Route key={name} path={name}>
              {renderTree(children)}
            </Route>
          );
        }
        if (isIndex) {
          return <Route key={name} index element={<AppPage Component={Component} />} />;
        }
        return (
          <Route key={name} path={name} element={<AppPage Component={Component} />}>
            {renderTree(children)}
          </Route>
        );
      })}
    </>
  );
};

export const Router = () => {
  const App = preserved?._app || Fragment;
  const NotFound = preserved?.['404'] || Fragment;
  const tree = makeTree(routes);
  return (
    <App>
      <ErrorBoundary>
        <Suspense fallback={<Loading />}>
          <Routes>
            {renderTree(tree)}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </App>
  );
};


class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError(error: Error) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Caught by ErrorBoundary:', error);
    console.error('Error component stack:', errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <Center h="100%">
          <p>Something went wrong. Please try again later.</p>
        </Center>
      );
    }
    return this.props.children;
  }
}



const LoadingTree = () => {
  return (
    <Center h="100%">
      <Spinner size="lg" />
    </Center>
  );
};