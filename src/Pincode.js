import React, { useState } from 'react'

const Pincode = () => {
    const [pincode,setPincode] = useState('');
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) =>
    {
        setPincode(e.target.value);
    }
    const handleLookup = async () =>
    {
        if(pincode.length !== 6 || isNaN(pincode))
        {
            setError("please enter a valid 6-digit pincode")
            return;
        }
        setError(null);
        try {
            const response =await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
            const result = await response.json();
            if(result[0].Status == 'Eroor')
            {
                setData(null);
                setError('No data found for this pincode.');
                setError(null);
            }
            else {
                setData(result[0].PostOffice[0]);
                setError(null);
            }
        }
        catch(err)
        {
            setError('An error occured while ');
            setData(null);
        }
    }
  return (
    <div>
         <h3>Enter Pincode</h3>
      <input
        type="text"
        value={pincode}
        onChange={handleChange}
        placeholder="Pincode"
        maxLength="6"
      />
      <br></br>
      <button style={{color :'white', backgroundColor : "black"}} onClick={handleLookup}>Lookup</button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {data && (
        <div style={{width : "678.39px", height : "399px"}}>
          
          <p><strong>Name:</strong> {data.Name}</p>
          <p><strong>Branch Type:</strong> {data.BranchType}</p>
          <p><strong>Delivery Status:</strong>{data.DeliveryStatus}</p>
          
          <p><strong>Division:</strong>{data.Division}</p>
        </div>
      )}
    </div>
  )
}

export default Pincode
