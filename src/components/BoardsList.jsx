import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from "@material-ui/icons/Add";

import { convertToArray } from "../reducers/utils";
import { Button, Tooltip } from "@material-ui/core";

const styles = () => ({
  gridStyle: {
    display: "flex",
    flexWrap: "wrap"
  },
  boardTitle: {
    margin: 15,
    color: "white",
    fontSize: 25,
    minWidth: 100,
    minHeight: 100,
    backgroundColor: "#7171EA",
    lineHeight: 3,
    textAlign: "center",
    textTransform: "none"
  },
  iconStyle: {
    borderRadius: 50
  },
  tooltip: {
    backgroundColor: "black"
  },
  tooltipArrow: {
    color: "black"
  }
});

class BoardsList extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      boardId: null
    };
  }

  selectBoard = boardId => event => {
    this.setState({
      boardId
    });
  };

  redirect = () => {
    const { boardId } = this.state;
    if (!boardId) return null;
    return <Redirect to={`boards/${boardId}`} />;
  };

  render() {
    const { classes, boards = [] } = this.props;

    return (
      <React.Fragment>
        {this.redirect()}
        <div className={classes.gridStyle}>
          {boards.map(board => {
            const { id, title } = board;
            return (
              <Button
                className={classes.boardTitle}
                variant="contained"
                color="primary"
                onClick={this.selectBoard(id)}
              >
                {title}
              </Button>
            );
          })}
          <Tooltip
            classes={{
              tooltip: classes.tooltip,
              arrow: classes.tooltipArrow
            }}
            arrow
            title="Add Board"
          >
            <Button
              className={classes.boardTitle}
              variant="contained"
              color="primary"
              classes={{
                root: classes.iconStyle
              }}
            >
              <AddIcon />
            </Button>
          </Tooltip>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, props) => {
  const boards = convertToArray(state.board.records);
  return {
    boards
  };
};

const mapDispatchToProps = dispatch => {
  return {
    dispatchPush: location => dispatch(push(location))
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(BoardsList);
