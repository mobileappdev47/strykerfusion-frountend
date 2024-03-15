import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/Base_url';
import axios from 'axios';
import { Alert, Button, Form, Modal } from 'react-bootstrap';
import styles from './homead.module.css';
import Loading from '../../admincomponents/loading/Loading';

const HomeAd = () => {

    const [loading, setLoading] = useState(true);
    const [homeData, setHomeData] = useState();
    const [error, setError] = useState();
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null); // Add state for edit item ID
    const [formErrors, setFormErrors] = useState({
        title: '',
        images: ''
    });
    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/home`);
            setHomeData(response.data.home);
            setLoading(false)
        } catch (error) {
            setError(error);
            console.error('Error fetching home data:', error);
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
            title: '',
            images: null
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
        setEditItemId(id); // Set edit item ID
        setShowModal(true);
        setFormData({
            title: homeData?.title,
            images: ''
        })
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/home/delete/${deleteItemId}`);
            setShowDeleteModal(false);
            setShowSuccessModal(true);
            fetchData();
        } catch (error) {
            setShowDeleteModal(false);
            setShowErrorModal(true);
            setError(error);
            console.error('Error deleting item:', error);
            setShowModal(false);
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

            if (!formData.images || formData.images.length === 0) {
                newFormErrors.images = 'Please choose images';
                formValid = false;
            } else {
                newFormErrors.images = '';
            }

            if (formValid) {
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                for (let i = 0; i < formData.images.length && i < 5; i++) {
                    formDataToSend.append('images', formData.images[i]);
                }

                await axios.post(`${process.env.REACT_APP_BASE_URL}/home`, formDataToSend);
                setShowSuccessModal(true);
                handleCloseModal();
                fetchData();
            } else {
                setFormErrors(newFormErrors);
            }
        } catch (error) {
            setShowErrorModal(true);
            setError(error.response.data.message);
            console.error('Error adding item:', error);
            setShowModal(false);
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

            if (!formData.images || formData.images.length === 0) {
                newFormErrors.images = 'Please choose images';
                formValid = false;
            } else {
                newFormErrors.images = '';
            }

            if (formValid) {
                const formDataToSend = new FormData();
                formDataToSend.append('title', formData.title);
                for (let i = 0; i < formData.images.length && i < 5; i++) {
                    formDataToSend.append('images', formData.images[i]);
                }

                await axios.put(`${process.env.REACT_APP_BASE_URL}/home/update/${editItemId}`, formDataToSend); // Use PUT request to update item
                setShowSuccessModal(true);
                handleCloseModal();
                fetchData();
            } else {
                setFormErrors(newFormErrors);
            }
        } catch (error) {
            setShowErrorModal(true);
            setError(error.response.data.message);
            setShowModal(false);
            console.error('Error editing item:', error);
        }
    };

    const [formData, setFormData] = useState({
        title: '',
        images: [],
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            images: Array.from(e.target.files)
        });
    };

    return (
        <>
            {loading ? (
                <div className='text-center' style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loading /></div>
            ) : (
                <div className='container-fluid'>
                    <div className='mt-4 mb-4'>
                        <h1 className=''>Home Wrap</h1>
                        <div className='border-3 border-bottom'></div>
                    </div>
                    <div className='d-flex justify-content-start'>
                        <h5 className=''>Title:-</h5>
                        <p className='ms-5'>{homeData?.title}</p>
                    </div>
                    <div className='d-flex gap-3 mt-4'>
                        {homeData?.images?.map((item, index) => (
                            <div key={index}>
                                <img src={`${process.env.REACT_APP_BASE_URL}/${item}`} className='img-fluid w-50' alt={`home ${index}`} />
                            </div>
                        ))}
                    </div>
                    <div className='mt-4 d-flex gap-3'>
                        <button className={styles.buttonedit} onClick={() => handleEdit(homeData?._id)}>Edit</button>
                        <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(homeData?._id)}>Delete</button>
                        <button className={styles.buttonadd} onClick={handleShowModal}>Add</button>
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
                                <Form.Group controlId="formImage">
                                    <Form.Label>Images (Max 5)</Form.Label>
                                    <Form.Control type="file" accept="image/*" multiple onChange={handleFileChange} />
                                    {formErrors.images && <Alert className='p-0' variant="danger">{formErrors.images}</Alert>}
                                </Form.Group>
                            </Form>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Close
                            </Button>
                            {editItemId ? ( // Render different button text based on editItemId
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
                        <Modal.Body>Item has been successfully {editItemId ? 'edited' : 'added'}.</Modal.Body>
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

export default HomeAd;
