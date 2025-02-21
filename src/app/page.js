import Stats from "@/components/Stats";
import WhatIsDD from "@/components/WhatIsDD";

export default function Home() {
  return (
    <>
      <div className="page-content hero">
        {/* <h1>
          Index <sup>(01)</sup>
        </h1> */}
      </div>
      
      <div className="bg-gradient-to-br from-red-700 to-red-800 ">
        <WhatIsDD />
        <br/>
        <br/>
        <Stats />
      </div>
    </>
  );
}
