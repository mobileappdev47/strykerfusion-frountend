import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap';
import styles from './adprocesscard.module.css';
import Loading from '../loading/Loading';

const AdProcessCard = () => {

    const [loading, setLoading] = useState(true);
    const [processcardData, setProcessCardData] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        image: null,
    });
    const [formErrors, setFormErrors] = useState({
        title: '',
        description: '',
        image: ''
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/process`);
            setProcessCardData(response.data.data);
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
            title: '',
            description: '',
            image: null,

        });
        setFormErrors({
            title: '',
            description: '',
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

    const handleEdit = (process) => {
        setEditItemId(process._id);
        setShowModal(true);
        setFormData({
            title: process?.title,
            description: process?.description,
            image: ''

        })
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/process/delete/${deleteItemId}`);
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

            if (!formData.title) {
                newFormErrors.title = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.title = '';
            }

            if (!formData.image || formData.image.length === 0) {
                newFormErrors.image = 'Please choose images';
                formValid = false;
            } else {
                newFormErrors.image = '';
            }

            if (!formData.description) {
                newFormErrors.description = 'Please enter the description';
                formValid = false;
            } else {
                newFormErrors.description = '';
            }

            if (formValid) {
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('image', formData.image);

                await axios.post(`${process.env.REACT_APP_BASE_URL}/process`, formDataToSend);
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

            if (!formData.title) {
                newFormErrors.title = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.title = '';
            }

            if (!formData.image || formData.image.length === 0) {
                newFormErrors.image = 'Please choose images';
                formValid = false;
            } else {
                newFormErrors.image = '';
            }
            if (!formData.description) {
                newFormErrors.description = 'Please enter the description';
                formValid = false;
            } else {
                newFormErrors.description = '';
            }

            if (formValid) {
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                formDataToSend.append('description', formData.description);
                formDataToSend.append('image', formData.image);

                await axios.put(`${process.env.REACT_APP_BASE_URL}/process/update/${editItemId}`, formDataToSend);
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
                        <h5 className=''>Process Card</h5>
                        <div className='border-3 border-bottom'></div>
                    </div>
                    <button className={`${styles.buttonadd} mb-5`} onClick={handleShowModal}>Add</button>
                    <div className='d-flex flex-wrap gap-3 mb-3'>
                        {
                            processcardData && processcardData.map((item, index) => (
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Img variant="top" src={`${process.env.REACT_APP_BASE_URL}/${item?.image}`} />
                                    <Card.Body>
                                        <Card.Title>{item?.title}</Card.Title>
                                        <Card.Text>{item?.description}</Card.Text>
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
                                <Form.Group controlId="formTitle">
                                    <Form.Label>Title</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title" name="title" value={formData.title} onChange={handleInputChange} />
                                    {formErrors.title && <Alert className='p-0' variant="danger">{formErrors.title}</Alert>}
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control as="textarea" rows={3} placeholder="Enter description" name="description" value={formData.description} onChange={handleInputChange} />
                                    {formErrors.description && <Alert className='p-0' variant="danger">{formErrors.description}</Alert>}
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

export default AdProcessCard;
