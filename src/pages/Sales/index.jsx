import './style.css';
import {  useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from '../../axios/index';

export default function Sales() {
    const history = useHistory();
    const token = localStorage.getItem('token');
    const [sales, setSales] = useState([]);

    useEffect( async () => {

        const { data } = await axios.get('/api/sales');
        setSales(data)
        if (!token) {
            history.push('/login')
        }
        
    }, []);

    function deleteSale(id) {
        axios.delete(`/api/sale/delete/${id}`)
            .then(({ data }) => {
                if (data) {
                    history.push('/sales')
                }
            })
    }

    return (
        <div className="container home">
            <div className="row">
                <div className="col-lg-10">
                <Link to="/add-sale" className="btn btn-primary">Add Sale</Link>
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama</th>
                            <th scope="col">Email</th>
                            <th scope="col">Telp</th>
                            <th scope="col">Car Name</th>
                            <th scope="col">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales && 
                            sales.map(sale => (
                                <tr key={sale.id}>
                                    <td>{sale.id}</td>
                                    <td>{sale.name}</td>
                                    <td>{sale.email}</td>
                                    <td>{sale.telp}</td>
                                    <td>{sale.car}</td>
                                    <td><Link to={`/edit-sale/${sale.id}`} className="btn btn-primary">Edit</Link> || <button onClick={() => deleteSale(sale.id)} className="btn btn-danger">Delete</button></td>
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
