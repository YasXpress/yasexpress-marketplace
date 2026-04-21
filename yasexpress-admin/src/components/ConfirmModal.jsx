export default function ConfirmModal({ confirmBox, closeConfirm }) {
  if (!confirmBox) return null;

  return (
    <div className="confirm-overlay">
      <div className="confirm-box">
        <h3>⚠ Confirm Action</h3>

        <p>{confirmBox.message}</p>

        <div className="confirm-actions">
          <button
            className="yes"
            onClick={async () => {
              await confirmBox.onConfirm();
              closeConfirm();
            }}
          >
            Yes, Continue
          </button>

          <button className="no" onClick={closeConfirm}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}