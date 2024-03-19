import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import styles from './clientad.module.css';
import AdClientCard from '../../admincomponents/adclientcard/AdClientCard';

const ClientAd = () => {
  const [clientData, setClientData] = useState();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    clientTitle: '',
    clientDescription: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/clientmain`);
      setClientData(response.data.data);
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
      clientTitle: '',
      clientDescription: ''
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
      clientTitle: clientData?.clientTitle,
      clientDescription: clientData?.clientDescription
    })
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${process.env.REACT_APP_BASE_URL}/clientmain/delete/${deleteItemId}`);
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

      if (!formData.clientTitle) {
        newFormErrors.clientTitle = 'Please enter the title';
        formValid = false;
      } else {
        newFormErrors.clientTitle = '';
      }

      if (!formData.clientDescription) {
        newFormErrors.clientDescription = 'Please enter the description';
        formValid = false;
      } else {
        newFormErrors.clientDescription = '';
      }

      if (formValid) {
        const formDataToSend = {
          clientTitle: formData.clientTitle,
          clientDescription: formData.clientDescription
        };

        await axios.post(`${process.env.REACT_APP_BASE_URL}/clientmain`, formDataToSend);
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

      if (!formData.clientTitle) {
        newFormErrors.clientTitle = 'Please enter the title';
        formValid = false;
      } else {
        newFormErrors.clientTitle = '';
      }

      if (!formData.clientDescription) {
        newFormErrors.clientDescription = 'Please enter the description';
        formValid = false;
      } else {
        newFormErrors.clientDescription = '';
      }

      if (formValid) {
        const formDataToSend = {
          clientTitle: formData.clientTitle,
          clientDescription: formData.clientDescription
        };

        await axios.put(`${process.env.REACT_APP_BASE_URL}/clientmain/update/${editItemId}`, formDataToSend);
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
    clientTitle: '',
    clientDescription: '',
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
          <h1 className=''>Client Wrap</h1>
          <div className='border-3 border-bottom'></div>
        </div>
        <div className='d-flex justify-content-start'>
          <h5 className=''>Title:-</h5>
          {clientData?.clientTitle ? (
            <p className='ms-5'>{clientData.clientTitle}</p>
          ) : (
            <p className='ms-5'>No Title available</p>
          )}
        </div>
        <div className='d-flex justify-content-start'>
          <h5 className=''>Description:-</h5>
          {clientData?.clientDescription ? (
            <p className='ms-5'>{clientData.clientDescription}</p>
          ) : (
            <p className='ms-5'>No Description available</p>
          )}
        </div>
        <div className='mt-4 d-flex gap-3'>
          <button className={styles.buttonedit} onClick={() => handleEdit(clientData?._id)}>Edit</button>
          <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(clientData?._id)}>Delete</button>
          <button className={styles.buttonadd} onClick={handleShowModal}>Add</button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editItemId ? 'Edit Client' : 'Add Client'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="clientTitle" value={formData.clientTitle} onChange={handleInputChange} />
                {formErrors.clientTitle && <Alert className='p-0' variant="danger">{formErrors.clientTitle}</Alert>}
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="clientDescription" value={formData.clientDescription} onChange={handleInputChange} />
                {formErrors.clientDescription && <Alert className='p-0' variant="danger">{formErrors.clientDescription}</Alert>}
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
        <AdClientCard />
      </div>
    </>
  );
};

export default ClientAd;
