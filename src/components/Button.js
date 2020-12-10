function Button(props) {
  const {
    Component = "button",
    color = "default",
    className,
    ...otherProps
  } = props;
  const classes = ["Button", `Button-${color}`, className].join(" ");

  return (
    <Component className={classes} {...otherProps}/>
  );
}

export default Button;

<Button color="primary">GO</Button>;
