import React, {useState} from "react"; 
 
function TodoItem (props) {
    const [edit, setEdit] = useState("")
    const [editing, setEditing] = useState(false);

    function handleName(event){
        setEdit(event.target.value)
    }

    function handleSubmit(event){
        event.preventDefault();
    }

    function changeEdit(){
        setEditing(prevEditing => !prevEditing);
    }


    let changed = {
        display: "none"
    }

    return(
        <div className="todo-item">
            <input
                type="checkbox"
                checked={props.item.completed}
                onChange={() => props.handleChange(props.item.id)}
                />
                <p className={props.item.completed ? "completedTodos" : null}
                    style={editing ? changed : null}>
                    {props.item.text}
                </p>
                <form style={editing ? null : changed}
                    onSubmit={handleSubmit}>
                <input type="text" 
                    className="editInput"
                    defaultValue={props.item.text}
                    name="edit"
                    onChange={handleName}
                />
                <input type="submit"
                    value="edit"
                    onClick={() => {props.handleEdit(props.item.id, edit);
                    setEditing(prevEditing => !prevEditing)}}
                />
                </form>
                <button
                    onClick={() =>props.handleDelete(props.item.id)}
                    className="deleteButton">x</button>
                <button
                    className="deleteButton"
                    onClick={changeEdit}>
                    {editing ? "nevermind" : "edit"}
                </button>     
        </div>
    )
}


export default TodoItem;