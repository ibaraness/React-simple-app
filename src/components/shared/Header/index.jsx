import React, { Component } from 'react';
import {
  Link
} from 'react-router-dom'

class Header extends Component {
  render() {
    return(<nav className="navbar navbar-default navbar-shadow navbar-fixed-top">
      <div className="container-fluid">
        <div className="navbar-header">
          <button type="button" className="navbar-toggle collapsed"  data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
            <span className="icon-bar"></span>
          </button>
          
          <Link className="navbar-brand" to="/">My Logo</Link>
        </div>
        <div className="collapse navbar-collapse in" id="bs-example-navbar-collapse-1">
          <ul className="nav navbar-nav">
            <li><a href="/">About</a></li>
            <li><a href="stories">Stories</a></li>
            <li><a href="/">Store</a></li>
          </ul>
          <ul className="nav navbar-nav navbar-right">
            <li><a href="/"><span className="glyphicon glyphicon-shopping-cart"></span> Cart[1]</a></li>
          </ul>
          <form className="navbar-form navbar-right">
            <div className="form-group">
              <input type="text" className="form-control" placeholder="Search" />
            </div>
            <button type="submit" className="btn btn-default">Submit</button>
          </form>

        </div>
      </div>
    </nav>)
  }
}
export default Header;
