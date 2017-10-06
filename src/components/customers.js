import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Table from 'react-bootstrap/lib/Table'
import Modal from 'react-bootstrap/lib/Modal'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Alert from 'react-bootstrap/lib/Alert'
import {connect} from 'react-redux'
import {getCustomer} from '../AC'
import {
    createItemApi,
    editItemApi,
    deleteItemApi
} from '../api'


class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            customerId: '',
            customerName: '',
            customerAddress: '',
            customerPhone: '',
            validName: true,
            validAddress: true,
            validPhone: true
        }
    }

    static propTypes = {
        // from connect
        getCustomer: PropTypes.func.isRequired,
        customers: PropTypes.array
    };

    componentDidMount() {
        this.props.getCustomer();
        document.title = 'Customer List';
    }
    
    handleChangeInput = (ev) => {
        const {value, name} = ev.target;

        switch(name){
            case 'customerName':
                this.setState({
                    [name]: value
                });
                break;
            case 'customerAddress':
                this.setState({
                    [name]: value
                });
                break;
                
            case 'customerPhone':
                if(value.match(/^[0-9()\-+ ]+$/) || value === '') {
                    this.setState({
                        [name]: value
                    });
                }    
        }
    };

    validationInput = () => {
        this.state.customerName === '' ? this.setState({validName : false}) : this.setState({validName : true});
        this.state.customerAddress === '' ? this.setState({validAddress : false}) : this.setState({validAddress : true});
        this.state.customerPhone === '' ? this.setState({validPhone : false}) : this.setState({validPhone : true})
    };


    showCreateModal = () => {
        this.setState({
            modalCreate: true
        })
    };

    showEditModal = (customer) => {
        this.setState({
            ...customer,
            modalEdit: true
        })
    };

    showDeleteModal = (customer) => {
        this.setState({
            ...customer,
            modalDelete: true
        })
    };

    hideModals = () => {
        this.setState({
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            customerId: '',
            customerName: '',
            customerAddress: '',
            customerPhone: '',
            validName: true,
            validAddress: true,
            validPhone: true
        })
    };

    createCustomer = () => {
        this.validationInput();
        if(this.state.customerName === '' || this.state.customerAddress === '' || this.state.customerPhone === '') return;

        const newCustomer = {
            name: this.state.customerName,
            address: this.state.customerAddress,
            phone: this.state.customerPhone
        };

        createItemApi('/api/customers', this.props.getCustomer, newCustomer);
        this.hideModals();
    };

    editCustomer = () => {
        this.validationInput();
        if(this.state.customerName === '' || this.state.customerAddress === '' || this.state.customerPhone === '') return;

        const {customerId} = this.state;
        const editCustomer = {
            name: this.state.customerName,
            address: this.state.customerAddress,
            phone: this.state.customerPhone
        };

        editItemApi(`/api/customers/${customerId}`, this.props.getCustomer, editCustomer);
        this.hideModals();
    };

    deleteCustomer = () => {
        const {customerId} = this.state;

        deleteItemApi(`/api/customers/${customerId}`, this.props.getCustomer);
        this.hideModals();
    };

    renderBody () {
        return(
            this.props.customers.map(customer => (
                <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td>{customer.name}</td>
                    <td>{customer.address}</td>
                    <td>{customer.phone}</td>
                    <td>
                        <Button
                            onClick={this.showEditModal.bind(this, {
                                    customerId: customer.id,
                                    customerName: customer.name,
                                    customerAddress: customer.address,
                                    customerPhone: customer.phone
                            })}
                            className="btn btn-default" style={{marginRight: 20}}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={this.showDeleteModal.bind(this, {
                                customerId: customer.id,
                                customerName: customer.name

                            })}
                            className="btn btn-danger"
                        >
                            Delete
                        </Button>
                    </td>
                </tr>
            ))
        )
    };

    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={12}>
                            <h1 style={{display: 'inline-block', marginRight: 20}}>Customer List</h1>
                            <Button onClick={this.showCreateModal}>Create</Button>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Address</th>
                                    <th>Phone</th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.customers.length > 0 ?this.renderBody() : <tr><td><h3 className="text-center">no customer</h3></td></tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>

                <div className="static-modal">
                    <Modal show={this.state.modalCreate}>
                        <Modal.Header>
                            <Modal.Title>Create new customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup className={!this.state.validName ? 'has-error': ''}>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        name="customerName"
                                        type="text"
                                        value={this.state.customerName}
                                        placeholder="Enter name"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                                <FormGroup className={!this.state.validAddress ? 'has-error': ''}>
                                    <ControlLabel>Address</ControlLabel>
                                    <FormControl
                                        name="customerAddress"
                                        type="text"
                                        value={this.state.customerAddress}
                                        placeholder="Enter address"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                                <FormGroup className={!this.state.validPhone ? 'has-error': ''}>
                                    <ControlLabel>Phone</ControlLabel>
                                    <FormControl
                                        name="customerPhone"
                                        type="text"
                                        value={this.state.customerPhone}
                                        placeholder="Enter phone"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.createCustomer} bsStyle="primary">Create</Button>
                            <Button onClick={this.hideModals}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="static-modal">
                    <Modal show={this.state.modalEdit}>
                        <Modal.Header>
                            <Modal.Title>Edit customer</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup className={!this.state.validName ? 'has-error': ''}>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        name="customerName"
                                        type="text"
                                        value={this.state.customerName}
                                        placeholder="Enter name"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                                <FormGroup className={!this.state.validAddress ? 'has-error': ''}>
                                    <ControlLabel>Address</ControlLabel>
                                    <FormControl
                                        name="customerAddress"
                                        type="text"
                                        value={this.state.customerAddress}
                                        placeholder="Enter address"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                                <FormGroup className={!this.state.validPhone ? 'has-error': ''}>
                                    <ControlLabel>Phone</ControlLabel>
                                    <FormControl
                                        name="customerPhone"
                                        type="text"
                                        value={this.state.customerPhone}
                                        placeholder="Enter phone"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.editCustomer} bsStyle="primary">Edit</Button>
                            <Button onClick={this.hideModals}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="static-modal">
                    <Modal show={this.state.modalDelete}>
                        <Modal.Header>
                            <Modal.Title>Delete "{this.state.customerName}"</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert bsStyle="danger" >
                                <p>Are you sure you want to delete this customer?</p>
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.deleteCustomer} className="btn btn-danger" >Delete</Button>
                            <Button onClick={this.hideModals}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </div>
        );
    }
}

export default connect((state) => {
    return {
        customers: state.customer
    }
}, {getCustomer})(Products);

