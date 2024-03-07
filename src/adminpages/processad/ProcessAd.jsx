import React, { useEffect, useState } from 'react';
import { base_url } from '../../config/Base_url';
import axios from 'axios';
import { Button, Form, Modal, Alert } from 'react-bootstrap';
import styles from './processad.module.css';
import AdProcessCard from '../../admincomponents/adprocesscard/AdProcessCard';

const ProcessAd = () => {
  const [processData, setProcessData] = useState();
  const [error, setError] = useState();
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [deleteItemId, setDeleteItemId] = useState(null);
  const [editItemId, setEditItemId] = useState(null);
  const [formErrors, setFormErrors] = useState({
    processTitle: '',
    processDescription: ''
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(`${base_url}/processmain`);
      setProcessData(response.data.data);
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
    setFormErrors({
      processTitle: '',
      processDescription: ''
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
      processTitle: processData?.processTitle,
      processDescription: processData?.processDescription
    })
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${base_url}/processmain/delete/${deleteItemId}`);
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

      if (!formData.processTitle) {
        newFormErrors.processTitle = 'Please enter the title';
        formValid = false;
      } else {
        newFormErrors.processTitle = '';
      }

      if (!formData.processDescription) {
        newFormErrors.processDescription = 'Please enter the description';
        formValid = false;
      } else {
        newFormErrors.processDescription = '';
      }

      if (formValid) {
        const formDataToSend = {
          processTitle: formData.processTitle,
          processDescription: formData.processDescription
        };

        await axios.post(`${base_url}/processmain`, formDataToSend);
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

      if (!formData.processTitle) {
        newFormErrors.processTitle = 'Please enter the title';
        formValid = false;
      } else {
        newFormErrors.processTitle = '';
      }

      if (!formData.processDescription) {
        newFormErrors.processDescription = 'Please enter the description';
        formValid = false;
      } else {
        newFormErrors.processDescription = '';
      }

      if (formValid) {
        const formDataToSend = {
          processTitle: formData.processTitle,
          processDescription: formData.processDescription
        };

        await axios.put(`${base_url}/processmain/update/${editItemId}`, formDataToSend);
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
    processTitle: '',
    processDescription: '',
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
          <h1 className=''>Process Wrap</h1>
          <div className='border-3 border-bottom'></div>
        </div>
        <div className='d-flex justify-content-start'>
          <h5 className=''>Title:-</h5>
          <p className='ms-5'>{processData?.processTitle}</p>
        </div>
        <div className='d-flex justify-content-start'>
          <h5 className=''>Description:-</h5>
          <p className='ms-5'>{processData?.processDescription}</p>
        </div>
        <div className='mt-4 d-flex gap-3'>
          <button className={styles.buttonedit} onClick={() => handleEdit(processData?._id)}>Edit</button>
          <button className={styles.buttondelete} onClick={() => handleDeleteConfirmation(processData?._id)}>Delete</button>
          <button className={styles.buttonadd} onClick={handleShowModal}>Add</button>
        </div>
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>{editItemId ? 'Edit Product' : 'Add Product'}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formTitle">
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" placeholder="Enter title" name="processTitle" value={formData.processTitle} onChange={handleInputChange} />
                {formErrors.processTitle && <Alert className='p-0' variant="danger">{formErrors.processTitle}</Alert>}
              </Form.Group>
              <Form.Group controlId="formDescription">
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={3} placeholder="Enter description" name="processDescription" value={formData.processDescription} onChange={handleInputChange} />
                {formErrors.processDescription && <Alert className='p-0' variant="danger">{formErrors.processDescription}</Alert>}
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
          <Modal.Body>Are you sure you want to delete this process?</Modal.Body>
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
        <AdProcessCard />
      </div>
    </>
  );
};

export default ProcessAd;
