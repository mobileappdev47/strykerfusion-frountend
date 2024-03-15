import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/Base_url';
import axios from 'axios';
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap';
import styles from './adclientcard.module.css';
import Loading from '../loading/Loading';

const AdClientCard = () => {

    const [loading, setLoading] = useState(true);
    const [clientcardData, setClientCardData] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        clientName: '',
        clientRole: '',
        clientReview: '',
        image: null,
    });
    const [formErrors, setFormErrors] = useState({
        clientName: '',
        clientRole: '',
        clientReview: '',
        image: '',
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/client`);
            setClientCardData(response.data.data);
            setLoading(false)
        } catch (error) {
            setError(error);
            console.error('Error fetching product data:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleCloseModal = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setShowSuccessModal(false);
        setShowErrorModal(false);
        setEditItemId(null);
        setFormData({
            clientName: '',
            clientRole: '',
            clientReview: '',
            image: null,

        });
        setFormErrors({
            clientName: '',
            clientRole: '',
            clientReview: '',
            image: null,
        });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    };

    const handleEdit = (client) => {
        setEditItemId(client._id);
        setShowModal(true);
        setFormData({
            clientName: client?.clientName,
            clientRole: client?.clientRole,
            clientReview: client?.clientReview,
            image: ''

        })
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/client/delete/${deleteItemId}`);
            setShowDeleteModal(false);
            setShowSuccessModal(true);
            fetchData();
        } catch (error) {
            setShowDeleteModal(false);
            setShowErrorModal(true);
            setError(error);
            console.error('Error deleting item:', error);
        }
    };

    const handleAdd = async () => {
        try {
            let formValid = true;
            const newFormErrors = { ...formErrors };

            if (!formData.clientName) {
                newFormErrors.clientName = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.clientName = '';
            }

            if (!formData.clientRole) {
                newFormErrors.clientRole = 'Please enter the client role';
                formValid = false;
            } else {
                newFormErrors.clientRole = '';
            }

            if (!formData.clientReview) {
                newFormErrors.clientReview = 'Please enter the client review';
                formValid = false;
            } else {
                newFormErrors.clientReview = '';
            }

            if (!formData.image || formData.image.length === 0) {
                newFormErrors.image = 'Please choose images';
                formValid = false;
            } else {
                newFormErrors.image = '';
            }

            if (formValid) {
                const formDataToSend = new FormData();
                formDataToSend.append('clientName', formData.clientName);
                formDataToSend.append('clientRole', formData.clientRole);
                formDataToSend.append('clientReview', formData.clientReview);
                formDataToSend.append('image', formData.image);

                await axios.post(`${process.env.REACT_APP_BASE_URL}/client`, formDataToSend);
                setShowSuccessModal(true);
                handleCloseModal();
                fetchData();
            } else {
                setFormErrors(newFormErrors);
            }
        } catch (error) {
            setShowErrorModal(true);
            setShowModal(false)
            setError(error.response.data.message);
            console.error('Error adding item:', error);
        }
    };


    const handleEditSubmit = async () => {
        try {
            let formValid = true;
            const newFormErrors = { ...formErrors };

            if (!formData.clientName) {
                newFormErrors.clientName = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.clientName = '';
            }

            if (!formData.clientRole) {
                newFormErrors.clientRole = 'Please enter the client role';
                formValid = false;
            } else {
                newFormErrors.clientRole = '';
            }

            if (!formData.clientReview) {
                newFormErrors.clientReview = 'Please enter the client review';
                formValid = false;
            } else {
                newFormErrors.clientReview = '';
            }

            if (!formData.image || formData.image.length === 0) {
                newFormErrors.image = 'Please choose images';
                formValid = false;
            } else {
                newFormErrors.image = '';
            }

            if (formValid) {
                const formDataToSend = new FormData();
                formDataToSend.append('clientName', formData.clientName);
                formDataToSend.append('clientRole', formData.clientRole);
                formDataToSend.append('clientReview', formData.clientReview);
                formDataToSend.append('image', formData.image);

                await axios.put(`${process.env.REACT_APP_BASE_URL}/client/update/${editItemId}`, formDataToSend);
                setShowSuccessModal(true);
                handleCloseModal();
                fetchData();
            } else {
                setFormErrors(newFormErrors);
            }
        } catch (error) {
            setShowErrorModal(true);
            setShowModal(false)
            setError(error.response.data.message);
            console.error('Error editing item:', error);
        }
    };




    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            image: e.target.files[0],
        });
    };

    return (
        <>
            {loading ? (
                <div className='text-center' style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loading /></div>
            ) : (
                <div className='container-fluid'>
                    <div className='mt-4 mb-4'>
                        <h5 className=''>Client Card</h5>
                        <div className='border-3 border-bottom'></div>
                    </div>
                    <button className={`${styles.buttonadd} mb-5`} onClick={handleShowModal}>Add</button>
                    <div className='d-flex flex-wrap gap-3 mb-3'>
                        {
                            clientcardData && clientcardData.map((item, index) => (
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" style={{ width: '10rem' }} src={`${process.env.REACT_APP_BASE_URL}/${item?.clientImage}`} />
                                    <Card.Body>
                                        <Card.Title>{item?.clientName}</Card.Title>
                                        <Card.Text>{item?.clientRole}</Card.Text>
                                        <Card.Text>{item?.clientReview}</Card.Text>
                                        <div className='mt-4 d-flex gap-3'>
                                            <button className={styles.buttonedit} onClick={() => handleEdit(item)}>Edit</button>
                                            <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(item?._id)}>Delete</button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            ))
                        }
                    </div>
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>{editItemId ? 'Edit Item' : 'Add Item'}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form>
                                <Form.Group controlId="formName">
                                    <Form.Label>Client Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter client name" name="clientName" value={formData.clientName} onChange={handleInputChange} />
                                    {formErrors.clientName && <Alert className='p-0' variant="danger">{formErrors.clientName}</Alert>}
                                </Form.Group>
                                <Form.Group controlId="formRole">
                                    <Form.Label>Client Role</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter client role" name="clientRole" value={formData.clientRole} onChange={handleInputChange} />
                                    {formErrors.clientRole && <Alert className='p-0' variant="danger">{formErrors.clientRole}</Alert>}
                                </Form.Group>
                                <Form.Group controlId="formReview">
                                    <Form.Label>Client Role</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter client review" name="clientReview" value={formData.clientReview} onChange={handleInputChange} />
                                    {formErrors.clientReview && <Alert className='p-0' variant="danger">{formErrors.clientReview}</Alert>}
                                </Form.Group>
                                <Form.Group controlId="formImage">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control type="file" accept="image/*" onChange={handleFileChange} />
                                    {formErrors.image && <Alert className='p-0' variant="danger">{formErrors.image}</Alert>}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {editItemId ? (
                                <Button variant="primary" onClick={handleEditSubmit}>
                                    Edit
                                </Button>
                            ) : (
                                <Button variant="primary" onClick={handleAdd}>
                                    Add
                                </Button>
                            )}
                        </Modal.Footer>
                    </Modal>

                    {/* Delete Confirmation Modal */}
                    <Modal show={showDeleteModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Delete</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you want to delete this item?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleDelete}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Success Modal */}
                    <Modal show={showSuccessModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Success</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Item has been successfully {editItemId ? 'edited' : 'deleted'}.</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    {/* Error Modal */}
                    <Modal show={showErrorModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Error</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>{error}</Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={handleCloseModal}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>

            )}
        </>
    )
}

export default AdClientCard;
