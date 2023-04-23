import React from 'react';
import "./App.css" ;
class Inputfield extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      value : ""
    };
    this.handingsubmit = this.handingsubmit.bind(this);
    this.handlechange = this.handlechange.bind(this);
  }

  handingsubmit(e) {
    e.preventDefault();
    if(!this.state.value) return;
    this.props.addtodo(this.state.value);
    this.setState({value :""});
  }

  handlechange(e)
  {
    this.setState({value : e.target.value});
  }

  render(){
    return (
    <div >
      <form onSubmit={this.handingsubmit} id='input'  >
    <input type="text" value={this.state.value} id="inputfield" onChange={this.handlechange} placeholder='add new todo'/>
    <button type='submit' id='butsub'>submit</button>
    </form>
    </div>
    )
  }
}

class Todolist extends React.Component {
  render()
  {
    const {todo, index , deltodo,edittodo} = this.props;
    return (
      <React.Fragment>
      <span id='todotext'>{todo.text}</span>
      <button id="editbutton" onClick={()=> edittodo(index)}>edit</button>
      <button id='delbutton' onClick={()=> deltodo(index)} >Delete</button>
      </React.Fragment>
    );
  }
}

class App extends React.Component {

  constructor(props)
  {
    super(props);
    this.state = {
    todo : [{text : "sample", done : false}]
  };

  this.addtodo =this.addtodo.bind(this);
  this.deltodo = this.deltodo.bind(this);
  this.edittodo = this.edittodo.bind(this);

  }

  addtodo(text){
    const newtodo = [...this.state.todo, {text}];
    this.setState({todo : newtodo});
  }

  deltodo(index){
const newtodo = [...this.state.todo];
newtodo.splice(index,1);
this.setState({todo : newtodo});
  }

  edittodo(index)
  {
    const newtodo = [...this.state.todo];
    var value = prompt("enter the value");
    newtodo[index].text = value;
    this.setState({todo : newtodo})
  }


  render(){
    const {todo} = this.state;
  return (
    <div className='App'>
    <Inputfield addtodo = {this.addtodo}/>
    <div id='alltodo' >
      {
    
        todo.map((todo,index) => (
          <div key={index} id='textvalue'>
            <Todolist 
            index = {index}
            todo = {todo}
            deltodo = {this.deltodo}
            edittodo = {this.edittodo}
            />
          </div>
        ))
        
      }
    </div>
    </div>
  );
  }
}