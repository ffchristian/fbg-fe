import  { Component } from 'react';
type CellState = {
  x: number
  y: number
  width?: number
  height?: number
  colors: string[]
  touched: any
  event: (x: number, y: number, value: boolean) => void
};
enum colorDescriptor {
  ON = 1,
  OFF = 0,
  GENERATED = 2
}
export default class Cell extends Component<CellState> {
  public state: any;
  public touched: any = false;
  public color!: string;
  constructor(props: any) {
    super(props);
    this.onClick = this.onClick.bind(this);
    this.touched = this.props.touched;
    this.setColor();
    this.state = {
      color: this.color
    };
  }

  onClick(e: any) {
    this.toggleStatus();
    e.currentTarget.style.backgroundColor = this.color;
    this.props.event(this.props.x, this.props.y, this.touched);
  }
  initializeStatus() {
    this.touched = this.props.touched;
    this.setColor();
  }
  toggleStatus() {
    this.toggleTouched();
    this.setColor();
  }
  toggleTouched() {
    if (this.touched === colorDescriptor.GENERATED) {
      this.touched = true;
    }
    this.touched = !this.touched;
  }
  setColor() {
    if (this.touched === colorDescriptor.GENERATED) {
      return this.color = 'red';
    }
    this.color = this.touched ? this.props.colors[colorDescriptor.ON] : this.props.colors[colorDescriptor.OFF];
  }
  render() {
    this.initializeStatus();
    return (
      <div id={ `cell-${this.props.x}-${this.props.y}` }
        className='cell'
        style={{ backgroundColor: this.color, width: this.props.width || '', height: this.props.height || ''}}
        onClick={ this.onClick }>
      </div>
    );
  }
}
