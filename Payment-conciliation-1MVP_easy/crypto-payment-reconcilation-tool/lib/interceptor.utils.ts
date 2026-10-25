import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";

// Axios config to track retries
interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig { _retry?: boolean }

const BASE_URL = process.env.BASE_URL! ;
 
// Main Axios instance
export const API = axios.create({ baseURL: BASE_URL, withCredentials: true, timeout: 15000 });

// Separate instance for refreshing tokens
const refreshAPI = axios.create({ baseURL: BASE_URL, withCredentials: true, timeout: 15000 });

// Shared refresh promise...
let refreshPromise: Promise<void> | null = null ;

// Prevent refresh on authentication endpoints
const excludedRoutes = ["/auth/login","/auth/register","/auth/refresh","/auth/forgot-pswd","reset-pswd","verify-email"];

// Refresh tokens using HttpOnly cookies
const refreshTokens = async (): Promise<void> => {
  await refreshAPI.post("/auth/refresh");
};

// Ensure only one refresh request runs at a time...
const getRefreshPromise = () : Promise<void> => {
  if (!refreshPromise) {
    const promise = refreshTokens();

    refreshPromise = promise;

    void promise.then(() => {
        if (refreshPromise === promise) {
          refreshPromise = null;
        }
      },() => {
        if (refreshPromise === promise) {
          refreshPromise = null;
        }
      }
    );
  }

  return refreshPromise;
};

// response interceptor logic...
API.interceptors.response.use((response) => response,

  async (error: AxiosError) => {
    const originalRequest = error.config as | CustomAxiosRequestConfig | undefined;

    if (!originalRequest) return Promise.reject(error);

    const isUnauthorized = error.response?.status === 401;

    const isExcluded = excludedRoutes.some((route) => {
      const pathname = new URL(originalRequest.url ?? "","http://localhost").pathname;

      return pathname === route;
    });

    // Only handle eligible 401 responses
    if (!isUnauthorized || originalRequest._retry || isExcluded) return Promise.reject(error) ;

    originalRequest._retry = true;

    try {
      // All concurrent failures share one refresh request
      await getRefreshPromise();

      // Cookies have been updated by the browser.
      // Retry the original request.
      return API(originalRequest);
    } catch (refreshError) {
      // Only confirmed authentication failure
      // should trigger a logout/login flow.
      if (axios.isAxiosError(refreshError) && [401, 403].includes(refreshError.response?.status ?? 0)) {
        if (typeof window !== "undefined") {
          window.dispatchEvent(new Event("auth:session-expired"));
        }
      }

      return Promise.reject(refreshError);
    }
  }
);