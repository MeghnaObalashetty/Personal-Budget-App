// FloralBackground.js
import PropTypes from 'prop-types';
import './Background.css';

const Background = ({ children }) => {
  return (
    <div className="background-container">
      <img src="/src/assets/bg.png" alt="Floral Background"className="background-image" />
      {children}
    </div>
  );
};

Background.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Background;
