import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Table from 'react-bootstrap/lib/Table'
import Modal from 'react-bootstrap/lib/Modal'
import Alert from 'react-bootstrap/lib/Alert'
import {connect} from 'react-redux'
import {getInvoice, getCustomer} from '../AC'
import {deleteItemApi} from '../api'


class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            modalDelete: false,
            invoiceId: ''
        }
    }

    static propTypes = {
        // from connect
        getInvoice: PropTypes.func.isRequired,
        invoices: PropTypes.array,
        customers: PropTypes.array
    };

    componentDidMount() {
        this.props.getInvoice();
        this.props.getCustomer();
        document.title = 'Invoice List';
    }

    showDeleteModal = (id) => {
        this.setState({
            ...id,
            modalDelete: true
        })
    };

    hideModals = () => {
        this.setState({
            modalDelete: false,
            invoiceId: ''
        })
    };

    deleteInvoice = () => {
        const {invoiceId} = this.state;
        deleteItemApi(`/api/invoices/${invoiceId}`, this.props.getInvoice);
        
        this.hideModals()
    };

    getCustomerName = (id) => {
         let customer =  this.props.customers.filter(customer => {
            return customer.id === id
        });
        
        if(customer.length < 1) return;

        return customer[0].name
    };

    renderBody () {
        return(
            this.props.invoices.map(invoice => (
                <tr key={invoice.id}>
                    <td>{invoice.id}</td>
                    <td>{this.getCustomerName(invoice.customer_id)}</td>
                    <td>{invoice.discount}</td>
                    <td>{invoice.total}</td>
                    <td>
                        <Button className="btn btn-default" style={{marginRight: 20}}>Edit</Button>
                        <Button
                            onClick={this.showDeleteModal.bind(this, {
                                invoiceId: invoice.id
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
                            <h1 style={{display: 'inline-block', marginRight: 20}}>Invoice List</h1>
                            <Link to="/invoices/create"><Button>Create</Button></Link>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Discount</th>
                                    <th>Total</th>
                                    <th> </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.invoices.length > 0 ?this.renderBody() : <tr><td><h3 className="text-center">no invoices</h3></td></tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>

                <div className="static-modal">
                    <Modal show={this.state.modalDelete}>
                        <Modal.Header>
                            <Modal.Title>Delete invoice</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert bsStyle="danger" >
                                <p>Are you sure you want to delete this invoice?</p>
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.deleteInvoice} className="btn btn-danger" >Delete</Button>
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
        invoices: state.invoice,
        customers: state.customer
    }
}, {getInvoice, getCustomer})(Products);





