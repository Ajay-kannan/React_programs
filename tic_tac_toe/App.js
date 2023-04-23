import "./App.css"
import React, { Component } from 'react'


// winning conditions of game
const WIN = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

//individual box component for display player choice
class Box extends Component 
{
 render()
  {
    let {value , onClick} = this.props;
    // checks current player and set the class 
    const style = value === "x" ? "box x" : "box o";
    return(
      <button className={style} onClick={onClick}> {value} </button>
    )
  }
}

class Board extends Component 
{

  render()
  {
    let {value, onClick} = this.props;
    return ( 
      // it create a 3X3 matrix to setup table of value
      <div className="grid">
        {value.map((value , idx)=>{
          return <Box value= {value} key={idx} onClick = {() => value === "" && onClick(idx)}/>
        })}
      </div>
    )
      
    
  }
}

// scores board 
class Scores extends Component{
  render()
  {
    const {xscores,oscores} = this.props.scores;
    let xplay = this.props.xplay;
    return (
      <div className="scoreboard">
          <span className={`score x-score ${!xplay && "inactive"}`}>X - {xscores}</span>
          <span className={`score o-score ${xplay && "inactive"}`} >O - {oscores}</span>
      </div>
    );
  }
}

// reset button 
class Resetbutton extends Component
{
  render()
  {
    let {resetboard} = this.props;
    return(
      <button className="reset" onClick={resetboard}>reset</button>
    );
  }
}

class App extends Component {

  constructor(props)
  {
    super(props);
    this.state = {board : ["","","" ,"","","","" ,"",""] , // initial value
    xplay : true,
    scores : {xscores : 0 , oscores : 0},
    gameover : false
  };
    this.setBoard = this.setBoard.bind(this);
    this.checkWinner = this.checkWinner.bind(this);
    this.resetboard = this.resetboard.bind(this);
  }

  // check the winner by condition of WIN variable
  checkWinner(board) {

    for (let i=0; i< WIN.length; i++)
    {
      const [x,y,z] = WIN[i];
      if (board[x] && board[x] === board[y] && board[y] === board[z])
      {
        this.setState({gameover : true});
        return board[x];
      }
    }
  }
// maintain the all game changes
  setBoard(index)
  {
    const updateboard = this.state.board.map((value , idx)=>{
      if(idx === index){
        return this.state.xplay === true ? "x" : "o";
      }else {
        return value;
      }

    } )
// it return who is winner
    let winner = this.checkWinner(updateboard);

    if(winner)
    {
      let newscores = this.state.scores;

      // adding the scores to the table
      if(winner === "o")
      {
        newscores.oscores += 1;
        this.setState({scores : newscores})
      }
      else{
        newscores.xscores += 1;
        this.setState({scores : newscores});
      }
      console.log(newscores);
    }

    // set the updated game of board
    if(!this.state.xplay)
    this.setState({board : updateboard , xplay : true})
    else 
    this.setState({board : updateboard , xplay : false})
   

  }
// reset the board
  resetboard()
  {
    this.setState({gameover : false});
    this.setState({board : ["","","" ,"","","","" ,"",""]});
  }
  render() {
   let board = this.state.board;
    return (<div>
     <Scores scores={this.state.scores} xplay = {this.state.xplay}/>
     <Board value={board} onClick={this.state.gameover ? this.resetboard :this.setBoard}/>
     <Resetbutton resetboard = {this.resetboard}/>
</div>
    )
  }
}

export default App ;