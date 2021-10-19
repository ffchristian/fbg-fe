export default class Service {
  private apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
  private data: any [] = [];
  private lRectCoodinates: any [] = [];
  private area = 0;

  async getBoardData(boardName: string) {
    try {
      const endpoint = '/board/';
      const data = await fetch(`${this.apiUrl}${endpoint}${boardName}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
    const {matrixData, lRectCoodinates, area} = await data.json();
    this.area = area;
    this.data = matrixData;
    this.lRectCoodinates = lRectCoodinates;
    this.drawRectangle();
    return this.data;
    } catch (error) {
      this.data = [];
      return this.data;
    }
  }
  async updateByBoardData(boardName: string, coordinates: {x: number, y: number}, value: boolean) {
    try {
      this.data[coordinates.x][coordinates.y] = this.data[coordinates.x][coordinates.y] === 2 ? false : value;
      const endpoint = '/board/';
      const data = await fetch(`${this.apiUrl}${endpoint}${boardName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coordinates, value: this.data[coordinates.x][coordinates.y] })
      });
    const {lRectCoodinates, area, matrixData} = await data.json();
    this.area = area;
    this.data = matrixData;
    this.lRectCoodinates = lRectCoodinates;
    this.drawRectangle();
    return this.data;
    } catch (error: any) {
      throw error.message;
    }
  }
  async reset(boardName: string) {
    try {
      const endpoint = '/board/reset/';
      const data = await fetch(`${this.apiUrl}${endpoint}${boardName}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      });
      const {matrixData, lRectCoodinates} = await data.json();
      this.data = matrixData;
      this.lRectCoodinates = lRectCoodinates;
      this.drawRectangle();
      return this.data;
    } catch (error: any) {
      throw error.message;
    }
  }
  getArea() {
    return this.area;
  }
  drawRectangle() {
    for (const {x, y} of this.lRectCoodinates) {
      this.data[x][y] = 2;
    }
    return this.data;
  }
}