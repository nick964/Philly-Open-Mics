'use client'; // This makes sure the component runs on the client side

import { useEffect } from "react";
import { uploadOpenMicData } from "../../lib/uploadData"; // Adjust the path as needed

const UploadPage = () => {
  useEffect(() => {
    uploadOpenMicData();
  }, []);

  return <div>Uploading data to Firestore...</div>;
};

export default UploadPage;
