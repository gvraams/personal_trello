import React from "react";

class Board extends React.PureComponent {
  render() {
    const { board, lanes = [] } = this.props;
    return <div>[Single Kanban board]</div>;
  }
}

export default Board;
