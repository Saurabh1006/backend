// import React, { useState, useEffect } from "react";
// import axios from "axios"; // Import Axios

// const UserList = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     // Make an Axios GET request to fetch data
//     axios
//       .get("http://localhost:8080/getUsers")
//       .then((response) => {
//         setData(response.data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setLoading(false);
//       });
//   }, []);
//   console.log(data);
//   return (
//     <div>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
        
//           <table>
//             <thead>
//             <tr>
//               <th>id</th>
//               <th>name</th>
//               <th>password</th>
//               </tr>
//             </thead>
//             <tbody>
//             {data.map((user) => (
//               <tr key={user.id}>
//                 <td>{user.id}</td>
//                 <td>{user.username}</td>
//                 <td>{user.password}</td>
//               </tr>
//             ))}
//           </tbody>
//           </table>
          
//       )}
//     </div>
//   );
// };

// export default UserList;
