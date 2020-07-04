import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect } from "react-router-dom";
import { convertToArray } from "../reducers/utils";
import { withRouter } from "react-router-dom";

class BoardsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      redirectId: null
    };
  }

  goToBoard = boardId => event => {
    console.log("Got here", boardId, `boards/${boardId}`);
    const { dispatchPush } = this.props;
    dispatchPush(`boards/${boardId}`);
  };

  selectBoard = redirectId => event => {
    console.log("Clicked board id ", redirectId);
    this.setState({
      redirectId
    });
  };

  redirect = () => {
    const { redirectId } = this.state;
    if (!redirectId) return null;
    console.log("Render redirect to board page");
    return <Redirect to={"/boards/" + redirectId} />;
  };

  render() {
    const { boards = [] } = this.props;

    return (
      <React.Fragment>
        {this.redirect()}
        {boards.map(board => {
          const { id, title } = board;

          return (
            <div
              key={id}
              onClick={this.selectBoard(id)}
              style={{
                display: "flex"
              }}
            >
              {title}
            </div>
          );
        })}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => ({
  boards: convertToArray(state.board.records)
});

const mapDispatchToProps = dispatch => ({
  dispatchPush: location => dispatch(push(location))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(BoardsList)
);
