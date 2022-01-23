import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";

const MgSlider = ({ slides, children, width, height, borderRadius }) => {
  const [current, setCurrent] = useState(0);
  const [toggle, setToggle] = useState(false);
  const length = slides.length;
  const timeout = useRef(null);

  useEffect(() => {
    const nextSlide = () => {
      setCurrent(current === length - 1 ? 0 : current + 1);
    };

    timeout.current = setTimeout(nextSlide, 3000);

    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current);
      }
    };
  }, [current, length]);

  const nextSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }

    setCurrent(current === 0 ? length - 1 : current - 1);
  };

  if (!Array.isArray(slides) || slides.length <= 0) {
    return null;
  }

  return (
    <HeroSection
      borderRadius={borderRadius}
      width={width}
      height={height}
      onMouseEnter={() => setToggle(true)}
      onMouseLeave={() => setToggle(false)}
    >
      <HeroWrapper>
        {slides.map((slide, index) => {
          return (
            <HeroSlide key={index}>
              {index === current && (
                <HeroSlider>
                  <HeroImage src={slide.image} alt={slide.alt} />

                  <HeroContent>{children}</HeroContent>
                </HeroSlider>
              )}
            </HeroSlide>
          );
        })}

        <SliderButtons toggle={toggle}>
          <PrevArrow onClick={prevSlide} />
          <NextArrow onClick={nextSlide} />
        </SliderButtons>
      </HeroWrapper>
    </HeroSection>
  );
};

export default MgSlider;

const HeroSection = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: ${({ borderRadius }) => (borderRadius ? borderRadius : "5px")};
  background: lightgray;
  width: ${({ width }) => (width ? width : "250px")};
  height: ${({ height }) => (height ? height : "400px")};
`;

const HeroWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
`;

const HeroSlide = styled.div`
  z-index: 1;
  width: 100%;
  height: 100%;
`;

const HeroSlider = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;

  &::before {
    content: "heloow";
    position: absolute;
    z-index: 2;
    width: 100%;
    height: 100vh;
    bottom: 0;
    left: 0;
    overflow: hidden;
    opacity: 0.4;
    background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 0.3) 0%,
      rgba(0, 0, 0, 0.5) 50%,
      rgba(0, 0, 0, 1) 100%
    );
  }
`;

const HeroImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  flex-direction: column;
`;

const ArrowButtons = css`
  width: 15px;
  height: 15px;
  color: #fff;
  cursor: pointer;
  background: #000d1a;
  border-radius: 50px;
  padding: 10px;
  margin-right: 1rem;
  user-select: none;
  transition: 0.3s;
  &:hover {
    background: #cd853f;
    transform: scale(1.05);
  }
`;

const SliderButtons = styled.div`
  opacity: ${({ toggle }) => (toggle ? 1 : 0)};
  transition: all 0.5s linear;
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
  z-index: 10;
`;
const PrevArrow = styled(IoArrowBack)`
  ${ArrowButtons}
  position: absolute;
  left: 2%;
`;
const NextArrow = styled(IoArrowForward)`
  ${ArrowButtons}
  position: absolute;
  right: -3%;
`;
