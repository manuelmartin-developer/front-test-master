import React, { useContext, useEffect } from "react";
import axios from "axios";
import { Gallery, Item } from "react-photoswipe-gallery";
import { AiTwotoneLike } from "react-icons/ai";
import { AiOutlineReload } from "react-icons/ai";

import "photoswipe/dist/photoswipe.css";
import styles from "./GalleryItem.module.scss";

import { IObjectImage } from "../../helpers/interfaces";
import { CursorVariantContext } from "../../contexts/CursorVariantContext";
import { CursorTextContext } from "../../contexts/CursorTextContext";

const GalleryItem: React.FC<{ image: IObjectImage }> = ({ image }) => {
  // Refs
  const galleryItemRef = React.useRef<HTMLDivElement>(null);

  // Component states
  const [isLiked, setIsLiked] = React.useState<boolean>(false);
  const [likesCounter, setLikesCounter] = React.useState<number>(0);

  // APP contexts
  const { setCursorVariant } = useContext(CursorVariantContext);
  const { setCursorText } = useContext(CursorTextContext);

  // Methods
  const onHandleLikeAction = async () => {
    try {
      const response = await axios.post(image.links[1].uri, {});
      if (response.status === 204) {
        isLiked
          ? setLikesCounter(likesCounter - 1)
          : setLikesCounter(likesCounter + 1);
        setIsLiked(!isLiked);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onEnterGalleryItem = () => {
    setCursorVariant("gallery");
    setCursorText("+");
  };

  const onLeaveGalleryItem = () => {
    setCursorVariant("default");
    setCursorText("");
  };
  const onEnterLike = () => {
    setCursorVariant("input");
  };

  const onLeaveLike = () => {
    setCursorVariant("default");
  };

  // Lifecycle component
  useEffect(() => {
    image.liked && setIsLiked(true);
    setLikesCounter(image.likes_count);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <article className={styles.gallery_item__container} ref={galleryItemRef}>
      <Gallery
        options={{
          errorMsg: "Ha ocurrido un error al cargar la imágen",
          arrowKeys: true,
          loop: false,
        }}
        withCaption={true}
      >
        <Item
          caption={`Author: ${image.author} - ${image.title}`}
          original={image.main_attachment.big}
          width="800"
          height="800"
        >
          {({ ref, open }) => (
            <>
              <img
                className={styles.gallery_item__image}
                src={image.main_attachment.small}
                alt={image.title}
                ref={ref as React.RefObject<HTMLImageElement>}
                onClick={open}
                loading="lazy"
              />
              <div
                className={styles.gallery_item__image_overlay}
                onClick={open}
                onMouseEnter={onEnterGalleryItem}
                onMouseLeave={onLeaveGalleryItem}
              ></div>
            </>
          )}
        </Item>
      </Gallery>
      <div className={styles.gallery_item__price}>
        <span>{`${image.price}`}</span>
        <span>&#8364;</span>
      </div>
      <div className={styles.gallery_item_info}>
        <h3 className={styles.gallery_item_info__title}>{image.title}</h3>
        <p className={styles.gallery_item_info__author}>
          <span>by</span>
          <span>{image.author}</span>
        </p>
      </div>
      <div
        className={styles.gallery_item__social_container}
        onMouseEnter={onEnterLike}
        onMouseLeave={onLeaveLike}
      >
        <button
          className={styles.gallery_item__social_container_counter}
          onClick={() => {
            onHandleLikeAction();
          }}
        >
          <span>
            {likesCounter.toLocaleString("en-US", {
              minimumIntegerDigits: 3,
              useGrouping: false,
            })}
          </span>
          <div
            className={`${
              styles.gallery_item__social_container_counter__image
            } ${isLiked ? styles.isLiked : ""}`}
          >
            <AiTwotoneLike color={"#fff"} size="1.2rem" />
          </div>
        </button>
        <button className={styles.gallery_item__social_container_reload}>
          <span>000</span>
          <div className={styles.gallery_item__social_container_reload__image}>
            <AiOutlineReload color={"#fff"} size="1.2rem" />
          </div>
        </button>
      </div>
    </article>
  );
};

export default GalleryItem;
