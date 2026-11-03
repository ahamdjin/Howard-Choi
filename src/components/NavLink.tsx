import { forwardRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { Link, type SiteLinkProps } from "@/lib/router-compat";
import { cn } from "@/lib/utils";

type NavLinkProps = SiteLinkProps & {
  activeClassName?: string;
  pendingClassName?: string;
};

const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ className, activeClassName, pendingClassName, ...props }, ref) => {
    const isPending = useRouterState({
      select: (state) => state.isLoading && state.location.pathname === props.to,
    });
    return (
      <Link
        {...props}
        ref={ref}
        className={cn(className, isPending && pendingClassName)}
        activeProps={{ className: activeClassName }}
      />
    );
  },
);
NavLink.displayName = "NavLink";
export { NavLink };
