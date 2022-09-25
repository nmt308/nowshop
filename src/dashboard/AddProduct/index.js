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
function AddProduct() {
    const [name, setName] = useState('');
    const [priece, setPriece] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);

    const type = ['image/png', 'image/jpeg', 'image/PNG', 'image/JPG', 'image/jpg'];
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
                    priece,
                    description,
                    url,
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
                                        onChange={(e) => setPriece(e.target.value)}
                                        value={priece}
                                        placeholder="Type your priece"
                                        label="Priece"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBInput
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description}
                                        placeholder="Detail about product"
                                        label="Description"
                                        className="form-control-lg"
                                    />
                                </MDBValidationItem>

                                <MDBValidationItem className="col-md-12 mb-4">
                                    <MDBFile label="Image" id="customFile" onChange={handleImage} />
                                </MDBValidationItem>
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
