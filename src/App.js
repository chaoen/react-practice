import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

// function ScrollingList(
//     error,
//     items,
//     isLoaded
//   ) {

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   } else if (!isLoaded) {
//     return <div>Loading...</div>;
//   } else {
//     return (
//       <table>
//         <thead>
//           <tr>
//             <th>姓名</th>
//             <th>職業</th>
//             <th>功能</th>
//           </tr>
//         </thead>
//         <tbody>
//           {items.map(item => (
//             <tr key={item.id}>
//               <td>{item.name}</td>
//               <td>{item.job.name}</td>
//               <td><button onClick={()=>alert(item.id + "被點擊了")}>預約</button></td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     );
//   }
// }

class ScrollingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      items: [],
      isLoaded: false,
      search: {
        name: ""
      }
    }

    this.successCallBack = this.successCallBack.bind(this);
    this.errorCallBack = this.errorCallBack.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.handleSearchNameOnChange = this.handleSearchNameOnChange.bind(this);
  }

  fetchData() {
    let queryString = new URLSearchParams(this.state.search).toString()
    fetch("http://127.0.0.1:7001/api/v1/human_resource?" + queryString)
      .then(res => res.json())
      .then(this.successCallBack,this.errorCallBack)
  }

  successCallBack(result) {
    console.log(result);
    this.setState({
      isLoaded: true,
      items: result.items
    });
  }

  errorCallBack(error) {
    this.setState({
      isLoaded: true,
      error
    });
  }

  handleSearchNameOnChange(event) {
    const state = this.state
    state.search.name = event.target.value;
    this.setState(state);
    this.fetchData()
  }

  componentDidMount() {
    this.fetchData();
  }

  render() {
    const { error, isLoaded, items } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          <SearchBar search={this.state.search} handleSearchNameOnChange={this.handleSearchNameOnChange} />
          <table>
            <thead>
              <tr>
                <th>姓名</th>
                <th>職業</th>
                <th>功能</th>
              </tr>
            </thead>
            <tbody>
              {items.map(item => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.job.name}</td>
                  <td><button onClick={()=>alert(item.id + "被點擊了")}>預約</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
  }
}

// function SearchBar(
//     name,
//     onChangeEvent
//   ) {
//   // const [name, setName] = useState('');
//   console.log(onChangeEvent)
//   return <div>
//       <label>姓名</label>
//       <input
//         placeholder="請輸入姓名"
//         value={name}
//         onChange={(e) => onChangeEvent(e.target)}
//       />
//     </div>;
// }

class SearchBar extends React.Component {
  // constructor(props) {
    // super(props);
    // this.handleOnChange = this.handleOnChange.bind(this)
  // }

  // handleOnChange(e) {
  //   this.setState({name: e.target.value})
  // }

  render() {
    return <div>
        <label>姓名</label>
        <input
          type="text"
          value={this.props.search.name}
          onChange={this.props.handleSearchNameOnChange}
        />
      </div>;
  }
}

function App() {
  // const [error, setError] = useState(null);
  // const [items, setItems] = useState([]);
  // const [isLoaded, setIsLoaded] = useState(false);
  // const [name, setName] = useState("");

  // const handleSearchNameChanged = function(target) {
  //   setName(target.value)
  // }

  // useEffect()

  return (
    <div className="App">
      <header className="App-header">
        <ScrollingList />
      </header>
    </div>
  );
}

export default App;
