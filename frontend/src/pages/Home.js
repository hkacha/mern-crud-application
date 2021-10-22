import React, { useState, useEffect } from 'react';

// 3rd Party Packages
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiTrash2 } from "react-icons/fi";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

// Import components
import ALL_DAYS from '../constants';

const commonErrorMsg = "This field is required";

const validationSchema = Yup.object().shape({
    dayType: Yup.string().required(commonErrorMsg),
    daysOfWeek: Yup.string().required(commonErrorMsg),
    every: Yup.string().required(commonErrorMsg),
    startTime: Yup.string().required(commonErrorMsg),
    endTime: Yup.string().required(commonErrorMsg)
});

const getAllDays = ALL_DAYS.map((item, index) => {
    return (<option value={item} key={index}>{item}</option>)
})

const Home = () => {

    const [availabilites, setAvailabilites] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false)

    const getAllAvailabilites = async (id) => {
        await axios({
            method: "GET",
            url: `/availabilities/${id}`,
        }).then(res => {
            setAvailabilites(res.data)
        })
    }

    const handleDelete = async (id) => {
        await axios({
            method: "DELETE",
            url: `/delete-availability/${id}`,
        }).then(res => {
            setAvailabilites(availabilites.filter((el => el._id !== id)))
        });
    }

    useEffect(() => {
        getAllAvailabilites(1);
    }, [availabilites])

    return (
        <React.Fragment>
            <Container className="py-4">
                <h6>Availabilities</h6>

                <Row>
                    <Col lg={7}>
                        {
                            availabilites.map((item, index) => {
                                return(
                                    <Row key={index}>
                                        <Col>
                                            <div className="item-data text-capitalize">{item.dayType}</div>
                                        </Col>
                                        <Col>
                                            <div className="item-data text-capitalize">{item.daysOfWeek}</div>
                                        </Col>
                                        <Col>
                                            <div className="item-data text-capitalize">{item.every}</div>
                                        </Col>
                                        <Col>
                                            <div className="item-data">{item.startTime}</div>
                                        </Col>
                                        <Col>
                                            <div className="item-data">{item.endTime}</div>
                                        </Col>
                                        <Col>
                                            <div className="trash" onClick={() => handleDelete(item._id)}>
                                                <FiTrash2 className="text-danger" />
                                            </div>
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                        {/* <table className="table">
                            <tbody>
                                {
                                    availabilites.map((item, index) => {
                                        return(
                                            <tr key={index}>
                                                <td className="text-capitalize">{item.dayType}</td>
                                                <td>{item.daysOfWeek}</td>
                                                <td>{item.every}</td>
                                                <td>{item.startTime}</td>
                                                <td>{item.endTime}</td>
                                                <td><FiTrash2 className="text-danger" /></td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table> */}
                    </Col>
                </Row>

                <Row>
                    <Col lg={7} className="mt-3">
                        {isFormVisible ?
                            <Formik
                                initialValues={{ carer: 1, dayType: "", daysOfWeek: "", every: "", startTime: "", endTime: "" }}
                                validationSchema={validationSchema}
                                onSubmit={async (values, {setSubmitting, resetForm}) => {
                                    setSubmitting(true)

                                    await axios({
                                        method: "POST",
                                        data: values,
                                        url: '/create',
                                    }).then(res => {
                                        setTimeout(() => {
                                            resetForm();
                                            setSubmitting(false)
                                            setIsFormVisible(false)
                                        }, 500);
                                    })
                                }}
                            >
                            {( {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Row className="d-none">
                                        <Col lg={12}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Carer:</Form.Label>
                                                <Form.Control type="text" value={values.carer} name="carer" readOnly />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Day Type:</Form.Label>
                                                <Form.Select value={values.dayType} onChange={handleChange} onBlur={handleBlur} name="dayType">
                                                    <option>Select</option>
                                                    <option value="daily">Daily</option>
                                                    <option value="specific-day">On Specific Day</option>
                                                </Form.Select>
                                                {touched.dayType && errors.dayType ? (<div className="error-message">{errors.dayType}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Days Of Week:</Form.Label>
                                                <Form.Select value={values.daysOfWeek} onChange={handleChange} onBlur={handleBlur} name="daysOfWeek">
                                                    <option>Select</option>
                                                    <option value="All">All</option>
                                                    {getAllDays}
                                                </Form.Select>
                                                {touched.daysOfWeek && errors.daysOfWeek ? (<div className="error-message">{errors.daysOfWeek}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Every:</Form.Label>
                                                <Form.Select value={values.every} onChange={handleChange} onBlur={handleBlur} name="every" >
                                                    <option>Select</option>
                                                    <option value="All">All</option>
                                                    <option value="1st">1st</option>
                                                    <option value="2nd">2nd</option>
                                                    <option value="3rd">3rd</option>
                                                    <option value="4th">4th</option>
                                                </Form.Select>
                                                {touched.every && errors.every ? (<div className="error-message">{errors.every}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Start Time:</Form.Label>
                                                <Form.Control type="text" name="startTime" placeholder="0:00 AM" onChange={handleChange} onBlur={handleBlur} value={values.startTime} />
                                                {touched.startTime && errors.startTime ? (<div className="error-message">{errors.startTime}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="mb-3">
                                                <Form.Label>End Time:</Form.Label>
                                                <Form.Control type="text" name="endTime" placeholder="0:00 AM" onChange={handleChange} onBlur={handleBlur} value={values.endTime} />
                                                {touched.endTime && errors.endTime ? (<div className="error-message">{errors.endTime}</div>): null}
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Button type="submit" disabled={isSubmitting} className="btn btn-success btn-sm">Submit</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                            </Formik>
                        :
                            <p className="text-primary fw-bold mt-3" onClick={() => setIsFormVisible(true)}>Add more +</p>
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home
