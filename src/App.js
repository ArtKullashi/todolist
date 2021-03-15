import React from 'react';
import TodoItem from "./TodoItem";
import "./style.css";

let todoStorage= [];
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      name: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleName = this.handleName.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.updateStorage= this.updateStorage.bind(this);
  }

  componentDidMount = async()=> {
    try{
      let todos = await localStorage.getItem('item');
      let parsedTodos = JSON.parse(todos);
      this.setState({todos: parsedTodos});
    }
    catch(error){
      alert(error);
    }
  }

  updateStorage() {
    todoStorage=this.state.todos;

    localStorage.setItem('item', JSON.stringify(todoStorage))
  }
  
  componentDidUpdate() {
    this.updateStorage();
  }

  handleChange(id) {
    this.setState(prevState =>{
      const newTodos = prevState.todos.map(todo =>{
        if(todo.id === id) {
          return {
            ...todo,
            completed: !todo.completed
          }
        }
        return todo;
      })
       return {
         todos: newTodos
       }
    })
   
  }

  handleDelete(id) {
    this.setState(prevState =>{
      
      const newTodos = prevState.todos.map(todo => {
       return todo
      })
      let index = newTodos.findIndex(a => a.id===id);
      if(index > -1){
        newTodos.splice(index, 1);
      }  
      return{
        todos: newTodos
      }
      
    })
  }

  handleEdit(id, text) {
    if(text===""){
      window.alert("Specify your todo");
      return;
    }
    let edit = this.state.todos.map(a=> a.text)
      for(let i=0; i<edit.length; i++){
        if(text.toLowerCase()===edit[i].toLowerCase()){ 
            window.alert("That todo already exists");
            return;
        }
      }
    
    this.setState(prevState =>{
      const newTodos = prevState.todos.map(todo =>{
        if(todo.id === id) {
          return {
            ...todo,
            text: text
          }
        }
        return todo;   
      })
      
       return {
         todos: newTodos
       }
    })
  }

  handleName(event){
    const {name, value}=event.target
    this.setState({
      [name]: value
    })
  }
  
  handleSubmit= async(event)=>{
    event.preventDefault();
    try{
      let storedTodos = await localStorage.getItem('item');
      let parsed=JSON.parse(storedTodos)  
      if(parsed != null){
        todoStorage = parsed;
        let id = parsed.map(a => a.id);
        let highestId;
        if(id.length===0){
          highestId=0;
        }
        else{
          highestId=Math.max(...id);
        }
        let text = parsed.map(a=> a.text)
        for(let i=0; i<parsed.length; i++){
          if(this.state.name.toLowerCase()===text[i].toLowerCase()){ 
              window.alert("That todo already exists");
              return;
          }
          else if(this.state.name===""){
            window.alert("Specify your todo");
            return;
          }
        }
      
        this.setState({todos:  [...this.state.todos, {id: highestId+1, text:this.state.name, completed: false}]});
        this.setState({name: ""});
        
      }
      
      else{
        this.setState({todos: [{id: 1, text:this.state.name, completed: false}]})
      }
    
     
    }
    catch(error){
      alert(error);
    }
    
  }

  render() {
    if(this.state.todos !=null){
      const todosMapped = this.state.todos.map(item => <TodoItem key={item.id} item={item} handleChange={this.handleChange}
      handleDelete={this.handleDelete} handleEdit={this.handleEdit}/>);
      return (
        <div className="todo-list">
          <h1>Add a Todo</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} name="name" onChange={this.handleName} placeholder="Make your bed"/>
            <input type="submit" value="add" />
          </form>
          {todosMapped}
        </div>
        
      )
     }
     return (
       <div className="todo-list">
          <h1>Add a Todo</h1>
          <form onSubmit={this.handleSubmit}>
            <input type="text" value={this.state.name} name="name" onChange={this.handleName} placeholder="Make your bed"/>
            <input type="submit" value="add" />
          </form>
        </div>
       
     )
     
  }
}

export default App;
