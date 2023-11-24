import React, { useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../db/firebase';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import { Timestamp } from 'firebase/firestore';
import { FaRegFileAlt } from "react-icons/fa";
// import { Loader } from 'react-loader-spinner';
import { getCurrentUser, signOut } from '../../func/auth';

const RouteTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'routes'));
        const newData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setData(newData);
        setLoading(false);
      } catch (error) {
            swal({
                title: "Oops!",
                text: `Error enviando los datos al servidor: ${error.message}`,
                icon: "error",
                button: "Continue",
            });
            setLoading(false);
      }
    };

    fetchData();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
    } catch (error) {
      swal({
        title: "Oops!",
        text: `Error opteniendo usuario: ${error.message}`,
        icon: "error",
        button: "Continue",
      }); 
    }
  };
  
  fetchCurrentUser();

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'nombre', headerName: 'Name', width: 200, editable: true },
    { 
      field: 'fecha', 
      headerName: 'Fecha', 
      width: 150, 
      valueFormatter: (params) => {
        if (params.value instanceof Timestamp) {
          return params.value.toDate().toLocaleString();
        }
        // Handle other cases if needed
        return params.value;
      },
    },
    {
      field: 'imagenHojaRuta',
      headerName: 'Image',
      width: 200,
      renderCell: (params) => (
        <a href={params.value} target="_blank" rel="noopener noreferrer">
          <FaRegFileAlt style={{ fontSize: 30, color: 'black' }} />
        </a>
      ),
    },
    { field: 'chofer', headerName: 'Chofer', width: 250, editable: true },
    // Additional columns based on email condition
    user?.email === 'ramydcampusano@hotmail.com' && { field: 'precio', headerName: 'Precio', width: 150 },
  ];
  

  if (loading) {
    return 
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        {/* <Loader type="ThreeDots" color="#00BFFF" height={80} width={80} /> */}
        Loading ...
    </div>;
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
        <div style={{ height: 400, width: '70%' }}>
            <DataGrid
            rows={data}
            columns={columns}
            pageSize={5}
            loading={loading} 
            pageSizeOptions={[10]}
            />
        </div>
    </div>
  );
};

export default RouteTable;
