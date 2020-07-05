import React from "react";
import { makeStyles } from "@material-ui/core";

const DragAndDrop = props => {
  const useStyles = makeStyles({
    dragDropZone: {}
  });

  const handleDragEnter = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = () => event => {
    event.preventDefault();
    event.stopPropagation();
  };

  const classes = useStyles();

  const { children } = props;

  if (!children) return null;

  return (
    <div
      className={classes.dragDropZone}
      onDrop={handleDrop()}
      onDragOver={handleDragOver()}
      onDragEnter={handleDragEnter()}
      onDragLeave={handleDragLeave()}
    >
      {children}
    </div>
  );
};

export default DragAndDrop;
