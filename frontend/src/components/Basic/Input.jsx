/* eslint-disable react/prop-types */
import "./Input.css";
import { forwardRef } from "react";

export default forwardRef(function Input({ label, textarea, ...props }, ref) {
  return (
    <span className="input-span">
      <label>{label}</label>
      {textarea ? (
        <textarea ref={ref} {...props} />
      ) : (
        <input ref={ref} {...props} />
      )}
    </span>
  );
});
