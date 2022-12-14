import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';
import Button from '../Button/index';
import LogoIcon from '../../assets/icon/logoIcon.png';

function Footer() {
    return (
        <MDBFooter bgColor="light" className="text-center text-lg-start text-muted">
            <MDBContainer className="text-center text-md-start mt-2">
                <section className="d-flex justify-content-center justify-content-lg-between py-3 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>

                    <div>
                        <Button href="//www.facebook.com/nmt.3008" target="_blank" className="px-3 text-reset">
                            <MDBIcon fab icon="facebook-f" />
                        </Button>
                        <Button href="https://www.instagram.com/nmt300801/" target="_blank" className="px-3 text-reset">
                            <MDBIcon fab icon="instagram" />
                        </Button>
                        <Button
                            href="https://www.linkedin.com/in/minh-th%C3%A0nh-nguy%E1%BB%85n-a16a57251/"
                            target="_blank"
                            className="px-3 text-reset"
                        >
                            <MDBIcon fab icon="linkedin" />
                        </Button>
                        <Button href="https://github.com/nmt308" target="_blank" className="px-3 text-reset">
                            <MDBIcon fab icon="github" />
                        </Button>
                    </div>
                </section>
            </MDBContainer>

            <section className="">
                <MDBContainer className="text-center text-md-start mt-5">
                    <MDBRow className="mt-3">
                        <MDBCol md="5" lg="5" className="mb-4">
                            <div className="text-uppercase fw-bold mb-4">
                                <img src={LogoIcon} alt="Logo" width={28} height={28} />
                                <span className="ms-2">NowShop Coporation</span>
                            </div>
                            <p>
                                M???i kh??ch h??ng l?? m???t con ng?????i ??? m???t c?? th??? ri??ng bi???t, c???n ???????c t??n tr???ng, quan t??m v??
                                l???ng nghe, th???u hi???u v?? ph???c v??? m???t c??ch ri??ng bi???t. NowShop s??? l?? n??i hi???u ???????c nhu c???u
                                c???a kh??ch h??ng h??n b???t k??? c??ng ty n??o kh??c.
                            </p>
                        </MDBCol>
                        <MDBCol className="col-md-1 col-lg-1 d-none d-sm-none d-md-none d-lg-block mb-4"></MDBCol>
                        <MDBCol md="3" lg="3" className="mx-auto  mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">TRANG KH??C</h6>
                            <p>
                                <a href="#!" className="text-reset">
                                    Ch??nh s??ch
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    ??i???u kho???n
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    H??? tr???
                                </a>
                            </p>
                            <p>
                                <a href="#!" className="text-reset">
                                    Kh??c
                                </a>
                            </p>
                        </MDBCol>

                        <MDBCol md="4" lg="3" className="mx-auto mb-md-0 mb-4">
                            <h6 className="text-uppercase fw-bold mb-4">LI??N H???</h6>
                            <p>
                                <MDBIcon icon="home" className="me-4" />
                                Q.T??n B??nh, TP.H??? Ch?? Minh
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-4" />
                                minhthanh0946@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-4" />+ 84 92 2828 411
                            </p>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>

            <div className="text-center p-3" style={{ backgroundColor: 'var(--primary-color)', color: '#fff' }}>
                ?? 2022 Copyright: Nguy???n Minh Th??nh
            </div>
        </MDBFooter>
    );
}

export default Footer;
