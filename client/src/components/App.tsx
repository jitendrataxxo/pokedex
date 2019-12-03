import * as React from 'react';
import axios from 'axios';
import { Card, Button, message, Spin } from 'antd';
import '../assets/scss/App.scss';
import { PokemonList } from './PokemonList';
import { query, Category, CATEGORY_DATA, TabList, CATEGORY_QUERY } from './constants';
import { AddCategory } from './AddCategory';
import { CategoryContent } from './CategoryContent';


export default class App extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      key: 'tab1',
      category: CATEGORY_DATA,
      data: [],
      filteredPokemons: [],
      error: null,
      variables: {
        name: '',
      },
      visible: false,
      selectedPokemons: [],
      tabList: [
        {key: 'tab1',
        tab: 'All'},
      ],
      categories: [],
      contentList: {

      }
    };
  }

  componentDidMount() {
    this.getData(
      {}
    );

    this.getCategories(
      {}
    );
  }

  getData = async (variables) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/graphql/', {
        query,
        variables
      });
      this.setState(() => ({
        loading: false,
        data: response.data.data.allPokemons.edges
      }), () => this.setState({contentList: {tab1: <PokemonList data={this.state.filteredPokemons.length != 0 ? this.state.filteredPokemons : this.state.data} getSelectedPokemons={this.getSelectedPokemons} getFilteredPokemons={this.getFilteredPokemons} />}}));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  }

  getCategories = async (variables) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/graphql/', {
        query: CATEGORY_QUERY,
        variables
      });
      this.setState(() => ({
        categories: response.data.data.allCategories.edges
      }), () => this.setTabs(this.state.categories)
      );
    } catch (error) {
      this.setState(() => ({ error }));
    }
  }

  setTabs = (categories: Category[]) => {

    let tabList = [...this.state.tabList]
    let contentList = {'tab1': <PokemonList data={this.state.filteredPokemons.length != 0 ? this.state.filteredPokemons : this.state.data} getSelectedPokemons={this.getSelectedPokemons} getFilteredPokemons={this.getFilteredPokemons} />}
    categories.forEach(category => {
      tabList.push({key: category.node.id, tab: category.node.name});
      contentList[category.node.id] = <CategoryContent categoryId={category.node.id}/>;
    })
    this.setState({tabList, contentList})
  }

  onTabChange = (key) => {
    this.setState({key});
  }

  getSelectedPokemons = (selectedPokemons) => {
    this.setState({selectedPokemons})
  }

  getFilteredPokemons = (filteredPokemons) => {
    this.setState({filteredPokemons: filteredPokemons})
  }


  onSelect = (value: string) => {
    // On category select
    const nextState = { ...this.state };
    nextState.category.value = value;
    this.setState(nextState);
  }

  onChange = e => {
    const nextState = { ...this.state };
    nextState.category.value = e.target.value;
    this.setState(nextState);
  }

  onSwitch = (value: boolean) => {
    const nextState = { ...this.state };
    nextState.category.isNewCAtegory = value;
    this.setState(nextState);
  }

  openCategoryForm = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = () => {
    const {category, selectedPokemons} = this.state;
    axios({
      method: 'post',
      url: 'http://127.0.0.1:8000/add_category/',
      data: {
        category: category,
        selectedPokemons: selectedPokemons
      },
      
      xsrfCookieName: 'csrftoken',
      xsrfHeaderName: 'X-CSRFToken',
      headers: {'X-Requested-With': 'XMLHttpRequest',
                'Content-Type': 'json'},
  }).then(function (response) { 
      const {category, key} = response.data
      message.success(`${category}  successfully Created `)
  });
  }

  handleCancel = () => {
    this.setState({
      visible: false,
    });
  }

  render() {
    if (this.state.loading) {
      return <div style={{textAlign: 'center', margin: '200px'}}>
        <Spin size='large'/>
      </div>;
    }

    const { visible, category, key, data, tabList } = this.state;

    return (
      <Card title='Pokedex' tabList={tabList} activeTabKey={key} extra={key === 'tab1' && <Button type='primary' onClick={this.openCategoryForm}>Add Category</Button>} onTabChange={key => {
        this.onTabChange(key);
      }}>
        {data && this.state.contentList[key]}
        <AddCategory
          visible={visible}
          handleOk={this.handleOk}
          handleCancel={this.handleCancel}
          onChange={this.onChange}
          onSelect={this.onSelect}
          onSwitch={this.onSwitch}
          category={category}
        />
      </Card>
    );
  }
}

interface State {
  data: [];
  selectedPokemons: [];
  filteredPokemons: [];
  loading: boolean;
  error: any;
  key: string;
  variables: {
    name: string;
  };
  visible: boolean;
  category: Category;
  tabList: TabList[];
  categories: Category[];
  contentList: {}
}

interface Props {

}
