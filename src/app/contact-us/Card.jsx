"use client";
import Image from "next/image";
import styled from "styled-components";

const Card = ({ name, phone, designation, title, ref }) => {
  return (
    <StyledWrapper>
      <div
        className="e-card rounded-t-md rounded-bl-md rounded-br-3xl playing flex flex-col items-center justify-center"
        ref={ref ? ref : null}
      >
          <div className="image" />
          <div className="wave wave-1" />
          <div className="wave wave-2" />
          <div className="wave wave-3" />
          <div className="infotop relative flex flex-col gap-0 items-center justify-center">
            <Image
              src="/logo.png"
              alt="logo"
              width={70}
              height={70}
              className="block mb-4"
            />
            {title}
            <div className="mt-4 flex flex-col gap-1">
              <p className="name text-gray-200">{name}</p>
              <p className="name text-gray-200">{designation}</p>
              <p className="name text-gray-200">{phone}</p>
            </div>
          </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .e-card {
    margin: 20px auto;
    background: transparent;
    box-shadow: 0px 8px 28px -9px rgba(0, 0, 0, 0.45);
    position: relative;
    width: 240px;
    height: 330px;
    overflow: hidden;
  }

  .wave {
    position: absolute;
    width: 540px;
    height: 700px;
    opacity: 0.6;
    left: 0;
    top: 0;
    margin-left: -50%;
    margin-top: -70%;
    background: linear-gradient(744deg, #ff202a, #f34242 60%, #00ddeb);
  }

  .wave-2 {linear-gradient(744deg, #a10000, #f1199a 60%, #3a86ff)
  }

  .wave-3 {
    background-image: linear-gradient(744deg, #ff0018, #ec3838 60%, #3a86ff);
  }

  .icon {
    width: 3em;
    margin-left: auto;
    margin-right: auto;
  }

  .infotop {
    text-align: center;
    font-size: 20px;
    color: rgb(255, 255, 255);
    font-weight: 600;
  }

  .name {
    font-size: 16px;
    font-weight: normal;
    position: relative;
  }

  .wave:nth-child(2),
  .wave:nth-child(3) {
    top: 210px;
  }

  .playing .wave {
    border-radius: 40%;
    animation: wave 3000ms infinite linear;
  }

  .wave {
    border-radius: 40%;
    animation: wave 55s infinite linear;
  }

  .playing .wave:nth-child(2) {
    animation-duration: 4000ms;
  }

  .wave:nth-child(2) {
    animation-duration: 50s;
  }

  .playing .wave:nth-child(3) {
    animation-duration: 5000ms;
  }

  .wave:nth-child(3) {
    animation-duration: 45s;
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Card;
