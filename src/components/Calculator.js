import React from 'react';
import { Button, Form, ListGroup, Container, Row, Col, InputGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

class Calculator extends React.Component {
    constructor(props){
        super(props);
        this.state ={
            input : '',
            prevInput : '',
            result : '',
            operator : null,
            error:''
        }
    }

    handleButtonInput = (value) =>{
        const { input , result, error } = this.state;

        if (error) {
            this.clear();
        }

        if (["+","-","*","/"].includes(value)){
            this.setState({
                prevInput : input || result,
                input : '',
                operator : value,
                result : '',
                error: ''
            })
        }
        else if (value === "="){
            this.calculateResult();
        }
        else if (value === "AC"){
            this.clear();
        }
        else {
            this.setState({
                input : input + value,
            })
        }
    }

    calculateResult = () =>{
        const {input, prevInput, operator} = this.state;
        let result = ''
        let error = ''

        try {
            switch (operator) {
                case '+':
                    result = parseFloat(prevInput) + parseFloat(input);
                    break;
                case '-':
                    result = parseFloat(prevInput) - parseFloat(input);
                    break;
                case '*':
                    result = parseFloat(prevInput) * parseFloat(input);
                    break;
                case '/':
                    if (parseFloat(input) === 0) {
                        throw new Error("Cannot divide by zero");
                    }
                    result = parseFloat(prevInput) / parseFloat(input);
                    break;
                default:
                    break;
            }
        } catch (e) {
            error = e.message;
        }

        if (error) {
            this.setState({
                input: '',
                previousInput: '',
                operator: null,
                result: '',
                error: error
            });

            setTimeout(this.clear, 3000);
        } else {
            this.setState({
                input: '',
                previousInput: '',
                operator: null,
                result: result.toString(),
                error: ''
            });
        }
    }

    clear = () => {
        this.setState({
            input: '',
            previousInput: '',
            operator: null,
            result: '',
            error: ''
        });
    }

    render() {
        const { input, result, error } = this.state;

        return (
            <Container className="d-flex justify-content-center align-items-center vh-100">
                <div className="calculator p-3 border rounded shadow-sm bg-white">
                    <div className="display p-2 mb-3 border rounded bg-light text-center">
                        {error||input||result||'0'}
                    </div>
                    <div className="buttons">
                        <Row className="g-2">
                        {['+', '-', '*', '/', 
                        '7', '8', '9', 'AC', 
                        '4', '5', '6', '=', 
                        '1', '2', '3', '.', 
                        '0'].map((button) => {
                                let variant = 'light';
                                if (button === 'AC') variant = 'danger';
                                if (button === '=') variant = 'primary';
                                return (
                                    <Col xs={3} key={button}>
                                        <Button
                                            variant={variant}
                                            className="w-100"
                                            onClick={() => this.handleButtonInput(button)}
                                        >
                                            {button}
                                        </Button>
                                    </Col>
                                );
                            })}
                        </Row>
                    </div>
                </div>
            </Container>
        );
    }
}

export default Calculator;