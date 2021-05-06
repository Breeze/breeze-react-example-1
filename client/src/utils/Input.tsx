// eslint-disable-next-line
export const Input = (props: { parent: any, propertyName: string,  [x:string]: any;} ) => {
  const { parent, propertyName, ...otherProps} = props;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const prop = e.target.name;
    parent[prop] = val;
    
    e.preventDefault();
  }
  return (
    <input  name={propertyName} value ={parent[propertyName] || ''} onChange={handleChange}  {...otherProps } />
  )
}