import React from 'react';
import styled from 'styled-components';
const Img = styled.img`
 height: 100%;
 object-fit: cover;
 width: 100%;
 /* border-radius: 50%; */
`
const Card = styled.div`
@media screen and (max-width:568px) {
    /* height: 60vh; */
}
`

const TeacherCard = (props) => {
    const { name, position, image, qualification, course } = props.teacher;
    return (
        <div className="bg-white">
            <Card className="card">
                <div style={{ height: '375px' }}>
                    <Img src={image} className="" alt="..." />
                </div>
                <div className="card-body text-center">
                    <h5 className="card-title">{name}</h5>
                    <span className='text-muted'>{position}</span>
                    <p className="card-text mb-0">{qualification}</p>
                    <p className="card-text">{course}</p>
                </div>
            </Card>
        </div>
    );
};

export default TeacherCard;