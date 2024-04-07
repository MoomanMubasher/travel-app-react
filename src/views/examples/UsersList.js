import React from 'react'
import Header from 'components/Headers/Header'
import Users from 'components/Cruds/Users'
// import { DataTable } from 'primereact/datatable';
// import { Column } from 'primereact/column';
// import Test from './Test';

const UsersList = () => {


  return (
    <>
    <Header/>
    <div className='card mt-3 mx-5'>
    <Users/>
    {/* <Test/> */}
    {/* <Test latitude={55.22} longitude={35.24} /> */}
    {/* <Test landmarkId='65f8db444bf2ba38331c73ce' userId='65f5e8ddf70eb5dcfbd6172a' /> */}
    </div>
    </>
  )
}

export default UsersList