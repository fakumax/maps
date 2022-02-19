import Navbar from '../Navbar/Navbar';
import FontHeader from './FontHeader';

const LayoutBase = ({ children }) => {
  return (
    <>
      {/* <FontHeader /> */}
      <Navbar />
      <main>{children}</main>
    </>
  );
};

export default LayoutBase;
