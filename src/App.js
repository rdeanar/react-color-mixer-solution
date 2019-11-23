import React from "react";
import { connect } from "react-redux";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Color from "./Color";

function mapStateToProps(state) {
  return { ...state };
}

var mapDispatchToProps = {
  addColor: color => ({ type: "ADD_COLOR", color }),
  selectColor: id => ({ type: "SELECT_COLOR", id }),
  unselectAll: () => ({ type: "UNSELECT_ALL" })
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);

function App(props) {
  let renderedColors = "Start by adding a color";
  if (props.colors.length > 0) {
    renderedColors = props.colors.map(({ id, likes, ...rgb }) => {
      return (
        <CSSTransition classNames="fade" timeout={500}>
          <Color
            likes={likes}
            {...rgb}
            selected={props.selected[id]}
            selectHandler={() => props.selectColor(id)}
          />
        </CSSTransition>
      );
    });

    renderedColors = (
      <TransitionGroup className="Colors" component="div">
        {renderedColors}
      </TransitionGroup>
    );
  }

  return (
    <div className="App">
      <div className="Title">Color Mixer</div>
      <div>{props.isLoading ? "Loading..." : ""}&nbsp;</div>
      <div className="Controls">
        <button onClick={addColor}>Add random color</button>
        <button
          disabled={Object.keys(props.selected).length < 2}
          onClick={mixColors}
        >
          Mix selected colors
        </button>
      </div>

      {renderedColors}
    </div>
  );

  // event handlers
  function addColor() {
    props.addColor({
      r: Math.random() * 256,
      g: Math.random() * 256,
      b: Math.random() * 256
    });
  }

  function mixColors() {
    let n = 0;
    let mixedColor = { r: 0, g: 0, b: 0 };
    for (const color of props.colors) {
      if (props.selected[color.id]) {
        n++;
        mixedColor.r += color.r;
        mixedColor.g += color.g;
        mixedColor.b += color.b;
      }
    }

    mixedColor.r /= n;
    mixedColor.g /= n;
    mixedColor.b /= n;

    props.addColor({ ...mixedColor });
    props.unselectAll();
  }
}
