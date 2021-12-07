import React from 'react';



export const PropertiesTable = ({ list }) => {

  function thousands_separators(num)
  {
    var num_parts = num.toString().split(".");
    num_parts[0] = num_parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return num_parts.join(".");
  }

  function total(){
    let totalValuation = list.map(item => item.valuation).reduce((prev, curr) => prev + curr, 0);
    return totalValuation
  }

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Address</th>
          <th>Valuation</th>
        </tr>
      </thead>
      <tbody>
        { 
        list.map((item, index) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.address}</td>
                <td>{`$ ${thousands_separators(item.valuation).toLocaleString('en-US')}`}</td>
              </tr>
        ))}
      </tbody>
    </table>

  );
};
