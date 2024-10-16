// src/pages/Profile.js


"use client"
import { useChapters } from "@/app/context/ChaptersContext";
import styles from "../Profile.module.css";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Profile = () => {
  const { chapters } = useChapters();
  // You can now remove the fetch call and local chapters state

  return (
    <div className={styles.profileContainer}>
      <h1 className={styles.profileTitle}>Your Horror Story</h1>
      <div className={styles.chaptersContainer}>
        {chapters.map((chapter) => (
          <Card
            key={chapter.chapterNumber}
            className={`${styles.chapterCard} ${
              chapter.isLocked ? styles.locked : ""
            }`}
          >
            <CardHeader>
              <CardTitle>Chapter {chapter.chapterNumber}</CardTitle>
            </CardHeader>
            <CardContent>
              {chapter.isLocked ? (
                <p className={styles.footer}>Locked</p>
              ) : (
                <p>{chapter.text}</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Profile;
