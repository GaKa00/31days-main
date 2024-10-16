//@ts-nocheck
import React from "react";
import styles from "../app/Modal.module.css"; // Import the styles
import {
  Dialog,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Alert } from "@/components/ui/alert"; // Assuming you have an Alert component

const MovieModal = ({
  open,
  onClose,
  movieInfo,
  onFinished,
  onAlreadySeen,
  warningMessage,
  loadingModal,
}) => {
  console.log("Movie Info in Modal:", movieInfo); // Log to confirm movieInfo is received

  if (!movieInfo) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <div className={styles.modalOverlay} onClick={onClose}>
        <div
          className={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <DialogHeader>
            <DialogTitle className={styles.modalHeader}>
              {movieInfo.title}
            </DialogTitle>
            <DialogClose onClick={onClose} />
          </DialogHeader>
          {warningMessage && (
            <Alert variant="warning" className="mb-4">
              {warningMessage}
            </Alert>
          )}
          <Image
            src={movieInfo.imageUrl}
            alt={`${movieInfo.title} Poster`}
            className="mb-4 rounded"
            width={300} // Adjust width and height as needed
            height={450}
          />
          <CardContent>
            <p>{movieInfo.plot}</p>
            <p>
              <strong>Director:</strong> {movieInfo.director}
            </p>
            <p>
              <strong>Release Date:</strong> {movieInfo.releaseDate}
            </p>
          </CardContent>
          <div>
        <Button className={`${styles.modalButton} mr-2`} onClick={onFinished}>
  {loadingModal ? 'Loading...' : 'Finished'}
</Button>
              
           
          
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default MovieModal;
