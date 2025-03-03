'use client'
import React from "react";

const MapComponent = () => {
  return (
    <iframe 
      src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3620.199090069501!2d67.264409!3d24.857049!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3eb3316c5276e35b%3A0x823a6a0100195ffd!2sFAST%20National%20University%20Karachi%20Campus!5e0!3m2!1sen!2sus!4v1740963522897!5m2!1sen!2sus"
      style={{ width: "100%", height: "100%" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
};

export default MapComponent;
