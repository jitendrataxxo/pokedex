import * as React from 'react';
import axios from 'axios';
import { Table, Button, Row, Col, Input } from 'antd';
import { query } from './constants';

const { Search } = Input;

export const columns = [
	{
		title: 'Image',
		dataIndex: 'node.ThumbnailAltText',
		key: 'image',
		render: (text, record) => (
			<img
				src={record.node.ThumbnailImage}
				alt={record.node.ThumbnailAltText}
				style={{ width: 70, height: 70, borderRadius: '50%' }}
			/>
		),
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
	},
];
export class PokemonList extends React.Component<Props, State> {
	constructor(props) {
		super(props);
		this.state = {
			selectedRowKeys: [],
			loading: false,
			selectedPokemons: [],
			filterdPokemons: [],
		};
	}

	start = () => {
		this.setState({ loading: true });
		// ajax request after empty completing
		setTimeout(() => {
			this.setState({
				selectedRowKeys: [],
				loading: false,
			});
		}, 1000);
	};

	onSearch = (v, e) => {
		this.getData({ name: v });
	};

	getData = async variables => {
		try {
			const response = await axios.post('http://127.0.0.1:8000/graphql/', {
				query,
				variables,
			});
			this.setState(
				() => ({
					filterdPokemons: response.data.data.allPokemons.edges,
				}),
				() => this.props.getFilteredPokemons(this.state.filterdPokemons)
			);
		} catch (error) {
			this.setState(() => ({ error }));
		}
	};

	onSelectChange = (selectedRowKeys, selectedRows) => {
		this.setState({ selectedRowKeys, selectedPokemons: selectedRows }, () =>
			this.props.getSelectedPokemons(this.state.selectedPokemons)
		);
	};

	render() {
		const { loading, selectedRowKeys } = this.state;
		const rowSelection = {
			selectedRowKeys,
			onChange: this.onSelectChange,
		};
		const hasSelected = selectedRowKeys.length > 0;

		return (
			<div>
				<div style={{ marginBottom: 16 }}>
					<Row>
						<Col span={8}>
							<Button type="primary" onClick={this.start} disabled={!hasSelected} loading={loading}>
								Reset
							</Button>
						</Col>
						<Col span={10}>
							<Search placeholder="Search Pokemons" onSearch={(v, e) => this.onSearch(v, e)} />
						</Col>
					</Row>
					<span style={{ marginLeft: 8 }}>
						{hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
					</span>
				</div>
				<Table rowKey={record => record.node.id} rowSelection={rowSelection} columns={columns} dataSource={this.props.data} />
			</div>
		);
	}
}

interface Props {
	data: object[];
	getSelectedPokemons: (v) => void;
	getFilteredPokemons: (v) => void;
}

interface State {
	loading: boolean;
	selectedRowKeys: [];
	selectedPokemons: [];
	filterdPokemons: [];
}
