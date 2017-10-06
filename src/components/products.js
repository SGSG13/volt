import React, {Component} from 'react'

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
import {getProduct} from '../AC'
import {
    createProductApi, 
    editProductApi, 
    deleteProductApi
} from '../api'


class Products extends Component {
    constructor(props){
        super(props);

        this.state={
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            productId: '',
            productName: '',
            productPrice: '',
            validName: true,
            validPrice: true
        }
    }

    componentDidMount() {
        this.props.getProduct();
        document.title = 'Product List';
    }
    
    renderBody () {
        return(
            this.props.products.map(product => (
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.price}</td>
                    <td>
                        <Button 
                            onClick={this.showEditModal.bind(this, {
                                productId : product.id,
                                productName:product.name,
                                productPrice: product.price
                            })} 
                            className="btn btn-default" style={{marginRight: 20}}
                        >
                            Edit
                        </Button>
                        <Button
                            onClick={this.showDeleteModal.bind(this, {
                                productId : product.id,
                                productName:product.name

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

    handleChangeInput = (ev) => {
        const {value, name} = ev.target;
       
        switch(name){
            case 'productName':
                this.setState({
                    [name]: value
                });
                break;
            case 'productPrice':
                if(value.match(/^[0-9(),. ]+$/) || value === '') {
                    this.setState({
                        [name]: value
                    });
                }
        }
    };

    // getValidationName = () => {
    //     const length = this.state.productName.length;
    //     return length > 0 ? 'success': 'error'
    // };
    //
    // getValidationPrice = () => {
    //     const length = this.state.productName.length;
    //     return length > 0 ? 'success': 'error'
    // };
    
    validationInput = () => {
        this.state.productName === '' ? this.setState({validName : false}) : this.setState({validName : true});
        this.state.productPrice === '' ? this.setState({validPrice : false}) : this.setState({validPrice : true})
    };
    

    showCreateModal = () => {
        this.setState({
            modalCreate: true
        })
    };

    showEditModal = (product) => {
        this.setState({
            ...product,
            modalEdit: true
        })
    };

    showDeleteModal = (product) => {
        this.setState({
            ...product,
            modalDelete: true
        })
    };

    hideModals = () => {
        this.setState({
            modalCreate: false,
            modalEdit: false,
            modalDelete: false,
            productName: '',
            productPrice: '',
            productId: ''
        })
    };
    
    createProduct = () => {
        this.validationInput();
       if(this.state.productName === '' || this.state.productPrice === '') return;
       
        const newProduct = {
            name: this.state.productName,
            price: this.state.productPrice
        };
        createProductApi('/api/products', this.props.getProduct, newProduct);
      this.hideModals();
       
    };

    editProduct = () => {
        this.validationInput();
        if(this.state.productName === '' || this.state.productPrice === '') return;
        
        const {productId} = this.state;
        const editProduct = {
            name: this.state.productName,
            price: this.state.productPrice
        };
        editProductApi(`/api/products/${productId}`, this.props.getProduct, editProduct);
        this.hideModals();

    };
    
    deleteProduct = () => {
        const {productId} = this.state;

        deleteProductApi(`/api/products/${productId}`, this.props.getProduct);
        this.hideModals();
    };
    
    render() {
        return (
            <div>
                <Grid>
                    <Row className="show-grid">
                        <Col md={12}>
                            <h1 style={{display: 'inline-block', marginRight: 20}}>Product List</h1>
                            <Button onClick={this.showCreateModal}>Create</Button>
                            <Table responsive>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Price</th>
                                    <th> </th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.props.products.length > 0 ?this.renderBody() : <tr><td><h3 className="text-center">no products</h3></td></tr>}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </Grid>

                <div className="static-modal">
                    <Modal show={this.state.modalCreate}>
                        <Modal.Header>
                            <Modal.Title>Create new product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup className={!this.state.validName ? 'has-error': ''}>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        name="productName"
                                        type="text"
                                        value={this.state.productName}
                                        placeholder="Enter name"
                                        onChange={this.handleChangeInput}
                                    />
                                    
                                </FormGroup>
                                <FormGroup className={!this.state.validPrice ? 'has-error': ''}>
                                    <ControlLabel>Price</ControlLabel>
                                    <FormControl
                                        name="productPrice"
                                        type="text"
                                        value={this.state.productPrice}
                                        placeholder="Enter price"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.createProduct} bsStyle="primary">Create</Button>
                            <Button onClick={this.hideModals}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="static-modal">
                    <Modal show={this.state.modalEdit}>
                        <Modal.Header>
                            <Modal.Title>Edit product</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                <FormGroup className={!this.state.validName ? 'has-error': ''}>
                                    <ControlLabel>Name</ControlLabel>
                                    <FormControl
                                        name="productName"
                                        type="text"
                                        value={this.state.productName}
                                        placeholder="Enter name"
                                        onChange={this.handleChangeInput}
                                    />

                                </FormGroup>
                                <FormGroup  className={!this.state.validPrice ? 'has-error': ''}>
                                    <ControlLabel>Price</ControlLabel>
                                    <FormControl
                                        name="productPrice"
                                        type="text"
                                        value={this.state.productPrice}
                                        placeholder="Enter price"
                                        onChange={this.handleChangeInput}
                                    />
                                </FormGroup>
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.editProduct} bsStyle="primary">Edit</Button>
                            <Button onClick={this.hideModals}>Cancel</Button>
                        </Modal.Footer>
                    </Modal>
                </div>

                <div className="static-modal">
                    <Modal show={this.state.modalDelete}>
                        <Modal.Header>
                            <Modal.Title>Delete "{this.state.productName}"</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Alert bsStyle="danger" >
                                <p>Are you sure you want to delete this product?</p>
                            </Alert>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={this.deleteProduct} className="btn btn-danger" >Delete</Button>
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
       products: state.product
    }
}, {getProduct})(Products);

