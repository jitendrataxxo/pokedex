import * as React from 'react';
import { Modal, Row, Col, Select, Checkbox, Divider, Input, Switch } from 'antd';
import axios from 'axios';
import { CATEGORY_QUERY, Category, CATEGORY_DATA } from './constants';
const { Option } = Select;

export class AddCategory extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: false,
      data: [],
      error: null
    };
  }

  componentDidMount() {
    this.getData(
      {}
    );
  }

  getData = async (variables) => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/graphql/', {
        query: CATEGORY_QUERY,
        variables
      });
      this.setState(() => ({
        loading: true,
        data: response.data.data.allCategories.edges
      }));
    } catch (error) {
      this.setState(() => ({ error }));
    }
  }

  render() {

    const { category, visible, handleCancel, handleOk, onChange, onSelect, onSwitch } = this.props;
    const { error, data, loading } = this.state;

    return (
      <Modal
        title='Add Category'
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText={'Submit'}
      >
        <Row>
          <Col span={4} key='col1'><h4>Is New Category</h4></Col>
          <Col span={2} key='col2'>
            <Switch defaultChecked onChange={v => onSwitch(v)} />
          </Col>
        </Row>
        <Divider />
        <p>Add in existing category</p>
        <Select onChange={(value) => onSelect(value)} style={{ width: 500 }} disabled={category.isNewCAtegory}>
          {data.map((category => <Option key={category.node.id} value={category.node.id}>{category.node.name}</Option>))}
        </Select>
        <h3 style={{ textAlign: 'center' }}>OR</h3>
        <Divider />
        <p>Add a new category</p>
        <Input placeholder='Enter New Category' onChange={e => onChange(e)} style={{ width: 500 }} disabled={!category.isNewCAtegory} value={category.isNewCAtegory ? category.value : ''} name='newCategory' />
      </Modal>
    );
  }
}

interface Props {
  visible: boolean;
  category: Category;
  handleOk: () => void;
  handleCancel: () => void;
  onSelect: (value) => void;
  onSwitch: (value) => void;
  onChange: (e) => void;
}

interface State {
  loading: boolean;
  data: [];
  error: any;
}
