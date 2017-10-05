import React, {Component} from 'react';

import Grid from 'react-bootstrap/lib/Grid';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import Button from 'react-bootstrap/lib/Button';
import Table from 'react-bootstrap/lib/Table';

class Products extends Component {
    
    render() {
        return (
            <Grid>
                <Row className="show-grid">
                    <Col md={12}>
                        <h1 style={{display: 'inline-block', marginRight: 20}}>Product List</h1>
                        <Button>Create</Button>
                        <Table responsive>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th></th>
                            </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Grid>
            
            
        );
    }
}

export default Products;
