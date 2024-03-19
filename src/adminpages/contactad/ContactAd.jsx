import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import styles from './contactad.module.css';

const ContactAd = () => {

    const [contactData, setContactData] = useState();
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [editItemId, setEditItemId] = useState(null);
    const [formErrors, setFormErrors] = useState({
        mainTitle: '',
        mainDescription: '',
        email: '',
        phone: '',
        address: ''
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/contact`);
            setContactData(response.data.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching location data:', error);
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
        setFormErrors({
            mainTitle: '',
            mainDescription: '',
            email: '',
            phone: '',
            address: ''
        });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleDeleteConfirmation = (id) => {
        setShowDeleteModal(true);
    };

    const handleEdit = (id) => {
        setEditItemId(id);
        setShowModal(true);
        setFormData({
            mainTitle: contactData?.mainTitle,
            mainDescription: contactData?.mainDescription,
            email: contactData?.email,
            phone: contactData?.phone,
            address: contactData?.address,


        })
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/contact/delete`);
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

            if (!formData.mainTitle) {
                newFormErrors.mainTitle = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.mainTitle = '';
            }

            if (!formData.mainDescription) {
                newFormErrors.mainDescription = 'Please enter the description';
                formValid = false;
            } else {
                newFormErrors.mainDescription = '';
            }

            if (!formData.email) {
                newFormErrors.email = 'Please enter the email';
                formValid = false;
            } else {
                newFormErrors.email = '';
            }
            if (!formData.phone) {
                newFormErrors.phone = 'Please enter the phone';
                formValid = false;
            } else {
                newFormErrors.phone = '';
            }
            if (!formData.address) {
                newFormErrors.address = 'Please enter the address';
                formValid = false;
            } else {
                newFormErrors.address = '';
            }

            if (formValid) {
                const formDataToSend = {
                    mainTitle: formData.mainTitle,
                    mainDescription: formData.mainDescription,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address
                };

                await axios.post(`${process.env.REACT_APP_BASE_URL}/contact`, formDataToSend);
                setShowSuccessModal(true);
                handleCloseModal();
                fetchData();
            } else {
                setFormErrors(newFormErrors);
            }
        } catch (error) {
            setShowErrorModal(true);
            setError(error.response.data.message); // Set error message from API response
            console.error('Error adding item:', error);
            setShowModal(false);
            setShowDeleteModal(false);
            setShowSuccessModal(false);
        }
    };

    const handleEditSubmit = async () => {
        try {
            let formValid = true;
            const newFormErrors = { ...formErrors };

            if (!formData.mainTitle) {
                newFormErrors.mainTitle = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.mainTitle = '';
            }

            if (!formData.mainDescription) {
                newFormErrors.mainDescription = 'Please enter the description';
                formValid = false;
            } else {
                newFormErrors.mainDescription = '';
            }

            if (!formData.email) {
                newFormErrors.email = 'Please enter the email';
                formValid = false;
            } else {
                newFormErrors.email = '';
            }
            if (!formData.phone) {
                newFormErrors.phone = 'Please enter the phone';
                formValid = false;
            } else {
                newFormErrors.phone = '';
            }
            if (!formData.address) {
                newFormErrors.address = 'Please enter the address';
                formValid = false;
            } else {
                newFormErrors.address = '';
            }

            if (formValid) {
                const formDataToSend = {
                    mainTitle: formData.mainTitle,
                    mainDescription: formData.mainDescription,
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address
                };

                await axios.put(`${process.env.REACT_APP_BASE_URL}/contact/update`, formDataToSend);
                setShowSuccessModal(true);
                handleCloseModal();
                fetchData();
            } else {
                setFormErrors(newFormErrors);
            }
        } catch (error) {
            setShowErrorModal(true);
            setError(error.response.data.message); // Set error message from API response
            console.error('Error editing item:', error);
            setShowModal(false);
            setShowDeleteModal(false);
            setShowSuccessModal(false);
        }
    };

    const [formData, setFormData] = useState({
        mainTitle: '',
        mainDescription: '',
        email: '',
        phone: '',
        address: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <>
            <div className='container-fluid'>
                <div className='mt-4 mb-4'>
                    <h1 className=''>Contact Wrap</h1>
                    <div className='border-3 border-bottom'></div>
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Title:-</h5>
                    {contactData?.mainTitle ? (
                        <p className='ms-5'>{contactData?.mainTitle}</p>
                    ) : (
                        <p className='ms-5'>No Title available</p>
                    )}
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Description:-</h5>
                    {contactData?.mainDescription ? (
                        <p className='ms-5'>{contactData?.mainDescription}</p>
                    ) : (
                        <p className='ms-5'>No Description available</p>
                    )}
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Email:-</h5>
                    {contactData?.email ? (
                        <p className='ms-5'>{contactData?.email}</p>
                    ) : (
                        <p className='ms-5'>No Email available</p>
                    )}
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Phone:-</h5>
                    {contactData?.phone ? (
                        <p className='ms-5'>{contactData?.phone}</p>
                    ) : (
                        <p className='ms-5'>No Phone available</p>
                    )}
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Address:-</h5>
                    {contactData?.address ? (
                        <p className='ms-5'>{contactData?.address}</p>
                    ) : (
                        <p className='ms-5'>No Address available</p>
                    )}
                </div>
                <div className='mt-4 d-flex gap-3'>
                    <button className={styles.buttonedit} onClick={() => handleEdit(contactData?._id)}>Edit</button>
                    <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(contactData?._id)}>Delete</button>
                    <button className={styles.buttonadd} onClick={handleShowModal}>Add</button>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editItemId ? 'Edit Contact' : 'Add Contact'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" name="mainTitle" value={formData.mainTitle} onChange={handleInputChange} />
                                {formErrors.mainTitle && <Alert className='p-0' variant="danger">{formErrors.mainTitle}</Alert>}
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="mainDescription" value={formData.mainDescription} onChange={handleInputChange} />
                                {formErrors.mainDescription && <Alert className='p-0' variant="danger">{formErrors.mainDescription}</Alert>}
                            </Form.Group>
                            <Form.Group controlId="formEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" name="email" value={formData.email} onChange={handleInputChange} />
                                {formErrors.email && <Alert className='p-0' variant="danger">{formErrors.email}</Alert>}
                            </Form.Group>
                            <Form.Group controlId="formPhone">
                                <Form.Label>Mobile No</Form.Label>
                                <Form.Control type="text" placeholder="Enter phone" name="phone" value={formData.phone} onChange={handleInputChange} />
                                {formErrors.phone && <Alert className='p-0' variant="danger">{formErrors.phone}</Alert>}
                            </Form.Group>
                            <Form.Group controlId="formAddress">
                                <Form.Label>Address</Form.Label>
                                <Form.Control type="text" placeholder="Enter address" name="address" value={formData.address} onChange={handleInputChange} />
                                {formErrors.address && <Alert className='p-0' variant="danger">{formErrors.address}</Alert>}
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

                <Modal show={showDeleteModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Confirm Delete</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Are you sure you want to delete this contact?</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseModal}>
                            Cancel
                        </Button>
                        <Button variant="primary" onClick={handleDelete}>
                            Delete
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showSuccessModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Success</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Contact has been successfully {editItemId ? 'edited' : 'added'}.</Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showErrorModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Error</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>{error}</Modal.Body> {/* Display the error message */}
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleCloseModal}>
                            Close
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </>
    );
};

export default ContactAd;
