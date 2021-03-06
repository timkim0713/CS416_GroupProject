import React, { useState, useEffect } from "react";
import Axios from "axios";
import Footer from "../../components/footer/Footer";
import ImageGallery from "react-image-gallery";
import "./ProductDetailPage.css";
import { Card } from "antd";
import renderImages from "../../components/collections/RotatingImage";
import Rotation from "react-rotation";
import "../../components/collections/RotatingImage.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import PurchaseInquiryModal from "../../components/inquiry/PurchaseInquiry";
import Moment from "react-moment";
import { MdRemoveRedEye } from "react-icons/md";
import NumberFormat from "react-number-format";
import sbu from "../../images/sbu3.png";
import fit from "../../images/fit3.png";
import { mugcup_1, mugcup_2, sample } from "../Collections/DataRotatingImages";
const { Meta } = Card;

const axios = require("axios");

const schoolMapping = (school_id) => {
  if (school_id === 0) {
    return "None";
  } else if (school_id === 1) {
    return sbu;
  } else if (school_id === 2) {
    return fit;
  } else {
    return "ERR";
  }
};

const typeMapping = (type_id) => {
  if (type_id === 0) {
    return "None";
  } else if (type_id === 1) {
    return "Goods";
  } else if (type_id === 2) {
    return "Apparel";
  } else {
    return "ERR";
  }
};

let has360View;
let api360ViewUrl;
function ProductDetailPage(props) {
  const cProductID = props.match.params.id; // the id of this product  11.25.2020 has only 2 in the backend data

  const [productData, setData] = useState({});
  const [hasCatalogDisplayID, setHasCatalogDisplayID] = useState();
  const [hasCatalogDisplayBoolean, setHasCatalogDisplayBoolean] = useState();

  const apiBaseUrl =
    "https://sunyk-msc-backend.herokuapp.com/collection/item/get/" +
    cProductID +
    "/";

  const apiHas360ViewUrl =
    "https://sunyk-msc-backend.herokuapp.com/collection/item/get/collection/item/" +
    cProductID +
    "/catalog_display/has/";

  const api360ViewImagesUrl =
    "https://sunyk-msc-backend.herokuapp.com/catalog_display/" +
    hasCatalogDisplayID +
    "/images/get_all/";
  api360ViewUrl = api360ViewImagesUrl;
  // product details
  useEffect(() => {
    axios
      .get(apiBaseUrl)
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.res_code == 1) {
            console.log(
              "Successfully fetched product id " + cProductID,
              response.data.res_msg
            );
            setData(response.data.collection_item);
          } else {
            console.log(
              "unhandled res_code error from get collection. Please contact an admin."
            );
          }
        } else {
          console.log(
            "unhandled response status get collection. Please contact an admin."
          );
        }
      })
      .catch(function (error) {
        console.log("code 0 " + error);

        console.log("unhandled error from get collection. Please contact an admin.");
      });
  }, []);

  // fetching whether the product has 360 degree view or not, No 360 means ID = -1 , otherwise ID exists.
  useEffect(() => {
    axios
      .get(apiHas360ViewUrl)
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.res_code == 1) {
            console.log(
              "Successfully fetched whether the product has catalog display or not: product id:" +
              cProductID,
              response.data.res_msg
            );
            setHasCatalogDisplayID(response.data.cd_id);
            setHasCatalogDisplayBoolean(response.data.has);
            has360View = response.daa.has;
          } else {
            console.log(
              "unhandled res_code error from catalog display. Please contact an admin."
            );
          }
        } else {
          console.log(
            "unhandled response status  catalog display. Please contact an admin."
          );
        }
      })
      .catch(function (error) {
        console.log("code 0 " + error);

        console.log("unhandled error from catalog display. Please contact an admin.");
      });
  }, []);

  console.log(productData);
  console.log(hasCatalogDisplayID);

  const [
    PurchaseInquiryModalShow,
    setPurchaseInquiryModalShow,
  ] = React.useState(false);
  const [RotatingImageModalShow, setRotatingImageModalShow] = React.useState(
    false
  );

  const images = [
    {
      original: productData["gallery_img1"],
      thumbnail: productData["gallery_img1"],
    },
    {
      original: productData["gallery_img2"],
      thumbnail: productData["gallery_img2"],
    },
    {
      original: productData["gallery_img3"],
      thumbnail: productData["gallery_img3"],
    },
    {
      original: productData["gallery_img4"],
      thumbnail: productData["gallery_img4"],
    },
    {
      original: productData["gallery_img5"],
      thumbnail: productData["gallery_img5"],
    },
    {
      original: productData["gallery_img6"],
      thumbnail: productData["gallery_img6"],
    },
  ];

  return (
    <div className="details-container">
      <h1 style={{ display: "flex", justifyContent: "center", margin: "4%" }}>
        {" "}
      </h1>

      <RotatingImageModal
        //pass data to  modal using props...
        id={cProductID}
        show={RotatingImageModalShow}
        onHide={() => setRotatingImageModalShow(false)}
      />

      <div className="row" align="center">
        <div className="col-sm-1"></div>
        <div className="col-sm-5">
          <ImageGallery lazyLoad={true} items={images} />
          <div className="rotating-images-modal">
            {hasCatalogDisplayBoolean ? ( //button for 360 degree view if it is available.
              <Button
                variant="dark"
                size="lg"
                onClick={() => setRotatingImageModalShow(true)}
              >
                Launch 360 Degree View
              </Button>
            ) : (
                <p>360 Degree View Not Available</p> //else a text
              )}
          </div>
        </div>

        <div className="col-sm-1"></div>
        <div className="col-sm-4">
          <Card
            title={productData["name"]}
            extra={
              <Button
                className="make-inquiry"
                variant="dark"
                buttonStyle="btn--outline"
                onClick={() => setPurchaseInquiryModalShow(true)}
              >
                Purchase Inquiry
              </Button>
            }
          >
            {" "}
            <br />
            <div className="row">
              <div className="col-sm-1"></div>
              <div className="col-sm-3 text-left">
                <div className="product-price">
                  <NumberFormat
                    value={productData["price"]}
                    displayType={"text"}
                    thousandSeparator={true}
                    prefix={"₩"}
                  />
                </div>
                <br />
                <br />

                <div className="product-school">
                  <img
                    className="product-school-img"
                    src={schoolMapping(productData["school_id"])}
                  />
                </div>
                <br></br>
                <div className="product-type">
                  <br></br>
                  {typeMapping(productData["type_id"])}
                </div>

                <br />
                <br />

                <div className="product-click-count">
                  <MdRemoveRedEye style={{ paddingRight: "2px" }} />{" "}
                  {productData["click_count"]}
                </div>
                <br />
              </div>
              <div className="col-sm-1"></div>

              <div className="col-sm-7 text-left">
                <div className="product-description">{productData["desc"]}</div>
              </div>
            </div>
          </Card>
          <div className="col-sm-1"></div>
        </div>
      </div>
      {/* 
      pass values as props to the modal */}
      <PurchaseInquiryModal
        show={PurchaseInquiryModalShow}
        onHide={() => setPurchaseInquiryModalShow(false)}
        productID={cProductID}
        productName={productData["name"]}
        productPrice={productData["price"]}
        productSchool={schoolMapping(productData["school_id"])}
        productType={typeMapping(productData["type_id"])}
        productDescription={productData["desc"]}
        productDate={productData["create_date"]}
        productClickCount={productData["click_count"]}
        productCoverImage={productData["main_img"]}
      />
      <Footer />
    </div>
  );
}

