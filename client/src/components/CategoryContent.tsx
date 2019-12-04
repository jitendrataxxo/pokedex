import * as React from 'react';
import { Row, Col, Checkbox, Collapse, Icon, Button, Table, message, Alert } from 'antd';
import { columns } from './PokemonList';
import axios from 'axios';
import { CATEGORY } from './constants';
import { DndProvider, DragSource, DropTarget } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import update from 'immutability-helper';

let dragingIndex = -1;

class BodyRow extends React.Component {
	render() {
		const { isOver, connectDragSource, connectDropTarget, moveRow, ...restProps } = this.props;
		const style = { ...restProps.style, cursor: 'move' };

		let { className } = restProps;
		if (isOver) {
			if (restProps.index > dragingIndex) {
				className += ' drop-over-downward';
			}
			if (restProps.index < dragingIndex) {
				className += ' drop-over-upward';
			}
		}

		return connectDragSource(connectDropTarget(<tr {...restProps} className={className} style={style} />));
	}
}

const rowSource = {
	beginDrag(props) {
		dragingIndex = props.index;
		return {
			index: props.index,
		};
	},
};

const rowTarget = {
	drop(props, monitor) {
		const dragIndex = monitor.getItem().index;
		const hoverIndex = props.index;

		// Don't replace items with themselves
		if (dragIndex === hoverIndex) {
			return;
		}

		// Time to actually perform the action
		props.moveRow(dragIndex, hoverIndex);

		// Note: we're mutating the monitor item here!
		// Generally it's better to avoid mutations,
		// but it's good here for the sake of performance
		// to avoid expensive index searches.
		monitor.getItem().index = hoverIndex;
	},
};

const DragableBodyRow = DropTarget('row', rowTarget, (connect, monitor) => ({
	connectDropTarget: connect.dropTarget(),
	isOver: monitor.isOver(),
}))(
	DragSource('row', rowSource, connect => ({
		connectDragSource: connect.dragSource(),
	}))(BodyRow)
);

export class CategoryContent extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			data: [],
			error: null,
		};
	}

	components = {
		body: {
			row: DragableBodyRow,
		},
	};

	moveRow = (dragIndex, hoverIndex) => {
		const { data } = this.state;
		const dragRow = data[dragIndex];

		this.setState(
			update(this.state, {
				data: {
					$splice: [
						[dragIndex, 1],
						[hoverIndex, 0, dragRow],
					],
				},
			})
		);
	};

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
				<DndProvider backend={HTML5Backend}>
					<Table
						rowKey={record => record.node.id}
						onRow={(record, index) => ({
							index,
							moveRow: this.moveRow,
						})}
						columns={columns}
						components={this.components}
						dataSource={this.state.data}
					/>
				</DndProvider>
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
