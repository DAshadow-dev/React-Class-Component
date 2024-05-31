import React from 'react';
import { Button, Form, ListGroup, Container, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            searchInput: '',
            items: [
                'ReactJS',
                'NodeJS',
                'ExpressJS',
                'MongoDB',
                'MySQL',
                'HTML',
                'AngularJS',
                'VueJS',
            ],
            colors: ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light']
        }
    }

    handleSearch = (e) => {
        this.setState({
            searchInput: e.target.value
        })
    }

    render() {
        const { searchInput, items, colors } = this.state;
        const filterItems = items.filter(item => item.toLowerCase().includes(searchInput.toLowerCase()))

        return (
            <Container className="my-5">
                <Row className="justify-content-center">
                <h1 className="text-center my-4">Search</h1>
                    <Col md="6">
                        <InputGroup>
                            <Form.Control
                                type='text'
                                placeholder='Search...'
                                value={searchInput}
                                onChange={this.handleSearch}
                            />
                        </InputGroup>
                        <ListGroup className="mt-3">
                            {filterItems.map((item, index) => (
                                <ListGroup.Item key={index} className={`bg-${colors[index % colors.length]} text-dark fw-bold`}>{item}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Search;
