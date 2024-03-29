import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router';
import Illustration from '../../assets/Illustration.png'
import styles from './loginad.module.css'
import { FaRegEye } from "react-icons/fa";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import logo from '../../assets/logo.png'

const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
});

const LoginAd = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/user/login-user`, {
                    email: values.email,
                    password: values.password,
                });

                localStorage.setItem('authToken', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data));

                alert("login successfully");

                    navigate('/admin/home');
            } catch (error) {
                setError(error?.response?.data?.message);
            }
        },
    });


    return (
        <div className={`${styles.mainlogin}`}>
            <div className='row d-flex align-items-center justify-content-center me-0'>
                <div className={`${styles.loginform} me-0 d-flex align-items-center justify-content-center`}>
                    <div>
                        <div className={`text-center  ${styles.loginTab}`}>
                            <img src={logo} alt="" />
                            <h3 className='mt-5'>Stryker Fusion Login</h3>
                        </div>
                        <div className={` m-5 ${styles.logincontent} `}>
                            <form onSubmit={formik.handleSubmit}>
                                <div className="form-group mb-4">
                                    <label className="mb-3" htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        type="text"
                                        id="email"
                                        name='email'
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.email}
                                        className="form-control"
                                        aria-describedby="emailHelp"
                                        placeholder="example@gmail.com" />
                                    {formik.touched.email && formik.errors.email && (
                                        <div className={`${styles.errormsg}`}>{formik.errors.email}</div>
                                    )}
                                </div>
                                <div className="form-group mb-4">
                                    <label className="mb-3" htmlFor="exampleInputPassword1">
                                        Password
                                    </label>
                                    <div className="input-group">
                                        <input
                                            className="form-control"
                                            placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            name="password"
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            value={formik.values.password}
                                        />

                                        <button
                                            className={`${styles.eybtn}`}
                                            type="button"
                                            onClick={togglePasswordVisibility}
                                        >
                                            {showPassword ?
                                                (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="11" viewBox="0 0 13 11" fill="none">
                                                        <g opacity="0.5">
                                                            <path filRule="evenodd" clipRule="evenodd" d="M5.07225 7.60439C5.47815 7.87832 5.97285 8.04395 6.49926 8.04395C7.89456 8.04395 9.02983 6.90365 9.02983 5.50218C9.02983 4.97344 8.86493 4.47655 8.59221 4.06885L7.9009 4.76322C8.01506 4.97981 8.07848 5.23462 8.07848 5.50218C8.07848 6.37491 7.36815 7.08839 6.49926 7.08839C6.23288 7.08839 5.97919 7.02469 5.76355 6.91002L5.07225 7.60439ZM10.6787 1.97322C11.5984 2.8141 12.3785 3.94802 12.962 5.31128C13.0127 5.43232 13.0127 5.57246 12.962 5.68713C11.6047 8.85956 9.18829 10.7579 6.49917 10.7579H6.49283C5.26877 10.7579 4.09545 10.3566 3.06165 9.62401L1.83125 10.8599C1.73612 10.9554 1.61562 11 1.49511 11C1.37461 11 1.24776 10.9554 1.15897 10.8599C1.00041 10.7006 0.975045 10.4458 1.10189 10.261L1.12092 10.2356L10.5011 0.813812L10.5012 0.813807C10.5138 0.801068 10.5265 0.788329 10.5329 0.77559L10.5329 0.775584C10.5455 0.762845 10.5582 0.750107 10.5646 0.737368L11.1607 0.138555C11.351 -0.046185 11.6491 -0.046185 11.833 0.138555C12.0233 0.323295 12.0233 0.629072 11.833 0.813812L10.6787 1.97322ZM3.96392 5.50482C3.96392 5.67045 3.98295 5.83608 4.00832 5.98897L1.66168 8.34599C1.02745 7.60703 0.475671 6.71519 0.0380537 5.68956C-0.0126846 5.57489 -0.0126846 5.43475 0.0380537 5.31371C1.3953 2.14128 3.81171 0.249282 6.49449 0.249282H6.50083C7.40778 0.249282 8.28936 0.465874 9.10117 0.873576L6.98285 3.00127C6.83063 2.97579 6.66573 2.95668 6.50083 2.95668C5.09919 2.95668 3.96392 4.09697 3.96392 5.50482Z" fill="#030229" />
                                                        </g>
                                                    </svg>
                                                ) :
                                                (
                                                    <FaRegEye />
                                                )}
                                        </button>
                                    </div>
                                    {formik.touched.password && formik.errors.password && (
                                        <div className={`${styles.errormsg}`}>{formik.errors.password}</div>
                                    )}
                                </div>
                                <div className={`${styles.errormsg} my-3`}>{error}</div>
                                <button type="submit" className={`btn btn-lg ${styles.loginButton}`} >Login</button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={`${styles.backcolor}`} >
                    <img src={Illustration} alt="" className={`${styles.loginimg}`} />
                </div>
            </div>
        </div>
    )
}

export default LoginAd;