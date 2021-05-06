import React from "react";
import { Customer } from "./model/customer";
import { Input } from "./utils/Input";

export const CustomerEditor = (props: { customer: Customer  }) => {
  const customer = props.customer;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const prop = e.target.name;
    (customer as any)[prop] = val;
    e.preventDefault();
  }

  return ( 
    <div >
      <h1>Customer</h1>
      
      <div className="row mt-1">
        <label className="col-md-1">First Name</label>
        <input className="col-md-4" name="firstName" value={customer.firstName || ''} onChange={handleChange}  />  
        
        <label className="col-md-1">Last Name</label>
        <input className="col-md-4" name="lastName" value ={customer.lastName || ''} onChange={handleChange}  />  
      </div>
      <div className="row mt-1">
        <label className="col-md-1">City</label>
        {/* shorter version of the same */}
        <Input className="col-md-4" parent={customer} propertyName="city" />  

        <label className="col-md-1">Country</label>
        <input className="col-md-4" name="country" value ={customer.country || ''} onChange={handleChange}  />  
      </div>
    </div>
    
  )
}

