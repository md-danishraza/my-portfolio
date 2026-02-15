import React from "react";
import profile from "./assets/profile.jpg";
import useScrollReveal from "./utils/useScrollReveal";
import ProfileImage from "./components/ProfileImg";
function Hero() {
  useScrollReveal(".hero .info", { origin: "left", delay: 200 });
  useScrollReveal(".hero .img", { origin: "right", delay: 200 });
  return (
    <div className="hero">
      <div className="info">
        <h1>
          Hi,
          <br />
          I'm <span>Md. Danish Raza</span>
          <br />
          Software Developer
        </h1>
        <p>
          Welcome to my portfolio. <br />
          B.Voc. SDE at Ramanujan College, DU. <br />
          Tenacity to learn anything.
          <br />
          JS/TS Full Stack
        </p>
      </div>

      <div className="img">
        {/* <img src={profile} alt="" /> */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="300"
          height="300"
          viewBox="-25 -25 250 250"
          className="float"
        >
          <defs>
            <pattern
              id="image-fill"
              patternUnits="userSpaceOnUse"
              width="250"
              height="250"
            >
              <ProfileImage profile={profile} />
            </pattern>
          </defs>

          <path
            d="M170.99154033856684 29.571304141297347 C155.42555057995793 14.024133687482989 109.78106582288127 -0.9613879852840548 87.84671966320828 0.7412584350609848 C69.96542445713018 2.1292881056119572 35.721964818209656 20.428448060280175 24.504375335873462 34.42248360471916 C11.018347357639174 51.24641491169771 -2.6300234864073717 96.40857118271006 1.553962116860646 117.56068407299355 C6.063393004245198 140.35808354931754 37.67835228721116 180.762295060149 58.54058266616977 191.00064128531898 C77.08587549911653 200.10192745759593 121.68538089702841 197.9848580249006 141.17328737542314 191.13045817234115 C153.0089453822394 186.96755167508314 172.8268094830557 169.7601938339719 180.25952035202755 159.65240475339178 C187.9847373645806 149.14683477480375 199.11661675709703 124.15992413480996 199.37953542778473 111.12240703075011 C199.81479127973176 89.53909535661587 186.26557976129882 44.826877227625566 170.99154033856684 29.571304141297347Z"
            stroke="none"
            fill="url(#image-fill)"
          />
        </svg>
      </div>
    </div>
  );
}

export default Hero;
