import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import Grid from 'react-bootstrap/lib/Grid'
import Row from 'react-bootstrap/lib/Row'
import Col from 'react-bootstrap/lib/Col'
import Button from 'react-bootstrap/lib/Button'
import Table from 'react-bootstrap/lib/Table'
import FormGroup from 'react-bootstrap/lib/FormGroup'
import FormControl from 'react-bootstrap/lib/FormControl'
import ControlLabel from 'react-bootstrap/lib/ControlLabel'
import Modal from 'react-bootstrap/lib/Modal'
import Alert from 'react-bootstrap/lib/Alert'
import Select from 'react-select'
import {getProduct, getCustomer} from '../AC'
import {createItemApi} from '../api'

class CreateInvoice extends Component {
    
    constructor(props){
        super(props);

        this.state={
            discount: 0,
            customerId: '',
            productId: '',
            productPrice: '',
            productName: '',
            products: [],
            validCustomer: true,
            validProduct: true,
            total: 0
            // productsQty: {}
        }
    }

    static propTypes = {
        // from connect
        getProduct: PropTypes.func.isRequired,
        getCustomer: PropTypes.func.isRequired,
        products: PropTypes.array,
        customers: PropTypes.array
    };

    componentDidMount() {
        this.props.getProduct();
        this.props.getCustomer();
        document.title = 'Create Invoice';
    }

    validationInput = () => {
        this.state.customerId === '' ? this.setState({validCustomer : false}) : this.setState({validCustomer : true});
    };
    
    handleChangeInput = (ev) => {
        const {value, name} = ev.target;

        if(value === '' || Number(value) < 100) {
            this.setState({
                [name]: value
            });
        }
    };

    handleChangeCustomer = (val) => {
        if(val === null) {
            this.setState({
                customerId: ''
            })
        } else {
            this.setState({
                customerId: val.value
            })
        }
    };

    handleChangeProduct = (val) => {
        if(val === null) {
            this.setState({
                productId: '',
                productPrice: '',
                productName: ''
            })
        } else {
            let product =  this.props.products.filter(product => {
                return product.id === val.value
            });

            if(product.length < 1) return;
            this.setState({
                productId: val.value,
                productPrice: product[0].price,
                productName: val.label
            })
        }
    };

    addProduct = () => {
        if(this.state.productId === '') return;

       const newProduct = {
           id: this.state.productId,
           name: this.state.productName,
           price: this.state.productPrice,
           qty: 1
       };
        
        if(this.state.products.some(product => product.id === newProduct.id ? true : false)){
            const newArr = this.state.products.map(product => product.id === newProduct.id ? {...product, qty: Number(product.qty) + 1} : product);
            this.totalPrice(newArr);
            this.setState({
                products: newArr
            });
        } else {
            const concatArr = this.state.products.concat(newProduct);
            this.totalPrice(concatArr);
            this.setState({
                products: concatArr
            });
        }
        this.setState({
            productId: '',
            productPrice: '',
            productName: ''
        });
    };

    totalPrice = (arr) => {
        arr.forEach(product => {
            let total = Number(product.price) * Number(product.qty);
            this.setState({
                total: this.state.total + total
            });
        });
    };
    
    handleChangeQty = (ev) => {
        // const {value, name} = ev.target;
        // const newArr = this.state.products.map(product => product.id == name ? {...product, qty: value} : product);
        // this.totalPrice(newArr);
        // this.setState({
        //     productsQty: {
        //         [name]: value
        //     },
        //     products: newArr
        // })
    };

    createInvoice = () => {
        this.validationInput();
        if(this.state.customerId === '') return;
        const invoice = {
            customer_id: this.state.customerId,
            discount: this.state.discount,
            total: Math.round((this.state.total - (this.state.total / 100 * Number(this.state.discount))) * 100) / 100
        };
        createItemApi('/api/invoices', this.resetInvoice, invoice)
    };
    
    
    resetInvoice = () => {
        this.setState({
            discount: 0,
            customerId: '',
            productId: '',
            productPrice: '',
            productName: '',
            products: [],
            validCustomer: true,
            validProduct: true,
            total: 0,
            modal: true
        })
    };

    hideModals = () => {
        this.setState({
            modal: false,
        })
    };

    
    renderTable = () => {
        return(
            <div>
                <Table responsive>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Qty</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderBody()}
                    </tbody>
                </Table>
                <h3>Total: {Math.round((this.state.total - (this.state.total / 100 * Number(this.state.discount))) * 100) / 100}</h3>
                
                <Button onClick={this.createInvoice}>Create</Button>
            </div>
        )
    };
    
    renderBody = () => {
      return this.state.products.map(product => (
          <tr key={product.id}>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>
                  <FormGroup  style={{width: 150}}>
                  <FormControl
                      name={product.id}
                      type="text"
                      value={product.qty}
                      placeholder="Enter qty"
                      onChange={this.handleChangeQty}
                  />
              </FormGroup>
              </td>
          </tr>
      ))
    };

    render() {
        const {customers, products} = this.props;
        const optionsCustomer = customers.map(customer => ({
            label: customer.name,
            value: customer.id
        }));
        const optionsProduct = products.map(product => ({
            label: product.name,
            value: product.id
        }));

        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <h1>Create Invoice</h1>
                        <Col md={4}>
                            <form>
                            <FormGroup>
                                <ControlLabel>Discount(%)</ControlLabel>
                                <FormControl
                                    name="discount"
                                    type="text"
                                    value={this.state.discount}
                                    placeholder="Enter discount"
                                    onChange={this.handleChangeInput}
                                />
                            </FormGroup>
                            <FormGroup className={!this.state.validCustomer ? 'has-error': ''}>
                                <ControlLabel>Customer</ControlLabel>
                                <Select
                                    options={optionsCustomer}
                                    value={this.state.customerId}
                                    onChange={this.handleChangeCustomer}
                                />
                            </FormGroup>
                             <FormGroup  className={!this.state.validProduct ? 'has-error': ''} style={{display: 'inline-block', marginRight: 20, width: '79%'}}>
                                 <ControlLabel>Add Product</ControlLabel>
                                 <Select
                                     options={optionsProduct}
                                     value={this.state.productId}
                                     onChange={this.handleChangeProduct}
                                 />
                             </FormGroup>
                             <Button onClick={this.addProduct} style={{position: 'relative', top: 32}}>Add</Button>
                        </form>
                        </Col>
                        {this.state.products.length > 0 ? this.renderTable() : ''}
                     </Col>
                </Row>
                
                <div className="static-modal">
                    <Modal show={this.state.modal}>
                        <Modal.Header>
                            <Modal.Title>Invoice</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert bsStyle="success" >
                                <p>Invoice created!</p>
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.hideModals}>Ok</Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Grid>    
        );
    }
}


export default connect((state) => {
    return {
        products: state.product,
        customers: state.customer,
        invoices: state.invoice
    }
}, {getProduct, getCustomer})(CreateInvoice);










