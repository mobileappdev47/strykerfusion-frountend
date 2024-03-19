import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import styles from './possiblead.module.css';

const PossibleAd = () => {
    const [possibleData, setPossibleData] = useState();
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [formErrors, setFormErrors] = useState({
        possibleTitle: '',
        possibleDescription: ''
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/possible`);
            setPossibleData(response.data.data);
        } catch (error) {
            setError(error);
            console.error('Error fetching possible data:', error);
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
            possibleTitle: '',
            possibleDescription: ''
        });
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    };

    const handleEdit = (id) => {
        setEditItemId(id);
        setShowModal(true);
        setFormData({
            possibleTitle: possibleData?.possibleTitle,
            possibleDescription: possibleData?.possibleDescription
        })
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/possible/delete/${deleteItemId}`);
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

            if (!formData.possibleTitle) {
                newFormErrors.possibleTitle = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.possibleTitle = '';
            }

            if (!formData.possibleDescription) {
                newFormErrors.possibleDescription = 'Please enter the description';
                formValid = false;
            } else {
                newFormErrors.possibleDescription = '';
            }

            if (formValid) {
                const formDataToSend = {
                    possibleTitle: formData.possibleTitle,
                    possibleDescription: formData.possibleDescription
                };

                await axios.post(`${process.env.REACT_APP_BASE_URL}/possible`, formDataToSend);
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

            if (!formData.possibleTitle) {
                newFormErrors.possibleTitle = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.possibleTitle = '';
            }

            if (!formData.possibleDescription) {
                newFormErrors.possibleDescription = 'Please enter the description';
                formValid = false;
            } else {
                newFormErrors.possibleDescription = '';
            }

            if (formValid) {
                const formDataToSend = {
                    possibleTitle: formData.possibleTitle,
                    possibleDescription: formData.possibleDescription
                };

                await axios.put(`${process.env.REACT_APP_BASE_URL}/possible/update/${editItemId}`, formDataToSend);
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
        possibleTitle: '',
        possibleDescription: '',
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
                    <h1 className=''>Possible Wrap</h1>
                    <div className='border-3 border-bottom'></div>
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Title:-</h5>
                    <p className='ms-5'>{possibleData?.possibleTitle}</p>
                </div>
                <div className='d-flex justify-content-start'>
                    <h5 className=''>Description:-</h5>
                    <p className='ms-5'>{possibleData?.possibleDescription}</p>
                </div>
                <div className='d-flex gap-3 mt-4'>
                    {possibleData?.images?.map((item, index) => (
                        <div key={index}>
                            <img src={`${process.env.REACT_APP_BASE_URL}/${item}`} className='img-fluid w-50' alt={`product ${index}`} />
                        </div>
                    ))}
                </div>
                <div className='mt-4 d-flex gap-3'>
                    <button className={styles.buttonedit} onClick={() => handleEdit(possibleData?._id)}>Edit</button>
                    <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(possibleData?._id)}>Delete</button>
                    <button className={styles.buttonadd} onClick={handleShowModal}>Add</button>
                </div>
                <Modal show={showModal} onHide={handleCloseModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>{editItemId ? 'Edit Possible' : 'Add Possible'}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control type="text" placeholder="Enter title" name="possibleTitle" value={formData.possibleTitle} onChange={handleInputChange} />
                                {formErrors.possibleTitle && <Alert className='p-0' variant="danger">{formErrors.possibleTitle}</Alert>}
                            </Form.Group>
                            <Form.Group controlId="formDescription">
                                <Form.Label>Description</Form.Label>
                                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="possibleDescription" value={formData.possibleDescription} onChange={handleInputChange} />
                                {formErrors.possibleDescription && <Alert className='p-0' variant="danger">{formErrors.possibleDescription}</Alert>}
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
                    <Modal.Body>Are you sure you want to delete this possible?</Modal.Body>
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
                    <Modal.Body>Possible has been successfully {editItemId ? 'edited' : 'added'}.</Modal.Body>
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

export default PossibleAd;
