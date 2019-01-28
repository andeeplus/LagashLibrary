import React from "react";

export default class Modal extends React.Component {

  onClose = e => {
    this.props.onClose && this.props.onClose(e);
  };

  render() {
    const {show, trigger} = this.props
    if (!show) {
      return null;
    }
    return (
      <div className="modal-container">
        <div className="modal" id="modal">
          <h2>{this.props.children}</h2>
          {trigger}
          <div className="actions">
            <button className="toggle-button" onClick={this.onClose}>
              close
            </button>
          </div>
        </div>
      </div>
    );
  }
}