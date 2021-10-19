import Grid from './components/grid/grid';
import Service from './services/backend.service';
import  { Component } from 'react';
import './App.css';
import './components/cell/cell.css';
class App extends Component {
  public state: any;
  public service = new Service();
  constructor(props: any) {
    super(props);

    this.reset = this.reset.bind(this);
    this.getData = this.getData.bind(this);
    this.triggerBoardRender = this.triggerBoardRender.bind(this);
    this.state = {
      boardName: '',
      data: [],
      area: 0
    };
  }
  async componentDidMount() {
    this.setState({ data: await this.service.getBoardData(this.state.boardName) });
  }

  async reset(e: any) {
    this.setState({ data:  [] });
    this.setState({ data:  await this.service.reset(this.state.boardName) });
  }
  async getData(e: any) {
    this.setState({ data:  [] });
    this.setState({ data:  await this.service.getBoardData(this.state.boardName), area: this.service.getArea() });
  }
  async triggerBoardRender(data: any, area: number) {
    this.setState({ data:  [] });
    this.setState({ data, area});
  }
  async setBoardName(name: any) {
    this.setState({ boardName: name });
  }

  render() {
    return (
      <div id='app'>
        <Grid
          boardName={this.state.boardName}
          on='grey' off='white'
          data={this.state.data} service={this.service}
          triggerBoardRender={this.triggerBoardRender}
        ></Grid>
        <input onChange={event => this.setBoardName(event.target.value)} />
        <input type='button' onClick={ this.getData } value='Get Data' />
        <input type='button' onClick={ this.reset } value='Reset' />
        <span>Selected area: {this.state.area}</span>
      </div>
    );
  }
}

export default App;
