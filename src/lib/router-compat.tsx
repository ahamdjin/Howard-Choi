import { useCallback, useEffect, useMemo } from "react";
import {
  Link,
  useNavigate as useTanStackNavigate,
  useParams as useTanStackParams,
  useRouterState,
} from "@tanstack/react-router";

export { Link };
export const NavLink = Link;

type NavigateOptions = {
  replace?: boolean;
  state?: unknown;
};

type SearchParamsInit =
  | URLSearchParams
  | string
  | Record<string, string | string[]>
  | Array<[string, string]>;

export const useLocation = () =>
  useRouterState({
    select: (state) => state.location,
  });

export const useNavigate = () => {
  const navigate = useTanStackNavigate();

  return useCallback(
    (to: string | number, options: NavigateOptions = {}) => {
      if (typeof to === "number") {
        if (typeof window !== "undefined") {
          window.history.go(to);
        }
        return;
      }

      void navigate({
        to: to as never,
        replace: options.replace,
      });
    },
    [navigate],
  );
};

export const useParams = () =>
  useTanStackParams({ strict: false }) as Record<string, string | undefined>;

const toUrlSearchParams = (value: SearchParamsInit) => {
  if (value instanceof URLSearchParams || typeof value === "string" || Array.isArray(value)) {
    return new URLSearchParams(value);
  }

  const params = new URLSearchParams();
  Object.entries(value).forEach(([key, entry]) => {
    if (Array.isArray(entry)) {
      entry.forEach((item) => params.append(key, item));
    } else {
      params.set(key, entry);
    }
  });
  return params;
};

export const useSearchParams = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const searchParams = useMemo(() => {
    const query = location.href.includes("?")
      ? location.href.split("?")[1]?.split("#")[0] ?? ""
      : "";
    return new URLSearchParams(query);
  }, [location.href]);

  const setSearchParams = useCallback(
    (next: SearchParamsInit | ((current: URLSearchParams) => SearchParamsInit), options: NavigateOptions = {}) => {
      const resolved = typeof next === "function" ? next(new URLSearchParams(searchParams)) : next;
      const params = toUrlSearchParams(resolved);
      const query = params.toString();
      const target = `${location.pathname}${query ? `?${query}` : ""}${location.hash ?? ""}`;
      navigate(target, options);
    },
    [location.hash, location.pathname, navigate, searchParams],
  );

  return [searchParams, setSearchParams] as const;
};

export const Navigate = ({ to, replace = false }: { to: string; replace?: boolean }) => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(to, { replace });
  }, [navigate, replace, to]);

  return null;
};
