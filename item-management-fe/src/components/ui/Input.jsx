import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, ...props }, ref) => (
  <div className="mb-4">
    {label && <label className="block mb-1 font-medium">{label}</label>}
    <input
      ref={ref}
      className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 ${error ? 'border-red-500' : 'border-gray-300'}`}
      {...props}
    />
    {error && <span className="text-red-500 text-sm">{error}</span>}
  </div>
));

export default Input;
