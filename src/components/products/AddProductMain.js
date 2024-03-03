import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { PRODUCT_CREATE_RESET } from "../../Redux/Constants/ProductConstants";
import { createProduct } from "./../../Redux/Actions/ProductActions";
import Toast from "../LoadingError/Toast";
import Message from "../LoadingError/Error";
import Loading from "../LoadingError/Loading";
import { v4 as uuidv4 } from 'uuid';
import {colorOptions, colorNames} from "./colors";
import { ChromePicker } from 'react-color';
import convert from 'color-convert';

const generateUniqueSKU = () => {
  return `${uuidv4()}`;
};

const ToastObjects = {
  pauseOnFocusLoss: false,
  draggable: false,
  pauseOnHover: false,
  autoClose: 2000,
};
const AddProductMain = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState();
  const [image, setImage] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");
  const [additionalImages, setAdditionalImages] = useState([{ url: '' }]);
  const [priceOff, setPriceOff] = useState(0);
  const [onSale, setOnSale] = useState(false);
  const [category, setCategory] = useState('Pents');
  const [additionalColors, setAdditionalColors] = useState([]);
  const [mainColor, setMainColor] = useState('Red');
  const [dressType, setDressType] = useState('Abaya');
  const [mainDressSize, setMainDressSize] = useState('XXS');
  const [dressSize, setDressSize] = useState([]);
  const [dressStyle, setDressStyle] = useState('Work');
  const [patternType, setPatternType] = useState('Plain');
  const [dressLength, setDressLength] = useState('Short');
  const [material, setMaterial] = useState('Cotton');
  const [sleeveLength, setSleeveLength] = useState('Long Sleeve');

  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const { loading, error, product } = productCreate;

  useEffect(() => {
    if (product) {
      toast.success("Product Added", ToastObjects);
      dispatch({ type: PRODUCT_CREATE_RESET });
      setName("");
      setDescription("");
      setCountInStock(0);
      setImage("");
      setPrice(0);
      setAdditionalImages([{ url: '' }]);
      setPriceOff(0);
      setOnSale(false);
      setCategory("");
      setDressType('');
      setMainDressSize('');
      setDressSize([]);
      setDressStyle('');
      setPatternType('');
      setDressLength('');
      setMaterial('');
      setSleeveLength('');
      setMainColor('');
      setAdditionalColors([]);
    }
  }, [product, dispatch]);

