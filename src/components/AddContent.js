import React, { Component } from 'react';
import { Card, CardSection, Input, Button, Confirm } from './common';

class AddContent extends Component {
  state = { Title: '', Info: '', showModal: false };

  onAccept() {
    this.setState({ showModal: false });
  }

  onDecline() {
    this.setState({ showModal: false });
  }

  renderButton() {
    if (this.state.Title !== '' && this.state.Info !== '') {
      return (
        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Submit Announcement
          </Button>
        </CardSection>
      );
    }
  }

  render() {
    return (
      <Card>
        <CardSection>
          <Input
            label="Title"
            placeholder="Title"
            multiline
          />
        </CardSection>
        <CardSection>
          <Input
            label=""
            placeholder="Announcement Info Goes Here"
            multiline
          />
        </CardSection>
        {this.renderButton()}

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAccept()}
          onDecline={this.onDecline()}
        >
          Are you sure you would like to add this content?
        </Confirm>

      </Card>
    );
  }
}


export default AddContent;
