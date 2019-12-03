import * as React from 'react';
import { Row, Col, Checkbox, Collapse, Icon, Button, Table, message, Alert } from 'antd';
import { columns } from './PokemonList';
import axios from 'axios';
import { CATEGORY } from './constants';

export class CategoryContent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			data: [],
			error: null,
		};
	}

	componentDidMount() {
		this.getData({ id: this.props.categoryId });
	}

	getData = async variables => {
		try {
			const response = await axios.post('http://127.0.0.1:8000/graphql/', {
				query: CATEGORY,
				variables,
			});
			this.setState(() => ({
				loading: true,
				data: response.data.data.category.pokemones.edges,
			}));
		} catch (error) {
			this.setState(() => ({ error }));
		}
	};

	reorder = () => {};

	delete = categoryId => {
		axios({
			method: 'post',
			url: 'http://127.0.0.1:8000/delete_category/',
			data: {
				categoryId: categoryId,
			},

			xsrfCookieName: 'csrftoken',
			xsrfHeaderName: 'X-CSRFToken',
			headers: { 'X-Requested-With': 'XMLHttpRequest', 'Content-Type': 'json' },
		}).then(function(response) {
			const { category, key } = response.data;
			message.success(`${category}  successfully Deleted `);
		});
	};

	render() {
		const { categoryId } = this.props;
		return (
			<div>
				<div style={{ marginBottom: 16 }}>
					<Row>
						<Col span={4}>
							<Button type="primary" onClick={this.reorder}>
								Undo Reorder
							</Button>
						</Col>
						<Col span={4}>
							<Button type="danger" onClick={() => this.delete(categoryId)}>
								Delete Category
							</Button>
						</Col>
					</Row>
				</div>
				<Table columns={columns} dataSource={this.state.data} />
			</div>
		);
	}
}

interface Props {
	categoryId: string;
}

interface State {
	data: [];
	error: any;
}
