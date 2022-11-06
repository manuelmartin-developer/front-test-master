import axios from "axios";
import { useState, useEffect, useContext } from "react";

import styles from "./Home.module.scss";

import { IObjectImage } from "../../helpers/interfaces";
import GalleryList from "../../components/Gallery/GalleryList";
import { UserSearchContext } from "../../contexts/UserSearchContext";
import { CursorVariantContext } from "../../contexts/CursorVariantContext";

const Home = () => {
  // Component states
  const [imagesData, setImagesData] = useState<IObjectImage[] | undefined>();
  const [slice, setSlice] = useState<number>(10);
  const [page, setPage] = useState<number>(1);
  const [hasMoreImages, setHasMoreImages] = useState<boolean>(false);
  const [isLoadingImages, setIsLoadingImages] = useState<boolean>(false);
  const [isLoaderActive, setIsLoaderActive] = useState<boolean>(false);

  // APP context
  const { userSearch } = useContext(UserSearchContext);
  const { setCursorVariant } = useContext(CursorVariantContext);

  // Methods
  const onGetInitialImages = async () => {
    setIsLoadingImages(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/images?page=${page}`
      );
      if (response.status === 200) {
        // Takes only first 10 images for the first render
        setImagesData(response.data.slice(0, slice));
        // If there are more than 10 images
        response.data.length > slice
          ? setHasMoreImages(true)
          : setHasMoreImages(false);
        response.data.length > slice && setPage((prevPage) => prevPage + 1);

        setIsLoadingImages(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGetMoreImages = async () => {
    if (isLoadingImages) return;
    setIsLoadingImages(true);
    setIsLoaderActive(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/images?page=${page}`
      );
      if (response.status === 200) {
        // Pretend a delay of 1 second
        setTimeout(() => {
          // Takes next 10 images and adds them to the current images
          setImagesData((prevImagesData) => [
            ...prevImagesData!,
            ...response.data.slice(slice, slice + slice),
          ]);
          // Checks if there are more images to load
          response.data.length > slice + slice
            ? setHasMoreImages(true)
            : setHasMoreImages(false);
          // Increments page number and slice
          setSlice((prevSlice) => prevSlice + slice);
          setPage((prevPage) => prevPage + 1);

          setIsLoadingImages(false);
          setIsLoaderActive(false);
        }, 1000);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onGetImagesBySearch = async () => {
    if (!userSearch) return;
    setIsLoadingImages(true);
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/images?search=${userSearch}`
      );
      if (response.status === 200) {
        const images = response.data;
        // Pretends to be a search
        const simulatedFilteredResponseData = images.filter(
          (image: IObjectImage) =>
            image.author.toLowerCase().includes(userSearch.toLowerCase()) ||
            image.title.toLowerCase().includes(userSearch.toLowerCase())
        );
        setImagesData(simulatedFilteredResponseData);
        simulatedFilteredResponseData.length > slice
          ? setHasMoreImages(true)
          : setHasMoreImages(false);
        setIsLoadingImages(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onExitApp = () => {
    setCursorVariant("hidden");
  };

  const onEnterApp = () => {
    setCursorVariant("default");
  };

  // Lifecycle component
  useEffect(() => {
    onGetInitialImages();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    userSearch && userSearch.length > 1 && onGetImagesBySearch();
    !userSearch && imagesData && onGetInitialImages();
  }, [userSearch]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const onScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight;
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const isBottom = scrollTop + clientHeight >= scrollHeight - 1;
      if (isBottom && hasMoreImages && !isLoadingImages) {
        onGetMoreImages();
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [hasMoreImages, isLoadingImages]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className={styles.home_container}
      onMouseEnter={onEnterApp}
      onMouseLeave={onExitApp}
    >
      {imagesData && imagesData.length > 0 && (
        <>
          <GalleryList imagesData={imagesData} />
          {isLoaderActive && <div className={styles.loader} />}
        </>
      )}
      {(!imagesData || imagesData.length === 0) && (
        <p className={styles.home_container__no_results}>
          No results found for your search
        </p>
      )}
    </div>
  );
};

export default Home;
