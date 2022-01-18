import classnames from 'classnames'
import { truncateSync } from 'fs'
import { useContext, useEffect, useState } from 'react'
import { MatrixTableContext, MatrixTableContextProvider } from './context'

type Props = {
  initialMatrix?: import('../../types').Matrix
} & import('react').HTMLAttributes<HTMLDivElement>
var orignalEmptyData = {
  lite36:'0',
  standard36:'0',
  unlimited36:'0',
  lite24:'0',
  standard24:'0',
  unlimited24:'0',
  lite12:'0',
  standard12:'0',
  unlimited12:'0',
  litemtm:'0',
  standardmtm:'0',
  unlimitedmtm:'0'
}
/**
 * Add 4 buttons: 
 * - Cancel to reset the matrix to how it was before changing the values (only when in edit mode)
 * - Edit to make the fields editable (only when not in edit mode)
 * - Clear to completely clear the table
 * - Save to save the table
 * @param param0 
 */
const MatrixTable: import('react').FC<Omit<Props, 'initialMatrix'>> = ({ className, children, ...props }) => {
  // State ------------------------------------------------------------------- //
  const [{ matrix }, dispatch] = useContext(MatrixTableContext)

  // Handlers ---------------------------------------------------------------- //
  // You can save (to api) the matrix here. Remember to update originalMatrix when done.
  const save = async () => {
  
    var jsondata = JSON.stringify(state);
   await fetch('/api/save-pricing',{
      method: 'POST',
      body: jsondata,
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(async (response)=>{
      if(response.status == 422){
        const data = await response.json();
       alert(data.error)
      }else{
        alert("save successful");
      }

    }).catch((error) => {
  // Your error is here!
  
});
  
  }


  interface UserData {
    lite36?: string;
    standard36?: string;
    unlimited36?: string;
    lite24?: string;
    standard24?: string;
    unlimited24?: string;
    lite12?: string;
    standard12?: string;
    unlimited12?: string;
    litemtm?: string;
    standardmtm?: string;
    unlimitedmtm?: string;
  }

  const [state,setState] = useState<UserData>({
    lite36:'0',
    standard36:'0',
    unlimited36:'0',
    lite24:'0',
    standard24:'0',
    unlimited24:'0',
    lite12:'0',
    standard12:'0',
    unlimited12:'0',
    litemtm:'0',
    standardmtm:'0',
    unlimitedmtm:'0'

  })

  const [inputEnable,setEnable] = useState(false)

  async function fetchData(){
      const response = await fetch('/api/pricing');
      const data = await response.json();
  
    setState({...data})
    
  }

  useEffect(()=>{
    fetchData();
  },[])


  //this is where the lite value is change and trigger the premium and unlimited
  const changeliteValue = (e:any, type:string) =>{


switch (type){
  case '36': 
  const lite36 = e.target.value;
  const standard36 =parseInt(e.target.value) * 2;
  const unlimited36 =parseInt(e.target.value) * 3;
  const stringStandard36 = standard36.toString();
  const stringUnlimited36 = unlimited36.toString();
  
  setState((prevstate=>({...prevstate,lite36:lite36,standard36:stringStandard36,unlimited36:stringUnlimited36})))
  break;
  case '24':
    const lite24 = e.target.value;

    const standard24 =e.target.value? parseInt(e.target.value) * 2 : 0;
  const unlimited24 =e.target.value? parseInt(e.target.value) * 3:0;
  const stringStandard24 = standard24.toString();
  const stringUnlimited24 = unlimited24.toString();
  
  setState((prevstate)=>({...prevstate,lite24:lite24,standard24:stringStandard24,unlimited24:stringUnlimited24}))
  break;
  case '12':
    const lite12 = e.target.value;
    const standard12 =parseInt(e.target.value) * 2;
    const unlimited12 =parseInt(e.target.value) * 3;
    const stringStandard12 = standard12.toString();
    const stringUnlimited12 = unlimited12.toString();
    
    setState((prevstate=>({...prevstate,lite12:lite12,standard12:stringStandard12,unlimited12:stringUnlimited12})))
   break;
   case 'mtm':
    const litemtm = e.target.value;
    const standardmtm =parseInt(e.target.value) * 2;
    const unlimitedmtm =parseInt(e.target.value) * 3;
    const stringStandardmtm = standardmtm.toString();
    const stringUnlimitedmtm = unlimitedmtm.toString();
    
    setState((prevstate=>({...prevstate,litemtm:litemtm,standardmtm:stringStandardmtm,unlimitedmtm:stringUnlimitedmtm})))
    break;
}


  }



//this part is where the edit and cancel table part is called
const editTable = () =>{
   if(inputEnable){
     setEnable(false);
   }else{
    fetchData();
    setEnable(true);

   }
}



  const changeValue = (e:any,type:string) =>{
    switch (type){
      case 'standard36': 
      const standard36val = e.target.value;
      setState((prevstate)=>({...prevstate,standard36:standard36val})) 
      break;
      case 'unlimited36':
        const unlimited36val = e.target.value;
        setState((prevstate)=>({...prevstate,unlimited36:unlimited36val})) 
      break;
      case 'standard24':
       const standard24val = e.target.value;
       setState((prevstate)=>({...prevstate,standard24:standard24val})) 
       break;
       case 'unlimited24':
        const unlimited24val = e.target.value;
        setState((prevstate)=>({...prevstate,unlimited24:unlimited24val})) 
        break;
        case 'standard12':
          const standard12val = e.target.value;
          setState((prevstate)=>({...prevstate,standard12:standard12val})) 
          break;
        case 'unlimited12':
           const unlimited12val = e.target.value;
           setState((prevstate)=>({...prevstate,unlimited24:unlimited12val})) 
           break;
           case 'standardmtm':
          const standardmtmval = e.target.value;
          setState((prevstate)=>({...prevstate,standardmtm:standardmtmval})) 
          break;
        case 'unlimitedmtm':
           const unlimitedmtmval = e.target.value;
           setState((prevstate)=>({...prevstate,unlimitedmtm:unlimitedmtmval})) 
           break;   
    }
  

  }

  // Effects ----------------------------------------------------------------- //

  // Rendering --------------------------------------------------------------- //
  return (
    <div className={classnames(['container', className])} {...props}>
      <button onClick={save}>Save</button>
      <button onClick={e=>setState({...orignalEmptyData})} >Clear</button>
      <button onClick={e=>editTable()}>{inputEnable?'Edit':'Cancel'}</button>
      {/* <button onClick={e=>restoreData()}>Restore</button> */}

      <br />
      <br />



<table id="customers">
<tbody>

  <tr>
  <th></th>
    <th>lite</th>
    <th>standard</th>
    <th>premium</th>
  </tr>
  <tr>
    <td>36 months</td>
    <td 
><input disabled={inputEnable} type="text" value={state.lite36} onChange={e=>changeliteValue(e,'36')}/></td>
    <td><input disabled={inputEnable} type="text" value={state.standard36} onChange={e=>changeValue(e,'standard36')}/></td>
    <td ><input disabled={inputEnable} type="text" value={state.unlimited36} onChange={e=>changeValue(e,'unlimited36')}></input></td>

    </tr>
  <tr>
  <td>24 months</td>
  <td ><input disabled={inputEnable} type="text" value={state.lite24} onChange={e=>changeliteValue(e,'24')}/></td>
    <td><input disabled={inputEnable} type="text" value={state.standard24} onChange={e=>changeValue(e,'standard24')}/></td>
    <td><input disabled={inputEnable} type="text" value={state.unlimited24} onChange={e=>changeValue(e,'unlimited24')}/></td>

    </tr>
    <tr>
    <td>12 months</td>

  <td ><input disabled={inputEnable} type="text" value={state.lite12} onChange={e=>changeliteValue(e,'12')}/></td>
    <td ><input disabled={inputEnable} type="text" value={state.standard12} onChange={e=>changeValue(e,'standard12')}/></td>
    <td><input disabled={inputEnable} type="text" value={state.unlimited12} onChange={e=>changeValue(e,'unlimited12')}/></td>
  </tr>

  <tr>
    <td>month to month</td>

  <td ><input disabled={inputEnable} type="text" value={state.litemtm} onChange={e=>changeliteValue(e,'mtm')}/></td>
    <td ><input disabled={inputEnable} type="text" value={state.standardmtm} onChange={e=>changeValue(e,'standardmtm')}/></td>
    <td ><input disabled={inputEnable} type="text" value={state.unlimitedmtm} onChange={e=>changeValue(e,'unlimitedmtm')}/></td>
  </tr>

  
  </tbody>
  </table>

      <style jsx>{`
        .container {
          
        }

        input{
          border-style:none;
        }

        #customers {
          font-family: Arial, Helvetica, sans-serif;
          border-collapse: collapse;
          width: 100%;
        }
        #customers td, #customers th {
          border: 1px solid #ddd;
          padding: 8px;
        }
      `}</style>
    </div>
  )
}

const MatrixTableWithContext: import('react').FC<Props> = ({ initialMatrix, ...props }) => {
  // You can fetch the pricing here or in pages/index.ts
  // Remember that you should try to reflect the state of pricing in originalMatrix.
  // matrix will hold the latest value (edited or same as originalMatrix)

  return (
    <MatrixTableContextProvider initialMatrix={initialMatrix}>
      <MatrixTable {...props} />
    </MatrixTableContextProvider>
  )
}

export default MatrixTableWithContext