// checkboxes for selecting additional dress sizes
const handleSizeChange = (e) => {
  const value = e.target.value;
  if (dressSize.includes(value)) {
    setDressSize(dressSize.filter(size => size !== value));
  } else {
    setDressSize([...dressSize, value]);
  }
};
// Add additional images
const handleAddImage = (e) => {
  e.preventDefault();
  setAdditionalImages([...additionalImages, { url: '' }]);
};
const handleImageChange = (index, value) => {
  const updatedImages = [...additionalImages];
  updatedImages[index] = {url: value};
  setAdditionalImages(updatedImages);
};
// handle additional colors
const handleColorChange = (colorCode) => {
  if (additionalColors.includes(colorCode)) {
    setAdditionalColors(additionalColors.filter((c) => c !== colorCode));
  } else {
    setAdditionalColors([...additionalColors, colorCode]);
  }
};
const colorStyles = {};
colorOptions.forEach((color) => {
  colorStyles[color] = { backgroundColor: color };
});
const handleChange = (newColor) => {
    // Convert HEX to RGB
    const rgb = convert.hex.rgb(newColor.hex);

    // Find the closest color name
    const closestColor = convert.rgb.keyword(rgb);
    const capitalizedColor = closestColor.charAt(0).toUpperCase() + closestColor.slice(1);

  setMainColor(capitalizedColor);
};
  const submitHandler = (e) => {
    e.preventDefault();
    const selectedColorNames = colorOptions
      .filter((colorCode) => additionalColors.includes(colorCode))
      .map((selectedColorCode) => colorNames[colorOptions.indexOf(selectedColorCode)]);

    const imageURLs = additionalImages.map((image) => image.url);
    const SKU = generateUniqueSKU();
    dispatch(
      createProduct(
        name,
        price,
        description,
        image,
        countInStock,
        imageURLs,
        SKU,
        priceOff,
        onSale,
        category,
        dressType,
        mainDressSize,
        dressSize,
        dressStyle,
        patternType,
        dressLength,
        material, 
        sleeveLength,
        mainColor,
        selectedColorNames,
        )
    );
  };

  return (
    <>
      <Toast />
      <section className="content-main" style={{ maxWidth: "1200px" }}>
        <form onSubmit={submitHandler}>
          <div className="content-header">
            <Link to="/products" className="btn btn-danger text-white">
              Go to products
            </Link>
            <h2 className="content-title">Add product</h2>
            <div>
              <button type="submit" className="btn btn-primary">
                Publish now
              </button>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-xl-12 col-lg-12">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  {error && <Message variant="alert-danger">{error}</Message>}
                  {loading && <Loading />}
                  {/* Product title and on sale*/}
                  <div className="row mb-2">
                    <div className="col-md-6 col-lg-6">
                      <div className="input-group input-group-sm">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-sm"
                          >
                            Product Title<span className="text-danger">*</span>
                          </span>
                        </div>
                        <input
                          type="text"
                          placeholder="Type here"
                          className="form-control"
                          id="product_title"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                    </div>
                    {/* Price */}
                    <div className="col-md-4 col-lg-4">
                      <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-sm"
                          >
                            Price <span className="text-danger">*</span>
                          </span>
                        </div>
                        <input
                          type="number"
                          placeholder="0.0"
                          className="form-control"
                          id="product_price"
                          required
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
                    </div>
                    {/* OnSale */}
                    <div className="col-md-2 col-lg-2 mt-1">
                      <div className="input-group mb-3">
                        <div className="input-group-prepend">
                          <div className="input-group-text">
                            <input
                              type="checkbox"
                              aria-label="Checkbox for following text input"
                              id="product_onSale"
                              checked={onSale}
                              onChange={() => setOnSale(!onSale)}
                            />
                          </div>
                        </div>
                        On Sale
                      </div>
                    </div>
                  </div>
                  {/* price off, stock, Category */}
                  <div className="row mb-2">
                    <div className="col">
                      <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-sm"
                          >
                            Price Off
                          </span>
                        </div>
                        <input
                          type="number"
                          placeholder="Enter Price Off"
                          className="form-control"
                          id="product_priceOff"
                          value={priceOff}
                          onChange={(e) => setPriceOff(e.target.value)}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
                    </div>
                    <div className="col">
                      <div className="input-group input-group-sm mb-3">
                        <div className="input-group-prepend">
                          <span
                            className="input-group-text"
                            id="inputGroup-sizing-sm"
                          >
                            Count in Stock
                          </span>
                        </div>
                        <input
                          type="number"
                          placeholder="Type here"
                          className="form-control"
                          id="product_price"
                          required
                          value={countInStock}
                          onChange={(e) => setCountInStock(e.target.value)}
                          aria-label="Small"
                          aria-describedby="inputGroup-sizing-sm"
                        />
                      </div>
                    </div>
                    {/* Dress Category */}
                    <div className="col">
                      <div className="input-group mb-2">
                        <div className="input-group-prepend">
                          <label
                            className="input-group-text"
                            for="inputGroupSelect07"
                          >
                            Category{" "}
                          </label>
                        </div>
                        <select
                          className="form-select"
                          id="inputGroupSelect07"
                          value={category}
                          onChange={(e) => setCategory(e.target.value)}
                        >
                          <option value="Pents">Pents</option>
                          <option value="Pajamas">Pajamas</option>
                          <option value="Shalwar Kamiz">Shalwar Kamiz</option>
                          <option value="Kurta">Kurta</option>
                          <option value="Shirts">Shirts</option>
                          <option value="Coat">Coat</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  {/* Dress type,Style,Size */}
                  <div className="mb-2">
                    <div className="row">
                      {/* dressType */}
                      <div className="col">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              for="inputGroupSelect81"
                            >
                              Type
                            </label>
                          </div>
                          <select
                            id="inputGroupSelect81"
                            className="form-select"
                            value={dressType}
                            onChange={(e) => setDressType(e.target.value)}
                          >
                            <option value="Abaya">Abaya</option>
                            <option value="A Line">A Line</option>
                            <option value="Arabian Dress">Arabian Dress</option>
                            <option value="Babydolls">Babydolls</option>
                            <option value="Biker">Biker</option>
                            <option value="Biker Shorts">Biker Shorts</option>
                            <option value="Bikinis">Bikinis</option>
                            <option value="Bodysuits">Bodysuits</option>
                            <option value="Bomber">Bomber</option>
                            <option value="Bottoms">Bottoms</option>
                            <option value="Cagro Pants">Cagro Pants</option>
                            <option value="Cami">Cami</option>
                            <option value="Cardigan">Cardigan</option>
                            <option value="Cape">Cape</option>
                            <option value="Dress">Dress</option>
                            <option value="Dress Sets">Dress Sets</option>
                            <option value="Dressing Gown">Dressing Gown</option>
                            <option value="Fitted">Fitted</option>
                            <option value="Fit and Flare">Fit and Flare</option>
                            <option value="Flare Leg">Flare Leg</option>
                            <option value="Flared">Flared</option>
                            <option value="Harem/Genie">Harem/Genie</option>
                            <option value="Halter">Halter</option>
                            <option value="Half Placket">Half Placket</option>
                            <option value="Jogger">Jogger</option>
                            <option value="Jumpsuit">Jumpsuit</option>
                            <option value="Kaftan">Kaftan</option>
                            <option value="Layered/Tiered">
                              Layered/Tiered
                            </option>
                            <option value="Leggings">Leggings</option>
                            <option value="Mermaid">Mermaid</option>
                            <option value="Nightgowns">Nightgowns</option>
                            <option value="Nursing">Nursing</option>
                            <option value="One Pieces & Monokinis">
                              One Pieces & Monokinis
                            </option>
                            <option value="Overall">Overall</option>
                            <option value="Pajama Bottoms">
                              Pajama Bottoms
                            </option>
                            <option value="Pajama Tops">Pajama Tops</option>
                            <option value="Pant Sets">Pant Sets</option>
                            <option value="Parachute">Parachute</option>
                            <option value="Pea Coat">Pea Coat</option>
                            <option value="Peplum">Peplum</option>
                            <option value="Pencil">Pencil</option>
                            <option value="Pleated">Pleated</option>
                            <option value="Poncho">Poncho</option>
                            <option value="Puffer">Puffer</option>
                            <option value="Pullovers">Pullovers</option>
                            <option value="Quilted">Quilted</option>
                            <option value="Regular">Regular</option>
                            <option value="Robe Sets">Robe Sets</option>
                            <option value="Robes">Robes</option>
                            <option value="Seamless">Seamless</option>
                            <option value="Sheath">Sheath</option>
                            <option value="Shacket">Shacket</option>
                            <option value="Shirt">Shirt</option>
                            <option value="Shorts">Shorts</option>
                            <option value="Shorts Sets">Shorts Sets</option>
                            <option value="Skirt">Skirt</option>
                            <option value="Skort">Skort</option>
                            <option value="Sleepshirts">Sleepshirts</option>
                            <option value="Slip Dress">Slip Dress</option>
                            <option value="Smock">Smock</option>
                            <option value="Straight">Straight</option>
                            <option value="Straight Leg">Straight Leg</option>
                            <option value="Sweatpants">Sweatpants</option>
                            <option value="Sweatshirt">Sweatshirt</option>
                            <option value="Tank">Tank</option>
                            <option value="Tankinis">Tankinis</option>
                            <option value="Teddy">Teddy</option>
                            <option value="Tee">Tee</option>
                            <option value="Top">Top</option>
                            <option value="Tops">Tops</option>
                            <option value="Track Shorts">Track Shorts</option>
                            <option value="Trapered/Carrot">
                              Trapered/Carrot
                            </option>
                            <option value="Tube">Tube</option>
                            <option value="Tunic">Tunic</option>
                            <option value="Unitard">Unitard</option>
                            <option value="Varsity">Varsity</option>
                            <option value="Vest">Vest</option>
                            <option value="Wide Leg">Wide Leg</option>
                            <option value="Wide Strap">Wide Strap</option>
                            <option value="Windbreaker">Windbreaker</option>
                            <option value="Wrap">Wrap</option>
                            <option value="Zip Up">Zip Up</option>
                          </select>
                        </div>
                      </div>
                      {/* Dress Style */}
                      <div className="col">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              for="inputGroupSelect71"
                            >
                              Style
                            </label>
                          </div>
                          <select
                            id="inputGroupSelect71"
                            className="form-select"
                            value={dressStyle}
                            onChange={(e) => setDressStyle(e.target.value)}
                          >
                            <option value="Work">Work</option>
                            <option value="Casual">Casual</option>
                            <option value="Elegant">Elegant</option>
                            <option value="Boho">Boho</option>
                            <option value="Cute">Cute</option>
                            <option value="Modest">Modest</option>
                            <option value="Vintage">Vintage</option>
                            <option value="Street">Street</option>
                            <option value="Party">Party</option>
                            <option value="Romantic">Romantic</option>
                            <option value="Casual-Woman">Casual-Woman</option>
                            <option value="Gorgeous-Luxury">
                              Gorgeous-Luxury
                            </option>
                            <option value="Casual-Young">Casual-Young</option>
                          </select>
                        </div>
                      </div>
                      {/* Dress Size */}
                      <div className="col">
                        <div className="input-group mb-3">
                          <div className="input-group-prepend">
                            <label
                              className="input-group-text"
                              for="inputGroupSelect15"
                            >
                              Main Size
                            </label>
                          </div>
                          <select
                            id="inputGroupSelect15"
                            className="form-select"
                            value={mainDressSize}
                            onChange={(e) => setMainDressSize(e.target.value)}
                          >
                            <option value="XXS">XXS</option>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="XXL">XXL</option>
                            <option value="One Size">One Size</option>
                            <option value="Regular">Regular</option>
                            <option value="Maternity">Maternity</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* additional size, sleeve, pattern, material, dressLength */}
                  <div className="row mt-2">
                    {/* row nested in columns  */}
                    <div className="col-8">
                      <div className="row">
                        {/* sleeveLength */}
                        <div className="col">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label
                                className="input-group-text"
                                for="inputGroupSelect31"
                              >
                                Sleeve Length
                              </label>
                            </div>
                            <select
                              className="form-select"
                              value={sleeveLength}
                              onChange={(e) => setSleeveLength(e.target.value)}
                              id="inputGroupSelect31"
                            >
                              <option value="Long Sleeve">Long Sleeve</option>
                              <option value="Short Sleeve">Short Sleeve</option>
                              <option value="Half Sleeve">Half Sleeve</option>
                              <option value="Sleeveless">Sleeveless</option>
                            </select>
                          </div>
                        </div>
                        {/* Pattern Type */}
                        <div className="col">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label
                                className="input-group-text"
                                for="inputGroupSelect11"
                              >
                                Pattern
                              </label>
                            </div>
                            <select
                              className="form-select"
                              value={patternType}
                              onChange={(e) => setPatternType(e.target.value)}
                              id="inputGroupSelect11"
                            >
                              <option value="Plain">Plain</option>
                              <option value="Heart">Heart</option>
                              <option value="Floral">Floral</option>
                              <option value="Letter">Letter</option>
                              <option value="Colorblock">Colorblock</option>
                              <option value="Striped">Striped</option>
                              <option value="Cartoon">Cartoon</option>
                              <option value="Pliad">Pliad</option>
                              <option value="Leopard Print">
                                Leopard Print
                              </option>
                              <option value="Graphic">Graphic</option>
                              <option value="Polka Dot">Polka Dot</option>
                              <option value="Animal">Animal</option>
                              <option value="Slogan">Slogan</option>
                              <option value="All Over Print">
                                All Over Print
                              </option>
                              <option value="Ditsy Floral">Ditsy Floral</option>
                              <option value="Landscape Print">
                                Landscape Print
                              </option>
                              <option value="Fruit&Vegatable">
                                Fruit&Vegatable
                              </option>
                              <option value="Tie Dye">Tie Dye</option>
                              <option value="Tropical">Tropical</option>
                              <option value="Plants">Plants</option>
                              <option value="Geometric">Geometric</option>
                              <option value="Zebra Stripe">Zebra Stripe</option>
                              <option value="Crocodile Print">
                                Crocodile Print
                              </option>
                              <option value="Figure">Figure</option>
                              <option value="Marble">Marble</option>
                              <option value="Paisley">Paisley</option>
                              <option value="Galaxy">Galaxy</option>
                              <option value="Houndstooth">Houndstooth</option>
                              <option value="Ombre">Ombre</option>
                              <option value="Tribal">Tribal</option>
                              <option value="Flamingo">Flamingo</option>
                              <option value="Butterfly">Butterfly</option>
                              <option value="Patchwork">Patchwork</option>
                              <option value="Christmas">Christmas</option>
                              <option value="Dinosaur">Dinosaur</option>
                              <option value="Snakeskin Print">
                                Snakeskin Print
                              </option>
                              <option value="Camo">Camo</option>
                              <option value="Rainbow Stripe">
                                Rainbow Stripe
                              </option>
                              <option value="Fish Scales">Fish Scales</option>
                              <option value="Halloween">Halloween</option>
                              <option value="Pop Art Print">
                                Pop Art Print
                              </option>
                              <option value="Scarf Print">Scarf Print</option>
                              <option value="Chain Print">Chain Print</option>
                              <option value="Fire">Fire</option>
                              <option value="Chevron">Chevron</option>
                              <option value="Car">Car</option>
                              <option value="Random Print">Random Print</option>
                              <option value="Baroque">Baroque</option>
                              <option value="Tartan">Tartan</option>
                              <option value="Flag">Flag</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-3">
                        {/* Dress Length */}
                        <div className="col">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label
                                className="input-group-text"
                                for="inputGroupSelect12"
                              >
                                Length
                              </label>
                            </div>
                            <select
                              id="inputGroupSelect12"
                              className="form-select"
                              value={dressLength}
                              onChange={(e) => setDressLength(e.target.value)}
                            >
                              <option value="Short">Short</option>
                              <option value="Mini">Mini</option>
                              <option value="Maxi">Maxi</option>
                              <option value="Long">Long</option>
                              <option value="Regular">Regular</option>
                              <option value="Crop">Crop</option>
                              <option value="Midi">Midi</option>
                              <option value="Knee Length">Knee Length</option>
                              <option value="Cropped">Cropped</option>
                              <option value="Capris">Capris</option>
                              <option value="Mid-Calf">Mid-Calf</option>
                              <option value="Thigh Length">Thigh Length</option>
                              <option value="Micro Crop">Micro Crop</option>
                              <option value="Mini Shorts">Mini Shorts</option>
                              <option value="Bermuda shorts">
                                Bermuda shorts
                              </option>
                              <option value="Extra Long">Extra Long</option>
                            </select>
                          </div>
                        </div>
                        {/* Dress Material */}
                        <div className="col">
                          <div className="input-group mb-3">
                            <div className="input-group-prepend">
                              <label
                                className="input-group-text"
                                for="inputGroupSelect13"
                              >
                                Material
                              </label>
                            </div>
                            <select
                              className="form-select"
                              value={material}
                              onChange={(e) => setMaterial(e.target.value)}
                              id="inputGroupSelect13"
                            >
                              <option value="Cotton">Cotton</option>
                              <option value="Pu Leather">Pu Leather</option>
                              <option value="Chiffon">Chiffon</option>
                              <option value="Lace">Lace</option>
                              <option value="Linen">Linen</option>
                              <option value="Silk">Silk</option>
                              <option value="Polyester">Polyester</option>
                              <option value="Satin">Satin</option>
                              <option value="Mesh">Mesh</option>
                              <option value="Viscose">Viscose</option>
                              <option value="Denim">Denim</option>
                              <option value="Nylon">Nylon</option>
                              <option value="Velvet">Velvet</option>
                              <option value="Sequins">Sequins</option>
                              <option value="Corduory">Corduory</option>
                              <option value="Glitter">Glitter</option>
                              <option value="Wool-Like Fabric">
                                Wool-Like Fabric
                              </option>
                              <option value="Polyamide">Polyamide</option>
                              <option value="Tweed">Tweed</option>
                              <option value="Metallic">Metallic</option>
                              <option value="Organza">Organza</option>
                              <option value="Suedette">Suedette</option>
                            </select>
                          </div>
                        </div>
                      </div>
                      <hr></hr>
                    </div>
                    {/* Additioanl Dress sizes */}
                    <div className="col-4 mb-3">
                      <label
                        htmlFor="product_addDressSize"
                        className="form-label"
                      >
                        Additional Sizes <span className="text-danger">*</span>
                        <p className = "text-success" style={{ fontSize: '10px' }}>If no additional sizes, then select the Main size Value </p>
                      </label>
                      <div
                        style={{
                          border: "1px solid #ccc",
                          padding: "10px",
                          borderRadius: "5px",
                        }}
                      >
                        {[
                          "XXS",
                          "XS",
                          "S",
                          "M",
                          "L",
                          "XL",
                          "XXL",
                          "One Size",
                          "Regular",
                        ].map((size) => (
                          <div
                            key={size}
                            className="form-check form-check-inline"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`size_${size}`}
                              value={size}
                              
                              checked={dressSize.includes(size)}
                              onChange={handleSizeChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`size_${size}`}
                            >
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Discription */}
                  <div className="row mb-4">
                    <div className="col">
                      <label className="form-label">Description</label>
                      <span className="text-danger">*</span>
                      <textarea
                        placeholder="Type here"
                        className="form-control"
                        rows="12"
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    {/* Main color */}
                    <div className="col">
                      <label htmlFor="product_color" className="form-label">
                       Main Color <span className="text-danger">*</span>
                       <span className = "text-success" style={{ fontSize: '10px' }}>If left blank, then the default "BLACK" color will be selected automatically. Use HEX value only </span>
                      </label>
                      <ChromePicker color={mainColor} onChange={handleChange} />
                      <div style={{ marginTop: "10px" }}>
                        Selected Color:{" "}
                        <span
                          style={{
                            backgroundColor: mainColor,
                            width: "20px",
                            height: "20px",
                            display: "inline-block",
                            marginLeft: "10px",
                          }}
                        ></span>
                      </div>
                    </div>
                    {/* additional colors */}
                    <div className="col">
                      <label className="form-label">Additional Colors</label>
                      <p className = "text-success" style={{ fontSize: '10px' }}>If no additional colors, then select the Main Color Value </p>
                      <div>
                        {colorOptions.map((colorCode, index) => (
                          <div
                            key={index}
                            className="form-check form-check-inline"
                          >
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={`color_${index}`}
                              value={colorNames[index]}
                              checked={additionalColors.includes(colorCode)}
                              onChange={() => handleColorChange(colorCode)}
                              style={colorStyles[colorCode]}
                            />
                            <label
                              className="form-check-label"
                              htmlFor={`color_${index}`}
                              style={{ marginLeft: "5px" }}
                            >
                              {colorNames[index]}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {/* Single Image */}
                  <div className="mb-4">
                    <label className="form-label">Images</label>
                    <span className="text-danger">*</span>
                    <input
                      className="form-control"
                      type="text"
                      placeholder="Enter Image URL"
                      value={image}
                      required
                      onChange={(e) => setImage(e.target.value)}
                    />
                    {/* <input className="form-control mt-3" type="file" /> */}
                  </div>
                  {/* additional images */}
                  <div className="mb-4">
                    <label className="form-label">Additional Images</label>
                    <p className = "text-success" style={{ fontSize: '10px' }}>Atleast 1 additional image is mandatory</p>
                    {additionalImages.map((image, index) => (
                      <div key={index} className="mb-2">
                        <input
                          className="form-control"
                          type="text"
                          placeholder="Enter Image URL"
                          value={image.url}
                          
                          onChange={(e) =>
                            handleImageChange(index, e.target.value)
                          }
                        />
                      </div>
                    ))}
                    <button
                      className="btn btn-secondary"
                      onClick={handleAddImage}
                    >
                      + Add Image
                    </button>
                  </div>
                  {/* END additional images */}
                </div>
              </div>
            </div>
          </div>
        </form>
      </section>
    </>
  );
};

export default AddProductMain;
