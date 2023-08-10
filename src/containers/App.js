import React,{ useState, useEffect}  from "react";
import { connect } from "react-redux";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import ErrorBoundry from "../components/ErrorBoundry";
import Scroll from '../components/Scroll';
import './App.css';

import { setSearchfield, requestRobots } from "../actions";

const mapStateToProps = state =>{
  return{
    searchField: state.searchRobots.searchField,
    robots: state.requestRobots.robots,
    isPending: state.requestRobots.isPending,
    error: state.requestRobots.error
  }
}

const mapDispatchToProps = (dispatch) =>{
  return{
  onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
  onRequestRobots: ()=>dispatch(requestRobots())
  }
}

function App(){

        const [robots, setRobots] = useState([]);
        const [searchField, setSearchfield, isPending] = useState('');
        const [count, setCount]= useState(0);
        useEffect(()=>{
          fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=> response.json())
            .then(users=>{setRobots(users)});
    },[count])


        const onSearchChange = (event) => {
             setSearchfield( event.target.value);
        }
      const filteredRobots = robots.filter(robot =>{
            return robot.name.toLowerCase().includes(searchField.toLowerCase());
        })
       return isPending? 
       <h1>Loading</h1>  :
            <div className='tc'>
            <h1 className="f1">RoboFriends</h1>
            <button onClick={()=>setCount(count+1)}>Click Me!</button>
            <SearchBox searchChange={onSearchChange}/>
            <Scroll>
              <ErrorBoundry>
              <CardList robots={filteredRobots} />
              </ErrorBoundry>
            </Scroll>
          </div>
}

export default connect(mapStateToProps, mapDispatchToProps)(App);