import React, { useEffect, useRef, useState } from 'react'
import style from './contactusform.module.css'
import { Button, Form } from 'react-bootstrap'
import axios from 'axios'
import emailjs from "@emailjs/browser";

const ContactUsForm = () => {
    const formRef = useRef();
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);
    const [rows, setRows] = useState(2); 

    useEffect(() => {
        const handleResize = () => {
            const height = window.innerHeight;
            let newRows;

            // Set rows based on different height conditions
            if (height < 600) {
                newRows = 1;
            } else if (height < 700) {
                newRows = 2;
            } else if (height < 800) {
                newRows = 3;
            } else {
                newRows = 5;
            }
            setRows(newRows);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
        interest: ''
    });
    const [errors, setErrors] = useState({ name: '', email: '', message: '', interest: '' });

    const handleRadioChange = (value) => {
        setField("interest", value);
    };

    const validateForm = () => {
        const { name, email, message, interest } = formData;
        const newErrors = {};

        if (!name || name === "") newErrors.name = "Please enter your name";
        if (!email || email === '') {
            newErrors.email = 'Please enter the email';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!message || message === "") newErrors.message = "Please Enter message";
        if (!interest) {
            newErrors.interest = "Please select an interest";
        }

        return newErrors;
    };

    const setField = (field, value) => {
        setFormData((prevForm) => ({
            ...prevForm,
            [field]: value,
        }));

        if (!!errors[field]) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [field]: null,
            }));
        }
    };

    const handleemailsend = () => {
        const errors = validateForm();
        if (Object.keys(errors).length !== 0) {
            setErrors(errors);
            return;
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/contact/send`, formData)
            .then(response => {
                setSuccess(true);
                setError(false);
                setFormData({
                    name: '',
                    email: '',
                    message: '',
                    interest: ''
                });
            })
            .catch(error => {
                console.error('Error:', error);
                setError(true);
                setSuccess(false)
            });
    };

    const sendEmail = async (e) => {
        e.preventDefault();
        try {
            await emailjs.sendForm(
                process.env.REACT_APP_EMAIL_SERVICE,
                process.env.REACT_APP_EMAIL_TEMPLATE,
                formRef.current,
                process.env.REACT_APP_EMAIL_PUBLIC_KEY
            );
            setSuccess(true);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={style.maindiv}>
            <div className={style.contactform}>
                <Form ref={formRef} onSubmit={sendEmail} className='w-100'>
                    <div>
                        <Form.Group controlId='interest' className={style.inputgroup}>
                            <Form.Label className={`${style.label} ${formData.interest && style.active}`}>I’m interested in:</Form.Label>
                            <div className={style.radiobtngroup}>
                                <input type="radio" className="btn-check" name="interest1" id="btnradio1" autoComplete="off" onChange={() => handleRadioChange('The Products')} />
                                <label className={`btn btn-outline-primary ${style.intrustedbtn}`} htmlFor='btnradio1' >The Products</label>

                                <input type="radio" className="btn-check" name="interest2" id="btnradio2" autoComplete="off" onChange={() => handleRadioChange('Training')} />
                                <label className={`btn btn-outline-primary ${style.intrustedbtn}`} htmlFor='btnradio2'>Training</label>

                                <input type="radio" className="btn-check" name="interest3" id="btnradio3" autoComplete="off" onChange={() => handleRadioChange('Web Development')} />
                                <label className={`btn btn-outline-primary ${style.intrustedbtn}`} htmlFor='btnradio3'>Web Development</label>

                                <input type="radio" className="btn-check" name="interest4" id="btnradio4" autoComplete="off" onChange={() => handleRadioChange('Application Development')} />
                                <label className={`btn btn-outline-primary ${style.intrustedbtn}`} htmlFor='btnradio4'>Application Development</label>

                                <input type="radio" className="btn-check" name="interest5" id="btnradio5" autoComplete="off" onChange={() => handleRadioChange('Other')} />
                                <label className={`btn btn-outline-primary ${style.intrustedbtn}`} htmlFor='btnradio5'>Other</label>
                            </div>
                            <Form.Control.Feedback type="invalid" className='d-inline'>
                                {errors.interest && <div className="text-danger">{errors.interest}</div>}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId='name' className={`${style.inputgroup} ${style.flexinput}  `}>
                            <Form.Label className={`${style.label} ${formData.name && style.active}`}>Your name</Form.Label>
                            <Form.Control
                                name='name'
                                type="text"
                                placeholder='Enter your name'
                                className={formData.name ? style.inputfieldactive : style.inputfield}
                                value={formData.name}
                                onChange={(e) => setField("name", e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className='d-inline'>
                                {errors.name && <div className="text-danger">{errors.name}</div>}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId='email' className={`${style.inputgroup} ${style.flexinput} p-lg-0`}>
                            <Form.Label className={`${style.label} ${formData.email && style.active}`}>Your email</Form.Label>
                            <Form.Control
                                name='email'
                                type="text"
                                placeholder='email@gmail.com'
                                className={formData.email ? style.inputfieldactive : style.inputfield}
                                value={formData.email}
                                onChange={(e) => setField("email", e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className='d-inline'>
                                {errors.email && <div className="text-danger">{errors.email}</div>}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </div>
                    <div>
                        <Form.Group controlId='message' className={style.inputgroup}>
                            <Form.Label className={`${style.label} ${formData.message && style.active}`}>Your message</Form.Label>
                            <Form.Control
                                name='message'
                                as="textarea" // Use `as="textarea"` to render a textarea element
                                rows={rows} // Correct attribute is `rows`, not `row`
                                className={formData.message ? style.activeinputfieldtextarea : style.inputfieldtextarea}
                                value={formData.message}
                                onChange={(e) => setField("message", e.target.value)}
                            />
                            <Form.Control.Feedback type="invalid" className='d-inline'>
                                {errors.message && <div className="text-danger">{errors.message}</div>}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </div>
                    <div>
                        <Button className={style.sendbtn} type='submit' onClick={handleemailsend}>
                            Send Message
                        </Button>
                    </div>
                    {error && "Error"}
                    {success && "Send your information successfully"}
                </Form>
            </div>
        </div>
    )
}

export default ContactUsForm