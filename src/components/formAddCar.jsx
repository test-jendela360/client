import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../axios/index';

export default function FormAdd() {
    const [car, setCar] = useState({});
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        axios.post('/api/car/add', car)
            .then(({ data }) => {
                console.log(data);
                if (data) {
                    history.push('/')
                }
            })
    }

    function onChange(e) {
        let { value } = e.target;
        const { name } = e.target;

        if (e.target.type === 'number') {
            value = Number(value);    
        }

        setCar({...car, [name]: value});
        console.log(car);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <h3>Edit Car</h3>
                    {car && 
                        <form onSubmit={onSubmit}>
                            <label className="mt-3" htmlFor="">Name</label>
                            <input name="name" onChange={onChange} type="text" className="form-control mt-3" value={car.name}/>
                            <label className="mt-3" htmlFor="">Price</label>
                            <input name="prize"onChange={onChange} type="number" className="form-control mt-3" value={car.prize}/>
                            <label className="mt-3" htmlFor="">Stock</label>
                            <input name="stock"onChange={onChange} type="number" className="form-control mt-3" value={car.stock}/>
                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
