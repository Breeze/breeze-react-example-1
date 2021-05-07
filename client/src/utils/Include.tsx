// Example use
// <Include when={currentCust != null} >
//    <CustomerEditor customer={currentCust!} /> 
// </Include> 

export function Include( props: { when: boolean, children: any } ) {
  if (props.when) {
    return (
      <>
      { props.children }
      </>
    );
  } else {
    return null;
  }
}