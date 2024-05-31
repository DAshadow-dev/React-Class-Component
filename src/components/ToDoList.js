import React from 'react';
import { Button, Form, ListGroup, Container, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class ToDoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [],
            newTask: '',
        }
    }

    handleInputChange = (e) => {
        this.setState({
            newTask: e.target.value
        })
    }

    handleAddTask = () => {
        const { tasks, newTask } = this.state;
        if (newTask.trim().length !== 0) {
            this.setState({
                tasks: [...tasks, newTask],
                newTask: ''
            })
        }
    }

    handleDeleteTask = (index) => {
        const { tasks } = this.state;
        this.setState({
            tasks: [...tasks.slice(0, index), ...tasks.slice(index + 1)]
        })
    }

    render() {
        const { tasks, newTask } = this.state;
        return (
            <Container className="d-flex flex-column align-items-center justify-content-center min-vh-100 bg-light">
                <Row className="w-100">
                    <Col md={{ span: 6, offset: 3 }}>
                        <h1 className="text-center my-4">To Do List</h1>
                        <InputGroup className="mb-3">
                            <Form.Control
                                type='text'
                                value={newTask}
                                placeholder='Add Task'
                                onChange={this.handleInputChange}
                            />
                            <Button variant="primary" onClick={this.handleAddTask}>Add Task</Button>
                        </InputGroup>
                        {
                            tasks.length > 0 ? (
                                <ListGroup>
                                    {
                                        tasks.map((task, index) => (
                                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                                {task}
                                                <Button variant="danger" onClick={() => this.handleDeleteTask(index)}>Delete</Button>
                                            </ListGroup.Item>
                                        ))
                                    }
                                </ListGroup>
                            ) : (
                                <p className="text-center text-muted">No tasks added yet.</p>
                            )
                        }
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default ToDoList;
