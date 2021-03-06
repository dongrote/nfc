import React, { Component } from 'react';
import { Form, Grid, Dropdown, Message } from 'semantic-ui-react';

class WriteConfigure extends Component {
  state = {
    selected: null,
    availableAmiibos: [],
    success: false,
    error: false,
  };

  async populateDropdown() {
    var res = await fetch('/api/amiibos');
    if (res.ok) {
      var json = await res.json();
      this.setState({availableAmiibos: json, selected: null});
    }
  }

  async selectAmiibo(amiibo) {
    var res = await fetch(`/api/amiibo?amiibo=${encodeURIComponent(amiibo.file)}`);
    if (res.ok) {
      var json = await res.json();
      this.props.onAmiiboSelect({
        filename: amiibo.file,
        name: json.name,
        imageUrl: amiibo.imageUrl,
      });
      this.setState({success: !!res.ok, error: !res.ok, selected: res.ok ? amiibo : null});
    }
    setTimeout(() => this.setState({success: false, error: false}), 5000);
  }

  async componentDidMount() {
    await this.populateDropdown();
  }

  render() {
    return (
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
          <Form success={this.state.success} error={this.state.error}>
            <Form.Field>
              <label>Amiibo</label>
              <Dropdown
                placeholder='Select an Amiibo'
                search
                selection
                value={this.state.selected}
                options={this.state.availableAmiibos.map((v, k) => ({key: k, value: v, text: v.file, image: {src: v.imageUrl}}))}
                onChange={(e, data) => this.selectAmiibo(data.value)}
              />
              <Message success content='Amiibo selected successfully' />
              <Message error content='Error selecting Amiibo' />
            </Form.Field>
          </Form>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default WriteConfigure;
