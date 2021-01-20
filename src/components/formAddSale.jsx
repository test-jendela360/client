import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';
import axios from '../axios/index';

export default function FormAdd() {
    const [sale, setSale] = useState({});
    const history = useHistory();

    function onSubmit(e) {
        e.preventDefault();
        axios.post('/api/sale/add', sale)
            .then(({ data }) => {
                if (data) {
                    history.push('/sales')
                }
            })
    }

    function onChange(e) {
        let { value } = e.target;
        const { name } = e.target;

        setSale({...sale, [name]: value});
        console.log(sale);
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-lg-6">
                    <h3>Add sale</h3>
                    {sale && 
                        <form onSubmit={onSubmit}>
                            <label className="mt-3" htmlFor="">Name</label>
                            <input name="name" onChange={onChange} type="text" className="form-control mt-3" value={sale.name}/>

                            <label className="mt-3" htmlFor="">Email</label>
                            <input name="email"onChange={onChange} type="email" className="form-control mt-3" value={sale.email}/>
                            
                            <label className="mt-3" htmlFor="">Telp</label>
                            <input name="telp"onChange={onChange} type="text" className="form-control mt-3" value={sale.telp}/>
                            
                            <label className="mt-3" htmlFor="">Car Name</label>
                            <input name="car"onChange={onChange} type="text" className="form-control mt-3" value={sale.car}/>


                            <button type="submit" className="btn btn-success mt-3">Submit</button>
                        </form>
                    }
                </div>
            </div>
        </div>
    )
}
