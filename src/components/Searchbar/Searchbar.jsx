import { Component } from 'react';

import { Header, Form, Button, Label, Input } from './Searchbar.styled';
import { ReactComponent as Logo } from './search.svg';
import { toast } from 'react-toastify';

class Searchbar extends Component {
  state = {
    searchValue: '',
  };

  handleSubmit = e => {
    e.preventDefault();

    const { searchValue } = this.state;

    if (searchValue.trim() === '') {
      return toast.warning('Please enter something');
    }

    this.props.onSubmit(searchValue);
    this.setState({ searchValue: '' });
  };

  handleInput = e => {
    // const value = e.target.value.toLowerCase();
    const value = e.target.value;

    this.setState({ searchValue: value });
  };

  render() {
    return (
      <Header>
        <Form onSubmit={this.handleSubmit}>
          <Button type="submit">
            <Label />
            <Logo />
          </Button>
          <Input
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchValue}
            onChange={this.handleInput}
          />
        </Form>
      </Header>
    );
  }
}

export default Searchbar;
