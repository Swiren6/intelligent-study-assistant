// src/components/ui/button.jsx
export function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}


