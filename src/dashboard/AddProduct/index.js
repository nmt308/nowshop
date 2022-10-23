import Button from '../../components/Button';
/*Toastify*/
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { notify } from '../../components/Toast';
/*MDB*/
import { MDBValidationItem, MDBInput, MDBFile } from 'mdb-react-ui-kit';
import { useState } from 'react';
import { storage } from '../../Config/Config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { fs } from '../../Config/Config';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function AddProduct() {
    const [name, setName] = useState('');
    const [price, setprice] = useState('');
    const [oldprice, setOldprice] = useState('');
    const [image, setImage] = useState(null);
    const [typeProduct, setTypeProduct] = useState('');
    const [brand, setBrand] = useState('');

    const type = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/jpg'];

    const listType = [
        { value: 'Laptop', label: 'Laptop' },
        { value: 'Phone', label: 'Điện thoại' },
        { value: 'Tablet', label: 'Máy tính bảng' },
        { value: 'Electronic', label: 'Phụ kiện điện tử' },
        { value: 'SmartDevice', label: 'Thiết bị thông minh' },
    ];

    const listBrand = [
        { value: 'xiaomi', label: 'Xiaomi' },
        { value: 'apple', label: 'Apple' },
        { value: 'oppo', label: 'Oppo' },
        { value: 'samsung', label: 'Samsung' },
        { value: 'Asus', label: 'Asus' },
        { value: 'Dell', label: 'Dell' },
    ];

    const handleImage = (e) => {
        let image = e.target.files[0];
        if (image && type.includes(image.type)) {
            setImage(image);
        } else {
            setImage(null);
        }
    };

    const handleCreate = () => {
        if (image === null) {
            notify('error', 'Create product fail');
            return;
        }
        const storageRef = ref(storage, `product-img/${image.name}`);
        const uploadTask = uploadBytes(storageRef, image)
            .then(async (snapshot) => {
                const url = await getDownloadURL(ref(storage, storageRef));
                await addDoc(collection(fs, 'products'), {
                    name,
                    price,
                    oldprice,
                    url,
                    typeProduct,
                    brand,
                });
                notify('success', 'Create product success');
            })
            .catch((err) => {
                notify('error', 'Create product fail');
            });
    };

    return (
        <div className="container-fluid">
            <div className="container">
                <section className="vh-100">
                    <div className="container-fluid h-custom">
                        <div className="row d-flex justify-content-center align-items-center h-100">
                            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setName(e.target.value)}
                                        value={name}
                                        placeholder="Type name of product"
                                        label="Name product"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setprice(e.target.value)}
                                        value={price}
                                        placeholder="Type your price"
                                        label="price"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setOldprice(e.target.value)}
                                        value={oldprice}
                                        placeholder="Type price"
                                        label="Old Price"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBFile label="Image" id="customFile" onChange={handleImage} />
                                </MDBValidationItem>

                                <select
                                    name="typeProduct"
                                    id="type"
                                    onChange={(e) => {
                                        setTypeProduct(e.target.value);
                                        console.log(e.target.value);
                                    }}
                                >
                                    <option disabled selected hidden>
                                        Phân loại
                                    </option>
                                    {listType.map((type, index) => {
                                        return (
                                            <option value={type.value} key={index}>
                                                {type.label}
                                            </option>
                                        );
                                    })}
                                </select>

                                <select
                                    name="brandProduct"
                                    id="brand"
                                    onChange={(e) => {
                                        setBrand(e.target.value);
                                    }}
                                >
                                    <option disabled selected hidden>
                                        Thương hiệu
                                    </option>
                                    {listBrand.map((type, index) => {
                                        return (
                                            <option value={type.value} key={index}>
                                                {type.label}
                                            </option>
                                        );
                                    })}
                                </select>

                                <CKEditor
                                    editor={ClassicEditor}
                                    data="<p>Hello from CKEditor 5!</p>"
                                    onReady={(editor) => {
                                        // You can store the "editor" and use when it is needed.
                                        console.log('Editor is ready to use!', editor);
                                    }}
                                    onChange={(event, editor) => {
                                        const data = editor.getData();
                                        console.log({ event, editor, data });
                                    }}
                                    onBlur={(event, editor) => {
                                        console.log('Blur.', editor);
                                    }}
                                    onFocus={(event, editor) => {
                                        console.log('Focus.', editor);
                                    }}
                                />
                                <div className="text-center text-lg-start mt-4 pt-2">
                                    <Button className="btn btn-primary btn-lg" onClick={handleCreate}>
                                        Create
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;
