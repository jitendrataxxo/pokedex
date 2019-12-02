import * as React from 'react';
import { Row, Col, Checkbox, Collapse, Icon} from 'antd';
import { NONAME } from 'dns';

const { Panel } = Collapse;
const customPanelStyle = {
  background: '#f7f7f7',
  borderRadius: 4,
  marginBottom: 24,
  border: 0,
  overflow: 'hidden'
};

export class PokemonContent extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
  }

  render() {
    return (<Row>
      <Col span={2}><Checkbox /></Col>
      <Col span={2}><Checkbox /></Col>
      <Col span={2}><Checkbox /></Col>
      <Col span={2}><Checkbox /></Col>
    </Row>);
  }
}

interface Props {

      }

      interface State {

      }