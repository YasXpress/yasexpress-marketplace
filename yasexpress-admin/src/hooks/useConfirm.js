import { useState } from "react";

export default function useConfirm() {
  const [confirmBox, setConfirmBox] = useState(null);

  // ================= SHOW CONFIRM =================
  const showConfirm = (message, onConfirm) => {
    setConfirmBox({ message, onConfirm });
  };

  // ================= CLOSE CONFIRM =================
  const closeConfirm = () => {
    setConfirmBox(null);
  };

  return {
    confirmBox,
    showConfirm,
    closeConfirm,
  };
}