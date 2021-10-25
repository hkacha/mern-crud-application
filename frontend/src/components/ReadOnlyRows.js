import React from 'react';
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import { Row, Col } from 'react-bootstrap';

const ReadOnlyRows = (props) => {
    const {item, handleClickEditRow, handleDelete} = props;

    return (
        <React.Fragment>
            <Row>
                <Col>
                    <div className="item-data text-capitalize">{item.day_type}</div>
                </Col>
                <Col>
                    <div className="item-data text-capitalize">{item.day_of_week}</div>
                </Col>
                <Col>
                    <div className="item-data text-capitalize">{item.every}</div>
                </Col>
                <Col>
                    <div className="item-data">{item.start_time}</div>
                </Col>
                <Col>
                    <div className="item-data">{item.end_time}</div>
                </Col>
                <Col>
                    <ul className="m-0 list-inline">
                        <li className="list-inline-item">
                            <div className="trash">
                                <FiEdit2 className="text-warning" onClick={(e) => handleClickEditRow(e, item.id)} />
                            </div>
                        </li>
                        <li className="list-inline-item">
                            <div className="trash">
                                <FiTrash2 className="text-danger" onClick={() => handleDelete(item.id)} />
                            </div>
                        </li>
                    </ul>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ReadOnlyRows;