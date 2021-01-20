import './style.css';
import {  useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from '../../axios/index';

export default function Home() {
    const [cars, setCars] = useState([]);

    const history = useHistory();
    const token = localStorage.getItem('token');
    
    useEffect( async () => {
        
        const { data } = await axios.get('/api/cars');
        setCars(data);
        if (!token) {
            history.push('/login')
        }

    }, []);

    function deleteCar(id) {
        console.log(id);
        axios({
            url: `/api/car/delete/${id}`,
            method: 'delete',
        })
            .then(({ data }) => {
                if (data) {
                    history.push('/');
                }
            })    
    }

    return (
        <div className="container home">
            <div className="row">
                <div className="col-lg-6">
                <Link to="/add-car" className="btn btn-primary">Add Car</Link>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Stock</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars && 
                            cars.map(car => (
                                <tr key={car.id}>
                                    <td>{car.id}</td>
                                    <td>{car.name}</td>
                                    <td>{car.prize}</td>
                                    <td>{car.stock}</td>
                                    <td><Link to={`/edit-car/${car.id}`} className="btn btn-primary">Edit</Link> || <button onClick={() => deleteCar(car.id)} className="btn btn-danger">Delete</button></td>
                                </tr>
                            )    
                        )}
                    </tbody>
                </table>
                </div>
            </div>
        </div>
    )
}
