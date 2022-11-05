import React from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";

import styles from "./GalleryList.module.scss";

import { IObjectImage } from "../../helpers/interfaces";
import GalleryItem from "./GalleryItem";

const GalleryList: React.FC<{ imagesData: IObjectImage[] }> = ({
  imagesData,
}) => {
  // Refs
  const [galleryListRef] = useAutoAnimate<HTMLElement>({
    duration: 500,
  });

  return (
    <section
      className={styles.gallery_list_container}
      ref={galleryListRef}
      data-testid="gallery-list"
    >
      {imagesData.map((image: IObjectImage) => {
        return <GalleryItem key={image.id} image={image} />;
      })}
    </section>
  );
};

export default GalleryList;
