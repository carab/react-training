function Button({ Component = 'button', color, className, ...otherProps }) {
  const classes = `Button-${color} ${className}`;

  return (
    <Component className={classes} {...otherProps} />
  );
}

export default Button;
