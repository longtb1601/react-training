import React, { useState } from "react";
import { Formik } from "formik";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const initialValues = { email: "", password: "", re_password: "", name: ""};

const validateValues = (values) => {
    const errors = {};
    if (!values.email) {
        errors.email = "Email is required";
    }
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
        errors.email = "Invalid email address";
    }

    if (values.password.length < 8) {
        errors.password = "Password must be at least 8 characters";
    }

    if(!values.name) {
        errors.name = "Name is required";
    }

    if(values.re_password !== values.password || values.re_password.length < 8) {
        errors.re_password = "Re-enter password not matching with password";
    }

    return errors;
};

const RegisterPage = () => {
    const history = useHistory();

    const onSubmit = (values, { setSubmitting }) => {
        history.push("/login");
    };

    return (
        <div className="login-form container">
            <div className="text-center">
                <h3>Register</h3>
            </div>
            <Formik
                initialValues={initialValues}
                validate={validateValues}
                onSubmit={onSubmit}
            >
                {({
                    handleSubmit,
                    handleChange,
                    handleBlur,
                    values,
                    touched,
                    isValid,
                    errors,
                    /* and other goodies */
                }) => (
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="text-center">
                            <Col md={4}></Col>
                            <Col md={4}>
                                <Form.Group controlId="validationFormik102" className="mb-3">
                                    <Form.Control
                                        placeholder="Email"
                                        type="email"
                                        name="email"
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.email && errors.email}
                                        isValid={touched.email && !errors.email}
                                    />
                                    <Form.Control.Feedback type="valid">
                                        Look good
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Password"
                                        name="password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.password && errors.password}
                                        isValid={touched.password && !errors.password}
                                        value={values.password}
                                    />
                                    <Form.Control.Feedback type="valid">
                                        Look good
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="password"
                                        placeholder="Re-enter password"
                                        name="re_password"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.re_password && errors.re_password}
                                        isValid={touched.re_password && !errors.re_password}
                                        value={values.re_password}
                                    />
                                    <Form.Control.Feedback type="valid">
                                        Look good
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.re_password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control
                                        type="text"
                                        placeholder="Your name"
                                        name="name"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        isInvalid={touched.name && errors.name}
                                        isValid={touched.name && !errors.name}
                                        value={values.name}
                                    />
                                    <Form.Control.Feedback type="valid">
                                        Look good
                                    </Form.Control.Feedback>
                                    <Form.Control.Feedback type="invalid" className="d-block">
                                        {errors.name}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default RegisterPage;
