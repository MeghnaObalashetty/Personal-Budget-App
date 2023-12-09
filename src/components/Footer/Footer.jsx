import styled from 'styled-components';

const CustomFooter = styled.footer`
  background-color: #CC8899;
  color: white;
  padding: 30px;
  text-align: center;   
  position: fixed; /* Fixed position keeps it at the bottom */
  left: 0;
  bottom: 0;
  width: 100%;
  margin-top: auto;`;

const Footer = () => {
  return (
    /* used aria-label to increase the accessibility */
    <CustomFooter aria-label="Footer">
      &copy; {new Date().getFullYear()} My Personal Budget. All Rights Reserved.
    </CustomFooter>
  );
};

export default Footer;