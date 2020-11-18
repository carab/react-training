import PropTypes from "prop-types";

function Comment(props) {
  const {
    author: { name, avatarUrl },
    text,
    date,
  } = props;

  return (
    <div className="Comment">
      <div className="UserInfo">
        <img src={avatarUrl} alt={name} />
        <div className="UserInfo-name">{name}</div>
      </div>
      <div className="Comment-text">{text}</div>
      <div className="Comment-date">{date.toLocaleString()}</div>
    </div>
  );
}

Comment.propTypes = {
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
  }).isRequired,
  text: PropTypes.string.isRequired,
  date: PropTypes.instanceOf(Date).isRequired,
};

export default Comment;
