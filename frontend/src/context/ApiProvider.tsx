import { createContext, ReactNode, useContext, useMemo } from 'react';
import axios, { AxiosError, Method, AxiosInstance } from 'axios';
import {
  UseMutationOptions,
  UseMutationResult,
  UseQueryOptions,
  UseQueryResult,
  useMutation,
  useQuery,
  QueryClientProvider,
  QueryClient,
  onlineManager,
} from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

onlineManager.setOnline(true);
export interface IApiContext {
  client: AxiosInstance;
}

const ApiContext = createContext<IApiContext>({} as IApiContext);

export interface ApiProviderProps {
  children: ReactNode;
}

export interface IUseApiQueryProps {
  url: string;
  method: Method;
  params: { [key: string]: unknown };
}

export const useApiContext = (): IApiContext => {
  const context = useContext(ApiContext);
  if (!context) {
    throw new Error('useApiContext must be whitin a ApiProvider');
  }
  return context;
};

export function useApiQuery<TResponse, TParams = Record<string, unknown>>(
  method: Method,
  url: string,
  params?: TParams,
  options?: UseQueryOptions<TParams, AxiosError, TResponse>,
): UseQueryResult<TResponse, AxiosError> {
  const { client } = useApiContext();
  return useQuery<TParams, AxiosError, TResponse>(
    [url, params],
    async () => {
      const { data } = await client({
        method,
        params,
        url,
      });
      return data;
    },
    options,
  );
}

export interface IApiMutationVariables<TBody, TParams> {
  data?: TBody;
  /** Optional query params, will merge with original params */
  params?: TParams;
}

export function useApiMutation<TResponse, TBody, TParams = Record<string, unknown>>(
  method: Method,
  url: string,
  params?: TParams,
  options?: UseMutationOptions<TResponse, AxiosError, IApiMutationVariables<TBody, TParams>>,
): UseMutationResult<TResponse, AxiosError, IApiMutationVariables<TBody, TParams>> {
  const { client } = useApiContext();
  return useMutation<TResponse, AxiosError, IApiMutationVariables<TBody, TParams>>(
    async (variables: IApiMutationVariables<TBody, TParams>) => {
      const { data } = await client({
        method,
        url,
        params: { ...params, ...variables.params },
        data: variables.data,
      });
      return data;
    },
    options,
  );
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const client = useMemo<AxiosInstance>(() => {
    const c = axios.create({ withCredentials: true });
    c.interceptors.response.use(
      r => r,
      e => {
        return Promise.reject(e);
      },
    );
    return c;
  }, []);

  const query = useMemo(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          refetchOnMount: false,
          refetchOnWindowFocus: false,
          retry: 2,
        },
      },
    });
  }, []);


  return (
    <QueryClientProvider client={query}>
      <ReactQueryDevtools initialIsOpen={false} position="bottom-right" />
      <ApiContext.Provider value={{client}}>
        {children}
      </ApiContext.Provider>
    </QueryClientProvider>
  );
};
