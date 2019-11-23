import React from "react";
import PropTypes from "prop-types";

export default Color;

Color.propTypes = {
  r: PropTypes.number.isRequired,
  g: PropTypes.number.isRequired,
  b: PropTypes.number.isRequired,
  likes: PropTypes.number,
  selected: PropTypes.bool,
  selectHandler: PropTypes.func.isRequired
};

function Color(props) {
  let likes = null;
  if (props.likes !== undefined) {
    likes = <span className="ColorLikes">Likes: {props.likes}</span>;
  }

  return (
    <div
      className={"Color " + (props.selected ? "Selected" : "")}
      onClick={props.selectHandler}
    >
      <div
        className="ColorCircle"
        style={{ backgroundColor: `rgb(${props.r}, ${props.g}, ${props.b})` }}
      />
      {likes}
    </div>
  );
}
