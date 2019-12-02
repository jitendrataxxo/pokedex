import * as React from 'react';
import { Card, List, Input, Icon, Avatar, Row, Col, Checkbox, Table } from 'antd';
import { PokemonContent } from './PokemonContent';

const { Search } = Input;


export class PokemonList extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  columns = [
    {
      title: 'Image',
      dataIndex: 'node.ThumbnailAltText',
      key: 'image',
      render:  (text, record) => <img src={record.node.ThumbnailImage} alt={record.node.ThumbnailAltText} style={{width: 70, height: 70, borderRadius: '50%'}} />
    },
    {
      title: 'Name',
      dataIndex: 'node.name',
      key: 'name',
    },
    {
      title: 'Abilities',
      dataIndex: 'node.abilities',
      key: 'abilities',
    },
    {
      title: 'Weakness',
      dataIndex: 'node.weakness',
      key: 'weakness',
    },
    {
      title: 'Threat Types',
      dataIndex: 'node.threatType',
      key: 'threatType',
    }
  ];

  render() {
    return (
      <Card>
        <Search placeholder='Search pokemons' />
        <Table dataSource={this.props.data} onChange={e => this.props.onRowChange(e)} columns={this.columns}/>
      </Card>
    );
  }
}

interface Props {
  data: object[];
  columns: [];
  rowSelection: any;
  onRowChange: (e) => void;
}

interface State {

}
