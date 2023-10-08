import logo from "../assets/images/logo.svg";
//something wrong with the footer on mobile view
const Footer = () => {
  return (
    <footer className="footer footer-center p-10 text-primary-content border-t-2">
      <div>
        <img src={logo} alt="" />
        <p className="font-bold">
          FiTrack. <br />
          Made by <a href="https://github.com/heylukechen" rel="noreferrer" className="link hover:text-cyan-600" target="_blank"> Luke</a> and <a href="https://github.com/achref95" rel="noreferrer" className="link hover:text-cyan-600" target="_blank"> Ashref</a>
        </p>

        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
