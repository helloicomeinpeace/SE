import React from "react";
import Icon from '@material-ui/core/Icon';
import { Link } from "react-router-dom";
const Title = ({ name, title }) => {
  return (
    <div className="row">
      <div className="col-10 mx-auto my-2 text-center">
        <h1 className="text-capitalize font-weight-bold">
          {name} <strong className="text-blue">{title}</strong>
        </h1>
        {/*<h1 className="text-capitalize" style={{ fontSize: 20 }}>
          <Link to="/AddProduct" className="ml-auto">
          <Icon className="fa fa-plus-circle" style={{ fontSize:40 }}/>
          </Link>
  </h1>*/}
      </div>
    </div>
  );
};

export default Title;
