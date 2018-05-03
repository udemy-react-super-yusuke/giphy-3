import React from "react";
import { render } from "react-dom";

import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = { gifUrlList: [] };
  }

  // img 要素のリストを作るメソッド
  renderImageList(list) {
    const imageList = list.map(url => {
      return (
        <li>
          <img src={url} />
        </li>
      );
    });

    return <ul>{imageList}</ul>;
  }

  componentDidMount() {
    this.giphyApi();
  }

  render() {
    console.log(this.state.gifUrlList);
    // 上記メソッドをレンダー内で使用する
    return <div>{this.renderImageList(this.state.gifUrlList)}</div>;
  }

  giphyApi() {
    const search = "cat";
    const key = "V6AU97qCSCYVmbIC5UDppEiVM1xnuO9E";
    const limit = 10;
    const url = `https://api.giphy.com/v1/gifs/search?q=${search}&api_key=${key}&limit=${limit}`;

    axios.get(url).then(res => {
      const data = res.data.data;
      const imageUrlList = data.map(item => item.images.downsized.url);
      this.setState({ gifUrlList: imageUrlList });
    });
  }
}

render(<App />, document.getElementById("root"));
