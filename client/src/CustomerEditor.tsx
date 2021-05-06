// import { useEffect, useState } from "react";
import { Customer } from "./model/customer";


export const CustomerEditor = (props: { customer?: Customer  }) => {
  return ( 
    <div>
      <h1>Customer: { props.customer?.lastName }</h1>
      <label>City</label>
      <Input parent={props.customer} propertyName="city" />
    </div>
  )
};

// eslint-disable-next-line
export const Input = (props: { parent: any, propertyName: string} ) => {
  const { parent, propertyName, ...otherProps} = props;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const prop = e.target.name;
    parent[prop] = val;
    
    e.preventDefault();
  }
  return (
    <input  name={propertyName} value ={parent[propertyName]} onChange={handleChange}  {...otherProps } />
  )
}