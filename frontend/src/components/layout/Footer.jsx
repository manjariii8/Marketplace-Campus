import { Container } from "../ui";
const Footer = () => {
  return (
    <footer className="border-t bg-white mt-20">
      <Container>
        <div className="py-10 text-center text-slate-500">
          © {new Date().getFullYear()} Marketplace. Built with React + Spring
          Boot.
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
