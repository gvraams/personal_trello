import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import uuid4 from "uuid4";
import { withStyles } from "@material-ui/core/styles";
import { Typography, IconButton, Button, Tooltip } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import CardInsideBoard from "./CardInsideBoard";
import { createCard } from "../../actions/card";
import { updateLane, deleteLane } from "../../actions/lane";
import { convertToArray, groupBy } from "../../reducers/utils";

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
    minHeight: 720,
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
    opacity: 0.7,
    maxHeight: 720,
    overflowY: "auto"
  },
  laneTitle: {
    fontSize: 17,
    lineHeight: 3
  },
  addCardButton: {
    marginTop: 30,
    marginLeft: 15,
    opactiy: 1.0
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
  updateLane = lane => event => {};

  deleteLane = lane => event => {
    const { dispatchDeleteLane } = this.props;
    dispatchDeleteLane({
      id: lane.id
    });
  };

  handleAddCard = lane => event => {
    const { id: laneId, boardId } = lane;
    const { cards = [], dispatchCreateCard } = this.props;
    const position = cards.filter(card => card.laneId === laneId).length;
    const title = "Card " + (position + 1);
    const description =
      "Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit. Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit";

    const cardParams = {
      card: {
        id: uuid4(),
        title,
        description,
        laneId,
        boardId,
        position
      }
    };

    dispatchCreateCard(cardParams);
  };

  renderCardsForLane = laneId => {
    const { cardsByLane } = this.props;
    const cards = cardsByLane[laneId];
    if (!cards) return null;

    return (
      <div onDrop={this.drop()} onDragOver={this.allowDrop()}>
        {cards.map(card => (
          <CardInsideBoard
            id={card.id + "_header"}
            draggable
            key={card.id}
            card={card}
            dragStartHandler={this.drag()}
          />
        ))}
      </div>
    );
  };

  allowDrop = () => event => {
    console.log("Allow drop");
    event.preventDefault();
  };

  drag = () => event => {
    console.log("Drag");
    event.dataTransfer.setData("text", event.target.id);
  };

  drop = () => event => {
    console.log("Drop");
    event.preventDefault();
    const data = event.dataTransfer.getData("text");
    event.target.appendChild(document.getElementById(data));
  };

  render() {
    const { board, lanes = [], classes = {} } = this.props;

    if (!board) {
      return (
        <Link to="/">
          <Button color="secondary">Home</Button>
        </Link>
      );
    }

    return (
      <div className={classes.root}>
        <div style={{ display: "flex" }}>
          <Link to="/">
            <Button color="default">Home</Button>
          </Link>
          <Link to={"/boards/" + board.id}>
            <Button color="default">{board.title}</Button>
          </Link>
        </div>
        <div style={{ display: "flex" }}>
          {lanes.length > 0 && (
            <ul className={classes.laneOuterUl}>
              {lanes.map(lane => (
                <li
                  // draggable
                  id={lane.id + "_header"}
                  key={lane.id}
                  className={classes.laneListItem}
                >
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
                          onClick={this.handleAddCard(lane)}
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
                    {this.renderCardsForLane(lane.id)}
                    <Button
                      className={classes.addCardButton}
                      variant="contained"
                      color="primary"
                      onClick={this.handleAddCard(lane)}
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

  const cards = convertToArray(state.card.records).filter(
    card => card.boardId === boardId
  );

  const cardsByLane = groupBy(cards, "laneId");

  return {
    board,
    lanes,
    cards,
    cardsByLane
  };
};

const mapDispatchToProps = dispatch => ({
  dispatchCreateCard: payload => dispatch(createCard(payload)),
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
