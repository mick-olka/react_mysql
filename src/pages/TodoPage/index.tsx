import React, { useState, useEffect } from 'react'
import { ITodo } from '../../interfaces/interfaces';
import {TodoForm} from "../../components/Todo/TodoForm";
import {TodoList} from "../../components/Todo/TodoList";
import s from './TodoPage.module.scss';

declare var confirm: (question: string) => boolean

export const TodosPage: React.FC = () => {
    const [todos, setTodos] = useState<ITodo[]>(JSON.parse(localStorage.getItem('todos') || '[]'));

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('todos') || '[]') as ITodo[]
        setTodos(saved)
    }, [])

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    }, [todos])

    const addHandler = (title: string) => {
        const newTodo: ITodo = {
            title: title,
            id: Date.now(),
            completed: false
        }
        // setTodos([newTodo, ...todos])
        setTodos(prev => [newTodo, ...prev])
    }

    const toggleHandler = (id: number) => {
        let updatedTodos = todos.map(todo => {
            if (todo.id === id) {
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }

    const removeHandler = (id: number) => {
        const shoudRemove = confirm('Вы уверены, что хотите удалить элемент?')
        if (shoudRemove) {
            setTodos(prev => prev.filter(todo => todo.id !== id))
        }
    }

    return (
        <div className={s.main_pane}>
            <TodoForm onAdd={addHandler} />

            <TodoList
                todos={todos}
                onToggle={toggleHandler}
                onRemove={removeHandler}
            />
        </div>
    )
}