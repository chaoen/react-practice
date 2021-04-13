import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function ScrollingList(
    error,
    items,
    isLoaded
  ) {

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
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
    );
  }
}

// class ScrollingListBak extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null,
//       items: [],
//       isLoaded: false,
//     }
//   }

//   componentDidMount() {
//     fetch("http://127.0.0.1:7001/api/v1/human_resource")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           this.setState({
//             isLoaded: true,
//             items: result.items
//           });
//         },
//         (error) => {
//           this.setState({
//             isLoaded: true,
//             error
//           });
//         }
//       )
//   }
//   render() {
//     const { error, isLoaded, items } = this.state;
//     if (error) {
//       return <div>Error: {error.message}</div>;
//     } else if (!isLoaded) {
//       return <div>Loading...</div>;
//     } else {
//       return (
//         <table>
//           <thead>
//             <tr>
//               <th>姓名</th>
//               <th>職業</th>
//               <th>功能</th>
//             </tr>
//           </thead>
//           <tbody>
//             {items.map(item => (
//               <tr key={item.id}>
//                 <td>{item.name}</td>
//                 <td>{item.job.name}</td>
//                 <td><button onClick={()=>alert(item.id + "被點擊了")}>預約</button></td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       );
//     }
//   }
// }

function SearchBar(
    name,
    onChangeEvent
  ) {
  // const [name, setName] = useState('');
  console.log(onChangeEvent)
  return <div>
      <label>姓名</label>
      <input
        placeholder="請輸入姓名"
        value={name}
        onChange={(e) => onChangeEvent(e.target)}
      />
    </div>;
}

// class SearchBarBak extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       name: '',
//     }
//   }

//   render() {
//     return <div>
//         <label>姓名</label>
//         <input type="text" value={this.state.name} />
//       </div>;
//   }
// }

function App() {
  const [error, setError] = useState(null);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [name, setName] = useState("");

  const handleSearchNameChanged = function(target) {
    setName(target.value)
  }

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar
          name={ name }
          onChange={() => handleSearchNameChanged}
        />
        <ScrollingList
          error={ error }
          items={ items }
          isLoaded={ isLoaded }
        />
      </header>
    </div>
  );
}

export default App;
