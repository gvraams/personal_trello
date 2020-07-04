import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import { updateLane, deleteLane } from "../../actions/lane";
import { convertToArray } from "../../reducers/utils";

const styles = () => ({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "fit-content",
    minWidth: 700,
    minHeight: 600,
    height: "auto",
    color: "#f0f0f0",
    padding: 10,
    marginTop: 20,
    marginBottom: 10,
    borderRadius: 10,
    backgroundImage: "linear-gradient(#9900FF, #AA00FF)",
    backgroundColor: "blueviolet"
  },
  boardTitle: {
    fontSize: 34,
    fontWeight: 500,
    marginBottom: 10
  },
  laneOuterUl: {
    borderRadius: 10,
    display: "inline-flex",
    padding: 10,
    minHeight: 600,
    height: "auto",
    overflow: "hidden",
    backgroundImage: "linear-gradient(#6600FF, #AA00FF)",
    opacity: "0.9"
  },
  laneListItem: {
    listStyle: "none",
    width: 370
  },
  laneDeleteButton: {
    borderRadius: 10,
    align: "right"
  },
  laneHeaderDiv: {
    height: "fit-content",
    width: "90%",
    display: "flex",
    justifyContent: "space-between",
    paddingLeft: 10
  },
  addLaneButton: {
    height: 70,
    width: 70,
    borderRadius: 35,
    marginTop: 15,
    marginLeft: 30,
    marginRight: 30
  },
  cardsArea: {
    backgroundColor: "black",
    height: "91%",
    marginRight: 20,
    borderRadius: 20,
    opacity: 0.7
  },
  laneTitle: {
    fontSize: 17,
    lineHeight: 3
  },
  addCardButton: {
    marginTop: 15,
    marginLeft: 15
  },
  iconStyle: {
    color: "#f0f0f0"
  },
  tooltip: {
    backgroundColor: "black"
  },
  tooltipArrow: {
    color: "black"
  }
});

class Board extends React.PureComponent {
  updateLane = lane => event => {
    console.log("Update lane triggered", lane);
    // const { dispatchUpdateLane } = this.props;
    // dispatchUpdateLane(lane);
  };

  deleteLane = lane => event => {
    const { dispatchDeleteLane } = this.props;
    dispatchDeleteLane({
      id: lane.id
    });
  };

  render() {
    const { board, lanes = [], cards = [], classes = {} } = this.props;

    const tooltipClasses = {
      arrow: {
        color: "black"
      },
      tooltip: {
        backgroundColor: "black"
      }
    };

    return (
      <div className={classes.root}>
        <span className={classes.boardTitle}>{board.title}</span>
        <div style={{ display: "flex" }}>
          {lanes.length > 0 && (
            <ul className={classes.laneOuterUl}>
              {lanes.map(lane => (
                <li key={lane.id} className={classes.laneListItem}>
                  <div className={classes.laneHeaderDiv}>
                    <Typography className={classes.laneTitle}>
                      {lane.title}
                    </Typography>
                    <div style={{ display: "flex" }}>
                      <Tooltip
                        classes={{
                          tooltip: classes.tooltip,
                          arrow: classes.tooltipArrow
                        }}
                        arrow
                        title="Add Card"
                      >
                        <IconButton
                          classes={{
                            root: classes.iconStyle
                          }}
                          aria-label="add"
                          onClick={this.updateLane(lane)}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        classes={{
                          tooltip: classes.tooltip,
                          arrow: classes.tooltipArrow
                        }}
                        arrow
                        title="Edit Lane"
                      >
                        <IconButton
                          classes={{
                            root: classes.iconStyle
                          }}
                          aria-label="edit"
                          onClick={this.updateLane(lane)}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>

                      <Tooltip
                        classes={{
                          tooltip: classes.tooltip,
                          arrow: classes.tooltipArrow
                        }}
                        arrow
                        title="Delete Lane"
                      >
                        <IconButton
                          classes={{
                            root: classes.iconStyle
                          }}
                          aria-label="delete"
                          onClick={this.deleteLane(lane)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </div>
                  </div>
                  <div className={classes.cardsArea}>
                    {cards && null}
                    <Button
                      className={classes.addCardButton}
                      variant="contained"
                      color="primary"
                    >
                      Add Card
                    </Button>
                  </div>
                </li>
              ))}
            </ul>
          )}
          <Tooltip
            classes={{
              tooltip: classes.tooltip,
              arrow: classes.tooltipArrow
            }}
            arrow
            title="Add Lane"
          >
            <Button
              className={classes.addLaneButton}
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
      </div>
    );
  }
}

const mapStateToProps = (state, props) => {
  const { board_id: boardId } = props.match.params;
  const board = state.board.records[boardId];

  const lanes = convertToArray(state.board.lanes).filter(
    lane => lane.boardId === boardId
  );

  return {
    board,
    lanes
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchUpdateLane: payload => dispatch(updateLane(payload)),
  dispatchDeleteLane: payload => dispatch(deleteLane(payload))
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withStyles(styles)
)(Board);
