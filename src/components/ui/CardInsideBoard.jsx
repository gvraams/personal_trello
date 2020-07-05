import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton
} from "@material-ui/core";

import FullscreenIcon from "@material-ui/icons/Fullscreen";

const styles = () => ({
  cardRoot: {
    marginBottom: 20,
    width: 310,
    position: "relative",
    top: "3%",
    left: "6%",
    background: "white",
    color: "black"
  },
  footer: {
    display: "flex"
  },
  titleStyle: {},
  descriptionStyle: {
    height: 50,
    overflowY: "hidden"
  }
});

class CardInsideBoard extends React.Component {
  render() {
    const { id, draggable, dragStartHandler, classes, card } = this.props;

    return (
      <Card
        id={id}
        draggable={draggable}
        onDragStart={dragStartHandler}
        className={classes.cardRoot}
      >
        <CardContent>
          <Typography gutterBottom className={classes.titleStyle}>
            {card.title}
          </Typography>
          <Typography className={classes.descriptionStyle}>
            {card.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.footer}>
          <IconButton
            classes={{
              root: classes.iconStyle
            }}
            aria-label="delete"
            onClick={() => {}}
          >
            <FullscreenIcon fontSize="small" />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(CardInsideBoard);
