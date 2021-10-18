import  { Component } from 'react';
import Service from '../../services/backend.service';
import Cell from '../cell/cell';
type GridType = {
  boardName: string,
  on: string,
  off: string,
  data: any[],
  service: Service,
  triggerBoardRender: (data: any, area: number) => Promise<void>
}
export default class Grid extends Component<GridType> {
  public state: any;
  public rows: any;
  constructor(props: any) {
    super(props);
    this.state = {
      data: this.props.data
    };
    this.updatePosition = this.updatePosition.bind(this);
  }

  async updatePosition(x: number, y: number, value: boolean) {
   try {
    const data = await this.props.service.updateByBoardData(this.props.boardName, {x, y}, value);
    this.props.triggerBoardRender(data, this.props.service.getArea());
   } catch (error) {
    const data = await this.props.service.getBoardData(this.props.boardName);
    this.props.triggerBoardRender(data, this.props.service.getArea());
   }
  }

  async getRows() {
    const matrix = this.props.data;
    const rows = [];
    for (let x = 0; x < matrix.length; x++) {
      const cols = [];
      for (let y = 0; y < matrix[x].length; y++) {
        cols.push(
        <td key={ `cell-${x}-${y}` }>
          <Cell event={this.updatePosition}
            x={x}
            y={y}
            touched={matrix[x][y]}
            colors={[this.props.off || 'grey', this.props.on || 'withe']}>
          </Cell>
        </td>);
      }
      rows.push(<tr key={ `row-${x}` }>{cols}</tr>);
    }
    this.rows = rows;
    return rows;
  }

  render() {
    this.getRows();
    return (
      <div className='grid'>
        <table>
          <tbody className='fadeIn'>
            {this.rows}
          </tbody>
        </table>
      </div>
    );
  }
}