function RotatingImageModal(props) {
  const [catalogDisplayImages, setCatalogDisplayImages] = useState([{}]);
  useEffect(() => {
    axios
      .get(api360ViewUrl)
      .then(function (response) {
        if (response.status == 200) {
          if (response.data.res_code == 1) {
            console.log(
              "Successfully fetched 360 Degree Images with c_id " +
              response.data.res_msg
            );
            setCatalogDisplayImages(response.data.results);
          } else {
            console.log(
              "rescode other than 1. Catalog Display may not be available, or it has some other error."
            );
          }
        } else {
          console.log(
            "unhandled response status from loading catalog display images. Please contact an admin."
          );
        }
      })
      .catch(function (error) {
        console.log("code 0 " + error);
        console.log(
          "unhandled error from loading catalog display images. Please contact an admin."
        );
      });
  }, []);
  const id = props.id;
  //pass data from product using props...
  return (
    <Modal
      {...props}
      style={{ opacity: 1 }}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          360 Degree View
        </Modal.Title>
      </Modal.Header>
      <Modal.Body align="center">
        <Card
          style={{ width: "60%", height: "100%" }}
          cover={
            <Rotation
              autoPlay={false}
              cycle={true}
              scroll={false}
              className="rotating-image"
            >
              {catalogDisplayImages.map(renderImages)}
            </Rotation>
          }
        >
          {" "}
          <Meta
            title={"Product ID is " + id}
            description="Drag around the see different angles"
          />
        </Card>
      </Modal.Body>
    </Modal>
  );
}
export default ProductDetailPage;
