import React, {useEffect, useState} from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from '../axios/index';

export default function FormEdit() {
    const history = useHistory();
    const [sale, setSale] = useState({});
    const { id } = useParams();

    useEffect( async () => {
        const { data } = await axios.get(`/api/sale/edit/${id}`);
        setSale(data)
    }, []);

    function onchange(e) {
        let { value } = e.target;
        const { name } = e.target;

        setSale({...sale, [name]: value});
        console.log(sale);
    }

    function onSubmit(e) {
        e.preventDefault();
        axios({
            url: `api/sale/update/${id}`,
            method: 'POST',
            data: {
                name: sale.name,
                email: sale.email,
                telp: sale.telp,
                car: sale.car
            }
        })
            .then(({ data }) => {
                console.log(data, "<< submit");
                history.push('/sales')
            })
    }

    if (sale) {
        console.log(sale);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <h3>Edit sale</h3>
                    {sale && 
                        <form onSubmit={onSubmit}>
                            <label className="mt-3" htmlFor="">Name</label>
                            <input name="name" onChange={onchange} type="text" className="form-control mt-3" value={sale.name}/>

                            <label className="mt-3" htmlFor="">Price</label>
                            <input name="email"onChange={onchange} type="text" className="form-control mt-3" value={sale.email}/>
                            
                            <label className="mt-3" htmlFor="">Stock</label>
                            <input name="telp"onChange={onchange} type="text" className="form-control mt-3" value={sale.telp}/>
                            
                            <label className="mt-3" htmlFor="">Stock</label>
                            <input name="car"onChange={onchange} type="text" className="form-control mt-3" value={sale.car}/>
                            
                            
                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
