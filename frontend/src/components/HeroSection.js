import React from "react";
import "./HeroSection.css";
import { Button } from "./Button";
import { Link } from "react-router-dom";
import ReactImageAppear from "react-image-appear";



 
function HeroSection({
  lightBg,
  topLine,
  lightText,
  lightTextDesc,
  headline,
  description,
  img,
  alt,
  imgStart,
  buttonLabel,
  buttonTo,
  aboutUsRender,
  aboutUsRenderSubButton
}) {
  return (
    <>
      <div
        className={
          lightBg ? "home__hero-section white" : "home__hero-section black"
        }
      >
        <div className="container">
          <div
            className="row home__hero-row"
            style={{
              display: "flex",
              flexDirection: imgStart === "start" ? "row-reverse" : "row",
            }}
          >
            <div className="col">
              <div className="home__hero-text-wrapper">
                <div className="top-line">{topLine}</div>
                <h1 className={lightText ? "heading " : "heading textBlack"}>
                  {headline}
                </h1>
                <p
                  className={
                    lightTextDesc
                      ? "home__hero-subtitle textWhite"
                      : "home__hero-subtitle textBlack"
                  }
                >
                  {description}
                </p>

              

                {/* Check if buttonTo is External URL or not and uses a href or Link, respectively  */}
                {/^https?:\/\//.test(buttonTo)
                ? <a href={buttonTo}>
                    <Button
                      buttonSize="btn--wide"
                      lightBg
                      buttonColor={(lightBg = "msc_orange")}
                >
                  {buttonLabel}
                </Button>
                </a>
                :   <Link to={buttonTo}>
                <Button
                  buttonSize="btn--wide"
                  lightBg
                  buttonColor={((buttonLabel==="Team") ?  "black": "msc_orange" )}
                 >
                  {buttonLabel}
                </Button>
              </Link>
                }
                  {" "}

                {/* dynamic render of AboutUs "Contact Button for scroll down using a href #"  */}
                {aboutUsRender==="Yes"?
                  <Button
                  buttonSize="btn--wide"
                  lightBg
                  buttonColor="black"
                  onClick={function(e) {
                  window.scroll({
                    top: 999999999, 
                    left: 0, 
                    behavior: 'smooth'
                  })   
                }}
                >
                   {aboutUsRenderSubButton}
                </Button>
            
                :
                <p></p>  
                }
              </div>
            </div>
            <div className="col">
              <div className="home__hero-img-wrapper">
                {/*  API: https://github.com/ArunMichaelDsouza/react-image-appear */}
                <ReactImageAppear
                  className="home__hero-img"
                  src={img}
                  alt={alt}
                  animation="fillIn"
                  animationDuration="3s"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HeroSection;
