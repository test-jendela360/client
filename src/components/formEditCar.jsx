import React, {useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';
import axios from '../axios/index';

export default function FormEdit() {
    const [car, setCar] = useState({});
    const { id } = useParams();

    useEffect( async () => {
        const { data } = await axios.get(`/api/car/edit/${id}`);
        setCar(data)
    }, []);

    function onchange(e) {
        let { value } = e.target;
        const { name } = e.target;

        if (e.target.type === 'number') {
            value = Number(value);    
        }

        setCar({...car, [name]: value});
        console.log(car);
    }

    function onSubmit(e) {
        e.preventDefault();
        axios({
            url: `api/car/update/${id}`,
            method: 'POST',
            data: {
                name: car.name,
                prize: car.prize,
                stock: car.stock
            }
        })
            .then(({ data }) => {
                console.log(data, "<< submit");
            })
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <h3>Edit Car</h3>
                    {car && 
                        <form onSubmit={onSubmit}>
                            <label className="mt-3" htmlFor="">Name</label>
                            <input name="name" onChange={onchange} type="text" className="form-control mt-3" value={car.name}/>
                            <label className="mt-3" htmlFor="">Price</label>
                            <input name="prize"onChange={onchange} type="number" className="form-control mt-3" value={car.prize}/>
                            <label className="mt-3" htmlFor="">Stock</label>
                            <input name="stock"onChange={onchange} type="number" className="form-control mt-3" value={car.stock}/>
                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
