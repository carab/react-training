import React from "react";
import { Link } from "react-router-dom";

type Override<P1, P2> = Omit<P1, keyof P2> & P2;

type BaseButtonProps = {
  color?: "default" | "primary" | "secondary";
  className?: string;
};

type ButtonProps<
  AsComponent,
  DefaultComponent extends React.ElementType = "button"
> = AsComponent extends React.ElementType
  ? Override<
      React.ComponentPropsWithoutRef<AsComponent>,
      BaseButtonProps & { as: AsComponent }
    >
  : Override<
      React.ComponentPropsWithoutRef<DefaultComponent>,
      BaseButtonProps & { as?: DefaultComponent }
    >;

function Button<AsComponent>({
  as: Component = "button",
  color = "default",
  className,
  ...props
}: ButtonProps<AsComponent>) {
  const classes = ["Button", `Button-${color}`, className].join(" ");

  return <Component className={classes} {...props} />;
}

const defaultButton = <Button type="button">Go</Button>;

const anchorButton = (
  <Button as="a" href="/somewhere">
    Go
  </Button>
);

const linkButton = (
  <Button as={Link} to="/somewhere">
    Go
  </Button>
);
