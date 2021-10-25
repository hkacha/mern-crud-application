import React, { useState, useEffect } from 'react';

// 3rd Party Packages
import axios from 'axios';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { FiCheck, FiX } from "react-icons/fi";
import { Row, Col, Form, Button, Container } from 'react-bootstrap';

// Import components
import ALL_DAYS from '../constants';
import ReadOnlyRows from '../components/ReadOnlyRows';
import EditableRow from '../components/EditableRow';

const commonErrorMsg = "This field is required";

const validationSchema = Yup.object().shape({
    day_type: Yup.string().required(commonErrorMsg),
    day_of_week: Yup.string().required(commonErrorMsg),
    every: Yup.string().required(commonErrorMsg),
    start_time: Yup.string().required(commonErrorMsg),
    end_time: Yup.string().required(commonErrorMsg)
});

const getAllDays = ALL_DAYS.map((item, index) => {
    return (<option value={item} key={index}>{item}</option>)
});

const Home = () => {

    const [availabilites, setAvailabilites] = useState([])
    const [isFormVisible, setIsFormVisible] = useState(false)
    const [editContactId, seteditContactId] = useState(null)

    const getAllAvailabilites = async (id) => {
        await axios({
            method: "GET",
            url: `/availabilities/carer/${id}`,
        }).then(res => {
            setAvailabilites(res.data)
        })
    }

    const handleDelete = async (id) => {
        await axios({
            method: "DELETE",
            url: `/availabilities/delete/${id}`,
        }).then(res => {
            setAvailabilites(availabilites.filter((el => el.id !== id)))
        });
    }

    const handleClickEditRow = (e, id) => {
        e.preventDefault();
        seteditContactId(id)
    }
    
    const onSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        await axios({
            method: "POST",
            data: values,
            url: '/availabilities/create',
        }).then(res => {
            const data = res.data;
            setTimeout(() => {
                setAvailabilites({...availabilites, data})
                resetForm();
                setSubmitting(false)
                setIsFormVisible(false)
            }, 500);
        })
    }

    const onEditSubmit = async (values, {setSubmitting, resetForm}) => {
        setSubmitting(true)
        await axios({
            method: "PUT",
            data: values,
            url: `/availabilities/update/${values.id}`,
        }).then(res => {
            const data = res.data;
            // const getIndex = availabilites.findIndex((item) => item.id)
            // console.log(getIndex)
            // availabilites[getIndex] = data

            setTimeout(() => {
                resetForm();
                setSubmitting(false)
                seteditContactId(null)
                setAvailabilites(prevData => ({...prevData, availabilites:data}))
            }, 500);
        })
    }

    useEffect(() => {
        getAllAvailabilites(1);
    }, [availabilites.length])

    return (
        <React.Fragment>
            <Container className="py-4">
                <h6>Availabilities</h6>

                <Row>
                    <Col lg={7}>
                        { availabilites.length > 0 &&
                            <React.Fragment>
                                <Row>
                                    <Col><span className="fw-bold">Day Type</span></Col>
                                    <Col><span className="fw-bold">Day Of Week</span></Col>
                                    <Col><span className="fw-bold">Every</span></Col>
                                    <Col><span className="fw-bold">Start Time</span></Col>
                                    <Col><span className="fw-bold">End Time</span></Col>
                                    <Col><span className="fw-bold">Action</span></Col>
                                </Row>
                                {
                                    availabilites.map((item, index) => (
                                        <React.Fragment key={index}>
                                            {editContactId === item.id ?
                                                <EditableRow item={item} handleClickEditRow={handleClickEditRow} onSubmit={onEditSubmit} validationSchema={validationSchema} />
                                            :
                                                <ReadOnlyRows item={item} handleClickEditRow={handleClickEditRow} handleDelete={handleDelete} />
                                            }
                                        </React.Fragment>
                                    ))
                                }
                            </React.Fragment>
                        }
                    </Col>
                </Row>

                <Row>
                    <Col lg={7}>
                        {isFormVisible ?
                            <Formik
                                initialValues={{ carer_id: 1, day_type: "", day_of_week: "", every: "", start_time: "", end_time: "" }}
                                validationSchema={validationSchema}
                                onSubmit={onSubmit}
                            >
                            {( {values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                                <Form onSubmit={handleSubmit}>
                                    <Row>
                                        <Col>
                                            <Form.Group className="my-2">
                                                <Form.Control type="text" className="d-none" value={values.carer_id} name="carer_id" readOnly />
                                                <Form.Select value={values.day_type} onChange={handleChange} onBlur={handleBlur} name="day_type">
                                                    <option>Select</option>
                                                    <option value="daily">Daily</option>
                                                    <option value="specific-day">On Specific Day</option>
                                                </Form.Select>
                                                {touched.day_type && errors.day_type ? (<div className="error-message">{errors.day_type}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="my-2">
                                                <Form.Select value={values.day_of_week} onChange={handleChange} onBlur={handleBlur} name="day_of_week">
                                                    <option>Select</option>
                                                    <option value="All">All</option>
                                                    {getAllDays}
                                                </Form.Select>
                                                {touched.day_of_week && errors.day_of_week ? (<div className="error-message">{errors.day_of_week}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="my-2">
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
                                            <Form.Group className="my-2">
                                                <Form.Control type="text" name="start_time" placeholder="0:00 AM" onChange={handleChange} onBlur={handleBlur} value={values.start_time} />
                                                {touched.start_time && errors.start_time ? (<div className="error-message">{errors.start_time}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group className="my-2">
                                                <Form.Control type="text" name="end_time" placeholder="0:00 AM" onChange={handleChange} onBlur={handleBlur} value={values.end_time} />
                                                {touched.end_time && errors.end_time ? (<div className="error-message">{errors.end_time}</div>): null}
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            <Form.Group>
                                                <ul className="m-0 list-inline">
                                                    <li className="list-inline-item">
                                                        <Button type="submit" variant="link" disabled={isSubmitting} size="sm" style={{padding: '0px'}}>
                                                            <div className="btn-icon" style={{padding: '0px'}}>
                                                                <FiCheck className="text-success" />
                                                            </div>
                                                        </Button>
                                                    </li>
                                                    <li className="list-inline-item">
                                                        <div className="trash">
                                                            <FiX className="text-danger" />
                                                        </div>
                                                    </li>
                                                </ul>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Form>
                            )}
                            </Formik>
                        :
                            <Button variant="link" size="sm" className="text-primary fw-bold mt-3" style={{paddingLeft:'0px'}} onClick={() => setIsFormVisible(true)}>Add more +</Button>
                        }
                    </Col>
                </Row>
            </Container>
        </React.Fragment>
    )
}

export default Home
