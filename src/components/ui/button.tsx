import { ArrowRight, ArrowUpRight } from "lucide-react";
import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        ink: "min-h-11 h-auto whitespace-normal rounded-sm bg-[#241f19] px-5 py-3 font-semibold text-white hover:bg-[#42362a]",
        paper: "min-h-11 h-auto whitespace-normal rounded-sm bg-[#f1e8da] px-5 py-3 text-[#2c241b] hover:bg-[#e7d8c4]",
        keyline: "min-h-11 h-auto whitespace-normal rounded-sm border border-current bg-transparent px-5 py-3 text-inherit hover:bg-black/5",
        editorial: "min-h-11 h-auto whitespace-normal justify-start rounded-none bg-transparent px-0 text-inherit underline underline-offset-4 hover:decoration-2",
        control: "min-h-11 whitespace-normal rounded-none bg-transparent text-inherit",
        round: "size-11 shrink-0 rounded-full border border-current bg-transparent p-0 text-inherit hover:bg-black/5",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    compoundVariants: [
      { variant: ["default", "destructive", "outline", "secondary", "ghost", "link"], size: "default", className: "h-10 px-4 py-2" },
    ],
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp data-button-variant={variant} className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

function ButtonLink({ variant = "editorial", children, ...props }: React.ComponentPropsWithoutRef<"a"> & Pick<ButtonProps, "variant">) {
  return <Button asChild variant={variant}><a {...props}>{children}</a></Button>;
}

type ArrowLinkProps = React.ComponentProps<typeof ButtonLink> & { direction?: "up-right" | "right" };

function ArrowLink({ direction = "up-right", children, ...props }: ArrowLinkProps) {
  const Icon = direction === "right" ? ArrowRight : ArrowUpRight;
  return <ButtonLink {...props}><span>{children}</span><Icon aria-hidden="true" /></ButtonLink>;
}

export { ArrowLink, Button, ButtonLink, buttonVariants };
