import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/Base_url';
import axios from 'axios';
import { Alert, Button, Card, Form, Modal } from 'react-bootstrap';
import styles from './adlocationcard.module.css';
import Loading from '../loading/Loading';

const AdLocationCard = () => {

    const [loading, setLoading] = useState(true);
    const [locationcardData, setLocationcardData] = useState([]);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [deleteItemId, setDeleteItemId] = useState(null);
    const [editItemId, setEditItemId] = useState(null);
    const [formData, setFormData] = useState({
        locationname: '',
        lat: '',
        long: ''
    });
    const [formErrors, setFormErrors] = useState({
        locationname: '',
        lat: '',
        long: ''
    });

    const fetchData = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/location`);
            setLocationcardData(response.data.data);
            setLoading(false)
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
        setFormData({
            locationname: '',
            lat: '',
            long: ''
        });
        setFormErrors({
            locationname: '',
            lat: '',
            long: ''
        })
    };

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleDeleteConfirmation = (id) => {
        setDeleteItemId(id);
        setShowDeleteModal(true);
    };

    const handleEdit = (location) => {
        setEditItemId(location._id);
        setShowModal(true);
        setFormData({
            locationname: location?.locationname,
            lat: location?.coordinates?.lat,
            long: location?.coordinates?.long

        })
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`${process.env.REACT_APP_BASE_URL}/location/delete/${deleteItemId}`);
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

            if (!formData.locationname) {
                newFormErrors.locationname = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.locationname = '';
            }

            if (!formData.lat) {
                newFormErrors.lat = 'Please enter the latitude';
                formValid = false;
            } else {
                newFormErrors.lat = '';
            }

            if (!formData.long) {
                newFormErrors.long = 'Please enter the longitude';
                formValid = false;
            } else {
                newFormErrors.long = '';
            }

            if (formValid) {
                const formDataToSend = {
                    locationname: formData.locationname,
                    lat: formData.lat,
                    long: formData.long
                };
                await axios.post(`${process.env.REACT_APP_BASE_URL}/location`, formDataToSend);
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
            setShowModal(false)
        }
    };

    const handleEditSubmit = async () => {
        try {
            let formValid = true;
            const newFormErrors = { ...formErrors };

            if (!formData.locationname) {
                newFormErrors.locationname = 'Please enter the title';
                formValid = false;
            } else {
                newFormErrors.locationname = '';
            }

            if (!formData.lat) {
                newFormErrors.lat = 'Please enter the latitude';
                formValid = false;
            } else {
                newFormErrors.lat = '';
            }

            if (!formData.long) {
                newFormErrors.long = 'Please enter the longitude';
                formValid = false;
            } else {
                newFormErrors.long = '';
            }

            if (formValid) {
                const formDataToSend = {
                    locationname: formData.locationname,
                    lat: formData.lat,
                    long: formData.long
                };
                await axios.put(`${process.env.REACT_APP_BASE_URL}/location/update/${editItemId}`, formDataToSend);
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

    return (
        <>
            {loading ? (
                <div className='text-center' style={{ position: 'fixed', top: '10%', left: '50%', transform: 'translate(-50%, -50%)' }}><Loading /></div>
            ) : (
                <div className='container-fluid'>
                    <div className='mt-4 mb-4'>
                        <h5 className=''>Locations Card</h5>
                        <div className='border-3 border-bottom'></div>
                    </div>
                    <button className={`${styles.buttonadd} mb-5`} onClick={handleShowModal}>Add</button>
                    <div className='d-flex flex-wrap gap-3 mb-3'>
                        {
                            locationcardData && locationcardData.map((item, index) => (
                                <Card key={index} style={{ width: '18rem' }}>
                                    <Card.Body>
                                        <div className='d-flex justify-content-start'>
                                            <h5 className=''>Location Name:-</h5>
                                            <p className='ms-5'>{item?.locationname}</p>
                                        </div>
                                        <div className='d-flex justify-content-start'>
                                            <h5 className=''>Latitude:-</h5>
                                            <p className='ms-5'>{item?.coordinates?.lat}</p>
                                        </div>
                                        <div className='d-flex justify-content-start'>
                                            <h5 className=''>Longitude:-</h5>
                                            <p className='ms-5'>{item?.coordinates?.long}</p>
                                        </div>
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
                                <Form.Group controlId="formLocation">
                                    <Form.Label>Location Name</Form.Label>
                                    <Form.Control type="text" placeholder="Enter title" name="locationname" value={formData.locationname} onChange={handleInputChange} />
                                    {formErrors.locationname && <Alert className='p-0' variant="danger">{formErrors.locationname}</Alert>}
                                </Form.Group>
                                <Form.Group controlId="formLat">
                                    <Form.Label>Latitude</Form.Label>
                                    <Form.Control type="text" placeholder="Enter latitude" name="lat" value={formData.lat} onChange={handleInputChange} />
                                    {formErrors.lat && <Alert className='p-0' variant="danger">{formErrors.lat}</Alert>}
                                </Form.Group>
                                <Form.Group controlId="formLong">
                                    <Form.Label>Longitude</Form.Label>
                                    <Form.Control type="text" placeholder="Enter longitude" name="long" value={formData.long} onChange={handleInputChange} />
                                    {formErrors.long && <Alert className='p-0' variant="danger">{formErrors.long}</Alert>}
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

export default AdLocationCard;
