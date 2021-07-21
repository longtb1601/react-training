import React, { useState } from "react";
import axios from "axios";
import { Formik } from "formik";
import { Form, Button } from "react-bootstrap";

const initialValues = { email: "", password: "" };

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

    return errors;
};

const LoginFormPage = ({ setCurrentUser, title }) => {
    const onSubmit = (values, { setSubmitting }) => {
        axios
            .get("https://60dff0ba6b689e001788c858.mockapi.io/token", {
                email: values.email,
                password: values.password,
            })
            .then((response) => {
                setSubmitting(false);
                setCurrentUser({
                    token: response.data.token,
                    userId: response.data.userId,
                });

                axios.defaults.headers.common["Authorization"] = response.data.token;
            });
    };

    return (
        <div className="login-form container">
            <div className="text-center">
                <h3>Login</h3>
                {title && <h5>{title}</h5>}
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
                        <Form.Group controlId="validationFormik102" className="mb-3">

                            <Form.Label>Email</Form.Label>
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
                            <Form.Label>Password</Form.Label>
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
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default LoginFormPage;
