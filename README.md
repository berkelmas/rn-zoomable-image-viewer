# React Native Zoomable Image Viewer

## Introduction

> React Native Gesture Handler powered, zoomable image viewer component taking array of image sources as a property. The library uses react-native-gesture-handler to handle animations at the native level to prevent bloating JS thread.

## Code Samples

```js
  import React, {useState} from "react";
  import {ImageLightbox} from "rn-zoomable-image-viewer";

  const MyComp = () => {
    const [lightboxShown, setLightboxShown] = useState<boolean>(false);

    return (
      <ImageLightbox
        imageStyle={{height: 100, width: 200, resizeMode: "contain"}},
        imageSources={[
                      {
                id: '1',
                imageSrc: {
                  uri:
                    'https://post.greatist.com/wp-content/uploads/sites/3/2020/02/325466_1100-1100x628.jpg',
                },
              },
              {
                id: '2',
                imageSrc: {
                  uri:
                    'https://www.wecarerecruitment.com.au/wp-content/uploads/2019/07/nature-1.jpg',
                },
              },
              {
                id: '3',
                imageSrc: {
                  uri:
                    'https://images.theconversation.com/files/120462/original/image-20160428-30973-zy8j2.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=675.0&fit=crop',
                },
              },
        ]},
        isVisible={lightboxShown},
        onClose={() => setLightboxShown(false)},
        backdropColor="gray"
        closeSwipeThreshold={300}
      />
    )
  }
```

## Example Usage

![alt text](https://raw.githubusercontent.com/berkelmas/rn-zoomable-image-viewer/main/rn-zoomable-image-viewer-gif.gif)
