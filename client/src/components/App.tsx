import * as React from 'react';
import axios from 'axios';
import { Card, Button } from 'antd';
import '../assets/scss/App.scss';
import { PokemonList } from './PokemonList';
import { query, Category, CATEGORY_DATA } from './constants';
import { AddCategory } from './AddCategory';

const tabList = [
  {
    key: 'tab1',
    tab: 'All',
  },
  {
    key: 'tab2',
    tab: 'tab2',
  },
];


export default class App extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      key: 'tab1',
      selectedRowKeys: [],
      categary: CATEGORY_DATA,
      data: [],
      error: null,
      variables: {
        name: '',
      },
      visible: false,
    };
  }

  componentDidMount() {
    this.getData(
      {}
    );
  }

  onSelect = (value: string) => {
    const nextState = { ...this.state };
    nextState.categary.value = value;
    this.setState(nextState);
  }

  onChange = e => {
    const nextState = { ...this.state };
    nextState.categary.value = e.target.value;
    this.setState(nextState);
  }

  onSwitch = (value: boolean) => {
    const nextState = { ...this.state };
    nextState.categary.isNewCAtegory = value;
    this.setState(nextState);
  }


  onTabChange = (key, type) => {
    this.setState({ [type]: key });
  }

  getData = async (variables) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/graphql/', {
        query,
        variables
      });
      this.setState(() => ({
        loading: true,
        data: response.data.data.allPokemons.edges
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  }

  onSelectChange = selectedRowKeys => {
    console.log('Selected Row', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  rowSelection = (v) => ({
    selectedRowKeys: this.state.selectedRowKeys,
    onChange: v => this.onSelectChange(v),
  })

  contentList = () => ({
    tab1: <PokemonList data={this.state.data} rowSelection={v => this.rowSelection(v)} />,
    tab2: <PokemonList data={this.state.data} rowSelection={this.rowSelection} />,
  })

  openCategoryForm = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    this.setState({
      visible: false,
    });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {

    console.log('render', this.state.selectedRowKeys);

    const { visible, categary } = this.state;

    return (
      <Card title='Pokedex' tabList={tabList} activeTabKey={this.state.key} extra={<Button onClick={this.openCategoryForm}>Add New Catigory</Button>} onTabChange={key => {
        this.onTabChange(key, 'key');
      }}>
        {this.state.data && this.contentList()[this.state.key]}
        <AddCategory
          visible={visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onSwitch={this.onSwitch}
          category={categary}
        />
      </Card>
    );
  }
}

interface State {
  data: [];
  loading: boolean;
  error: any;
  selectedRowKeys: [];
  key: string;
  variables: {
    name: string;
  };
  visible: boolean;
  categary: Category;
}

interface Props {

}
