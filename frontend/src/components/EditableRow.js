import React from 'react';

// 3rd Party Packages
import { Formik } from 'formik';
import { FiCheck, FiX } from "react-icons/fi";
import { Row, Col, Form, Button } from 'react-bootstrap';

// Import components
import ALL_DAYS from '../constants';

const getAllDays = ALL_DAYS.map((item, index) => {
    return (<option value={item} key={index}>{item}</option>)
});

const EditableRow = (props) => {

    const {item, handleClickEditRow, onSubmit, validationSchema} = props;

    return (
        <React.Fragment>
            <Formik
                initialValues={{ 
                    id: item.id, 
                    carer_id: item.carer_id, 
                    day_type: item.day_type, 
                    day_of_week: item.day_of_week, 
                    every: item.every, 
                    start_time: item.start_time, 
                    end_time: item.end_time }}
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
                                <ul className="my-2 mx-0 list-inline">
                                    <li className="list-inline-item">
                                        <Button type="submit" variant="link" disabled={isSubmitting} size="sm" style={{padding: '0px'}}>
                                            <div className="btn-icon">
                                                <FiCheck className="text-success" />
                                            </div>
                                        </Button>
                                    </li>
                                    <li className="list-inline-item">
                                        <div className="btn-icon">
                                            <FiX className="text-danger" onClick={(e) => handleClickEditRow(e, null)} />
                                        </div>
                                    </li>
                                </ul>
                            </Col>
                        </Row>
                    </Form>
                )}
            </Formik>
        </React.Fragment>
    )
}

export default EditableRow
