import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/Base_url';
import axios from 'axios';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import styles from './locationad.module.css';
import AdLocationCard from '../../admincomponents/adlocationcard/AdLocationCard';

const LocationAd = () => {
  const [locationData, setLocationData] = useState();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    locationTitle: '',
    locationDescription: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/locationmain`);
      setLocationData(response.data.data);
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
      locationTitle: '',
      locationDescription: ''
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
      locationTitle: locationData?.locationTitle,
      locationDescription: locationData?.locationDescription
    })
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${base_url}/locationmain/delete/${deleteItemId}`);
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

      if (!formData.locationTitle) {
        newFormErrors.locationTitle = 'Please enter the title';
        formValid = false;
      } else {
        newFormErrors.locationTitle = '';
      }

      if (!formData.locationDescription) {
        newFormErrors.locationDescription = 'Please enter the description';
        formValid = false;
      } else {
        newFormErrors.locationDescription = '';
      }

      if (formValid) {
        const formDataToSend = {
          locationTitle: formData.locationTitle,
          locationDescription: formData.locationDescription
        };

        await axios.post(`${base_url}/locationmain`, formDataToSend);
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

      if (!formData.locationTitle) {
        newFormErrors.locationTitle = 'Please enter the title';
        formValid = false;
      } else {
        newFormErrors.locationTitle = '';
      }

      if (!formData.locationDescription) {
        newFormErrors.locationDescription = 'Please enter the description';
        formValid = false;
      } else {
        newFormErrors.locationDescription = '';
      }

      if (formValid) {
        const formDataToSend = {
          locationTitle: formData.locationTitle,
          locationDescription: formData.locationDescription
        };

        await axios.put(`${base_url}/locationmain/update/${editItemId}`, formDataToSend);
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
    locationTitle: '',
    locationDescription: '',
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
          <h1 className=''>Location Wrap</h1>
          <div className='border-3 border-bottom'></div>
        </div>
        <div className='d-flex justify-content-start'>
          <h5 className=''>Title:-</h5>
          <p className='ms-5'>{locationData?.locationTitle}</p>
        </div>
        <div className='d-flex justify-content-start'>
          <h5 className=''>Description:-</h5>
          <p className='ms-5'>{locationData?.locationDescription}</p>
        </div>
        <div className='mt-4 d-flex gap-3'>
          <button className={styles.buttonedit} onClick={() => handleEdit(locationData?._id)}>Edit</button>
          <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(locationData?._id)}>Delete</button>
          <button className={styles.buttonadd} onClick={handleShowModal}>Add</button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editItemId ? 'Edit Location' : 'Add Location'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="locationTitle" value={formData.locationTitle} onChange={handleInputChange} />
                {formErrors.locationTitle && <Alert className='p-0' variant="danger">{formErrors.locationTitle}</Alert>}
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="locationDescription" value={formData.locationDescription} onChange={handleInputChange} />
                {formErrors.locationDescription && <Alert className='p-0' variant="danger">{formErrors.locationDescription}</Alert>}
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
          <Modal.Body>Are you sure you want to delete this product?</Modal.Body>
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
          <Modal.Body>Product has been successfully {editItemId ? 'edited' : 'added'}.</Modal.Body>
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
      <div>
        <AdLocationCard />
      </div>
    </>
  );
};

export default LocationAd;
