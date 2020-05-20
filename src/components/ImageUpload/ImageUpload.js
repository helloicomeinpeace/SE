// imports the React Javascript Library
import React from "react";
//Card
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import CardMedia from "@material-ui/core/CardMedia";

import Fab from "@material-ui/core/Fab";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";

import red from "@material-ui/core/colors/red";
import pink from "@material-ui/core/colors/pink";
import blue from "@material-ui/core/colors/blue";

import Icon from "@material-ui/core/Icon";
import PageviewIcon from "@material-ui/icons/Pageview";
import SearchIcon from "@material-ui/icons/Search";
import AddPhotoAlternateIcon from "@material-ui/icons/AddPhotoAlternate";
import CollectionsIcon from "@material-ui/icons/Collections";

import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import fire from "../fire"
//Tabs
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: 500,
    display: "flex",
    alignItems: "flex-end"
  },
  iconHover: {
    margin: theme.spacing.unit * 2,
    "&:hover": {
      color: red[800]
    }
  },
  input: {
    display: "none"
  },
  button: {
    color: blue[900],
    margin: 10
  },
  secondaryButton: {
    color: "gray",
    margin: 10
  }
});

class ImageUploadCard extends React.Component {
  constructor(props)
  {
    super(props);
    this.state = {
      mainState: this.props.edit?"edit":"initial", // initial, search, gallery, uploaded
      imageUploaded: 0,
      selectedFile: this.props.edit?this.props.imagesrc:null
  }

  };
  handleUploadClick = event => {
    var file = event.target.files[0];
    this.props.sendImageFile(file,this.imageResetHandler);
    const reader = new FileReader();
    var url = reader.readAsDataURL(file);
    
    reader.onloadend = function(e) {
      this.setState({
        selectedFile: [reader.result]
      });
    }.bind(this);
    
    // // Would see a path?
    
    this.setState({
      mainState: "uploaded",
      selectedFile: event.target.files[0],
      imageUploaded: 1
    });
  };

  renderInitialState() {
    const { classes} = this.props;

    return (
        <div >
            <input
              accept="image/*"
              className={classes.input}
              id="contained-button-file"
              multiple
              type="file"
              onChange={this.handleUploadClick}
            />
            <label htmlFor="contained-button-file">
              <Fab component="span" className={classes.button}>
                <AddPhotoAlternateIcon />
              </Fab>
            </label>
        </div>
    );
  }

  renderUploadedState() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img
            width="100%"
            className={classes.media}
            src={this.state.selectedFile}
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  renderEditInitialState() {
    const { classes, theme } = this.props;

    return (
      <React.Fragment>
        <CardActionArea onClick={this.imageResetHandler}>
          <img
            width="100%"
            className={classes.media}
            src={this.props.imagesrc}
          />
        </CardActionArea>
      </React.Fragment>
    );
  }

  imageResetHandler = event => {
    // console.log("Click!");
    this.setState({
      mainState: "initial",
      selectedFile: null,
      imageUploaded: 0
    });
  };

  render() {
    var state=this.state.mainState;
    const { classes, theme } = this.props;
    return (
 
      <React.Fragment>
        <div className={classes.root}>
          <Card className={this.props.cardName}>
            {((this.state.mainState== "edit" && this.renderEditInitialState())||
              this.state.mainState == "initial" && this.renderInitialState())||
              (this.state.mainState == "uploaded" && this.renderUploadedState())
              }
          </Card>
        </div>
      </React.Fragment>
    );
    }
}

export default withStyles(styles, { withTheme: true })(ImageUploadCard);
