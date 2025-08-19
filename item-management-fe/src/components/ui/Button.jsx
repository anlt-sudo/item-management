import { motion } from 'framer-motion';


const variantStyles = {
  primary: {
    backgroundColor: '#2563eb', // blue-600
    color: '#fff',
  },
  secondary: {
    backgroundColor: '#e5e7eb', // gray-200
    color: '#1f2937', // gray-800
  },
  danger: {
    backgroundColor: '#dc2626', // red-600
    color: '#fff',
  },
};

const Button = ({ children, variant = 'primary', loading, style, ...props }) => (
  <motion.button
    whileTap={{ scale: 0.95 }}
    style={{
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontWeight: 600,
      fontSize: '1rem',
      border: 'none',
      outline: 'none',
      opacity: loading ? 0.5 : 1,
      cursor: loading ? 'not-allowed' : 'pointer',
      transition: 'background 0.2s, color 0.2s',
      ...variantStyles[variant],
      ...style,
    }}
    disabled={loading}
    {...props}
  >
    {loading ? <span style={{ marginRight: 8 }}>⏳</span> : null}
    {children}
  </motion.button>
);

export default Button;
