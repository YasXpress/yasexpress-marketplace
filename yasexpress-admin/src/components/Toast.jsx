export default function Toast({ toast }) {
  if (!toast) return null;

  return (
    <div className={`toast ${toast.type}`}>
      <div className="toast-content">
        <span className="icon">
          {toast.type === "success" && "✔"}
          {toast.type === "error" && "✖"}
          {toast.type === "warning" && "⚠"}
        </span>

        <span>{toast.message}</span>
      </div>

      <div className="toast-bar"></div>
    </div>
  );
}