import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import TableHome from '../../components/table-home/table-home.component'

const HomePage = () => (
    <div className='homepage'>
        <TableHome />
        <Link to={`/recipes/add`}><Button>Add new</Button></Link>
    </div>
);

export default HomePage;