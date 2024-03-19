
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Table(props) {
    let emptyProduct = {
        id: null,
        name: '',
        image: null,
        description: '',
        category: null,
        price: 0,
        quantity: 0,
        rating: 0,
        inventoryStatus: 'INSTOCK'
    };

    const [products, setProducts] = useState(null);
    const [deleteProductDialog, setDeleteProductDialog] = useState(false);
    const [product, setProduct] = useState(emptyProduct);
    const [globalFilter, setGlobalFilter] = useState(null);
    const toast = useRef(null);
    const dt = useRef(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchLandmarks = async () => {
                  try {
                    const response = await axios.get('http://localhost:8000/api/landmarks');
                    console.log(response,'response')
                    setProducts(response.data);
                  } catch (error) {
                    console.error('Error fetching landmarks:', error);
                  }
                };
                fetchLandmarks();
    }, []);


    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };
    
    const handleComments = (product) => {
        console.log(product,'edit')
        navigate(`/admin/landmarks/${product?._id}/comments`)
    };
    const handleRating = (product) => {
        console.log(product,'edit')
        navigate(`/admin/landmarks/${product?._id}/ratings`)
    };

    const deleteProduct = async(data) => {
        let _products = products.filter((val) => val._id !== product._id);
        try {
            const response = await axios.delete(`http://localhost:8000/api/landmarks/${product?._id}`);
            console.log(response,'response')
            setProducts(_products);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
          } catch (error) {
            console.error('Error fetching landmarks:', error);
          }
     
    };


    const imageBodyTemplate = (rowData) => {
        return <img src={rowData?.pictures[0]?.url} alt={rowData?.pictures[0]?.name || "image"} className="shadow-2 border-round" style={{ width: '75px', height:'65px' }} />;
    };


    const ratingBodyTemplate = (rowData) => {
        return <Rating value={rowData.averageRating} readOnly cancel={false} />;
    };

    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-star" rounded outlined className="mr-2" onClick={() => handleRating(rowData)} />
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => handleComments(rowData)} />
                {/* <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} /> */}
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Landmarks</h4>
            <span className="p-input-icon-left">
                <i className="pi pi-search" />
                <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
            </span>
        </div>
    );
 
    const deleteProductDialogFooter = (
        <React.Fragment>
            <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
            <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
        </React.Fragment>
    );


    return (
        <div>
            <Toast ref={toast} />
            <div className="card">
                {/* <Toolbar className="mb-4" ></Toolbar> */}

                <DataTable ref={dt} value={products} 
                        dataKey="_id"  paginator rows={10} rowsPerPageOptions={[5, 10, 25]}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} products" globalFilter={globalFilter} header={header}>
                    <Column exportable={false}></Column>
                    <Column field="_id" header="ID" sortable style={{ minWidth: '12rem' }}></Column>
                    <Column field="pictures" header="Image" body={imageBodyTemplate}></Column>
                    <Column field="name" header="Name" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="longitude" header="Longitude" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="latitude" header="Latitude" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="rating" header="Rating" body={ratingBodyTemplate} sortable style={{ minWidth: '12rem' }}></Column>
                    <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>


            <Dialog visible={deleteProductDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Confirm" modal footer={deleteProductDialogFooter} onHide={hideDeleteProductDialog}>
                <div className="confirmation-content">
                    <i className="pi pi-exclamation-triangle mr-3" style={{ fontSize: '2rem' }} />
                    {product && (
                        <span>
                            Are you sure you want to delete <b>{product.name}</b>?
                        </span>
                    )}
                </div>
            </Dialog>
           
        </div>
    );
}
        