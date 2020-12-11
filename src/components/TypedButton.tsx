type buttonAttributes = React.ComponentPropsWithoutRef<"button">

export type ButtonProps = Omit<buttonAttributes, 'color'> & {
  color?: "default" | "primary" | "secondary";
}

function Button({ color = "default", className, ...props }: ButtonProps) {
  const classes = ["Button", `Button-${color}`, className].join(" ");

  return <button className={classes} {...props} />;
}

<Button color="test"/>
