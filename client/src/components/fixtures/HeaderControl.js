import React, { Component } from "react";
import IconButton from "../inputs/IconButton";
import "./styles/HeaderControl.css";

class HeaderControl extends Component {
  constructor(props) {
    super(props);

    //Refs
    this.ref = React.createRef();

    // State Object
    this.state = {
      searchIcon: null,
      cartIcon: null,
    };

    // Bindings Methods
  }

  componentDidMount() {
    if (this.props.isSearchVisible === "false") {
      this.setState({ searchIcon: null });
    } else {
      this.setState({
        searchIcon: (
          <IconButton
            tooltip="Search"
            iconClass="fa fa-search"
            onClick={this.props.searchOnClick}
          />
        ),
      });
    }
    if (this.props.isCartVisible === "false") {
      this.setState({ cartIcon: null });
    } else {
      this.setState({
        cartIcon: (
          <IconButton
            tooltip="Cart"
            count={this.props.cartCount}
            iconClass="bi bi-cart-fill"
            onClick={this.props.cartOnClick}
          />
        ),
      });
    }
  }

  UNSAFE_componentWillReceiveProps(newPro) {
    if (newPro.isSearchVisible === "false") {
      this.setState({ searchIcon: null });
    } else {
      this.setState({
        searchIcon: (
          <IconButton
            tooltip="Search"
            iconClass="fa fa-search"
            onClick={newPro.searchOnClick}
          />
        ),
      });
    }
    if (newPro.isCartVisible === "false") {
      this.setState({ cartIcon: null });
    } else {
      this.setState({
        cartIcon: (
          <IconButton
            tooltip="Cart"
            count={newPro.cartCount}
            iconClass="bi bi-cart-fill"
            onClick={newPro.cartOnClick}
          />
        ),
      });
    }
  }
  render() {
    return (
      <div ref={this.ref} id="header-control-container">
        {this.state.searchIcon}
        {this.state.cartIcon}
        <IconButton
          tooltip="Notifications"
          count={this.props.notificationsCount}
          iconClass="bi bi-bell-fill"
          id="notifications-icon-btn"
          onClick={this.props.notificationsOnClick}
        />
      </div>
    );
  }
}

export default HeaderControl;
