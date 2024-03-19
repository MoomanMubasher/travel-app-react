
import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Header from 'components/Headers/Header';

export default function Comments(props) {
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

    const [productDialog, setProductDialog] = useState(false);


    const toast = useRef(null);
    const dt = useRef(null);
    const { id } = useParams();
    console.log(id,'id')

    useEffect(() => {
        const fetchLandmarks = async () => {
                  try {
                    const response = await axios.get(`http://localhost:8000/api/landmarks/${id}`);
                    console.log(response,'response')
                    setProducts(response.data.comments);
                  } catch (error) {
                    console.error('Error fetching landmarks:', error);
                  }
                };
                fetchLandmarks();
    }, [id]);


    const hideDeleteProductDialog = () => {
        setDeleteProductDialog(false);
    };


    const editProduct = (product) => {
        console.log(product,'edit')
        setProduct({ ...product });
        setProductDialog(true);
        // navigate(`/admin/landmarks/${product?._id}/comments`)
    };

    const confirmDeleteProduct = async (product) => {
        console.log(product,'product')

      
        setProduct(product);
        setDeleteProductDialog(true);
         
    };

    const createId = () => {
        let id = '';
        let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

        for (let i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        return id;
    };

    const onInputChange = (e, name) => {
        const val = (e.target && e.target.value) || '';
        let _product = { ...product };

        _product[`${name}`] = val;

        setProduct(_product);
    };


    const deleteProduct = async(data) => {
        let _products = products.filter((val) => val._id !== product._id);
        try {
            const response = await axios.delete(`http://localhost:8000/api/landmarks/${id}/comments/${product._id}`);
            console.log(response,'response')
            setProducts(_products);
            setDeleteProductDialog(false);
            setProduct(emptyProduct);
            toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Comment Deleted', life: 3000 });
          } catch (error) {
            toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error deleting comment. Please try again.', life: 3000 });
          }
     
    };


    const actionBodyTemplate = (rowData) => {
        return (
            <React.Fragment>
                <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
                <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
            </React.Fragment>
        );
    };


    const header = (
        <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
            <h4 className="m-0">Manage Comments</h4>
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

    const hideDialog = () => {
        setProductDialog(false);
    };
    const saveProduct = async () => {
        console.log(product,'product')
        console.log(id,'landmark ID')


        if (product.comment.trim()) {
            let _products = [...products];
            let _product = { ...product };

            if (product._id) {
                const index = findIndexById(product._id);

                _products[index] = _product;
                // toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
            } else {
                _product._id = createId();
                _products.push(_product);
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
            }

            try {
                await axios.put(`http://localhost:8000/api/landmarks/${id}/comments/${_product?._id}`, {
                  commentId: _product?._id,
                  comment: product?.comment
                });
                // Optionally, you can handle success by displaying a message or updating state
                toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Comment Updated', life: 3000 });
              } catch (error) {
                console.error('Error updating comment:', error);
                // Optionally, you can handle errors by displaying an error message
                toast.current.show({ severity: 'error', summary: 'Error', detail: 'Error updating comment. Please try again.', life: 3000 });
              }



            setProducts(_products);
            setProductDialog(false);
            setProduct(emptyProduct);
        }
    };

    const findIndexById = (id) => {
        let index = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i]._id === id) {
                index = i;
                break;
            }
        }
        return index;
    };
    
    const productDialogFooter = (
        <React.Fragment>
            <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
            <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
        </React.Fragment>
    );

    return (

        <>
        <Header/>
        <div className='card mt-3 mx-5'>
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
                    <Column field="comment" header="Comment" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="user" header="User" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column header="Actions" body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                </DataTable>
            </div>


            <Dialog visible={productDialog} style={{ width: '32rem' }} breakpoints={{ '960px': '75vw', '641px': '90vw' }} header="Comment Detail" modal className="p-fluid" footer={productDialogFooter} onHide={hideDialog}>
                <div className="field">
                    <label htmlFor="comment" className="font-bold">
                        Description
                    </label>
                    <InputTextarea id="comment" value={product.comment} onChange={(e) => onInputChange(e, 'comment')} required rows={3} cols={20} />
                </div>

            </Dialog>



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
        </div>
        </>
    );
}
        